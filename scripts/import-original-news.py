"""Import public, owner-authored Google Sites news into a static, sanitized archive.

Usage: python scripts/import-original-news.py SOURCE_SNAPSHOT_DIR
Snapshots are fetched separately from the public URLs recorded in the output.
"""
import concurrent.futures
import hashlib
import html as escape_html
import json
import pathlib
import sys
import urllib.parse
import urllib.request
from lxml import html

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = pathlib.Path(sys.argv[1])
RECORDS = [
    ("2026-TAIROS", "2026-08-19", "TAIROS 2026 — Original Event Announcement", "TAIROS 2026 原始參展公告", "Exhibition · 展會", "/2026-TAIROS"),
    ("news-events-TaiChung-UAV", "2026-07-02", "Leading 2026: Taichung UAV Forum", "領航 2026：臺中無人載具產業與海外商機論壇", "Forum · 論壇", ""),
    ("news-events-computex-InnoVEX", "2026-06-02", "COMPUTEX InnoVEX 2026", "COMPUTEX InnoVEX 新創展示牆", "Showcase · 展示", ""),
    ("news-events-swancor-MOU", "2026-05-14", "Swancor × RobiChip Strategic Collaboration", "上緯投控 × 羅比芯策略技術合作", "Partnership · 合作", ""),
    ("news-events-best-AI-Awards", "2026-04-25", "2026 Best AI Awards", "智慧創新大賞：IC 設計類新創及中小企業組佳作", "Award · 獎項", ""),
]
ALLOWED = {"div", "section", "article", "aside", "header", "footer", "p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "ul", "ol", "li", "dl", "dt", "dd", "a", "img", "iframe", "br", "hr", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td", "time", "blockquote"}
DROP = {"style", "script", "svg", "button", "noscript", "nav", "input", "form"}
VOID = {"img", "br", "hr"}
assets = {}
refresh_file = SOURCE / 'current-images.json'
refresh = {row['slug']: row['images'] for row in json.loads(refresh_file.read_text())} if refresh_file.exists() else {}

def local_link(url):
    u = urllib.parse.urlsplit(url)
    if u.hostname == 'www.google.com' and u.path == '/url':
        destination = urllib.parse.parse_qs(u.query).get('q', [''])[0]
        if destination: return local_link(destination)
    if u.hostname == 'robichip-homepage.robichip-ai-8830.chatgpt.site' and u.path in {'/2026-TAIROS', '/semicon-taiwan-2026'}:
        return u.path
    if u.scheme and u.scheme not in {"http", "https", "mailto", "tel"}:
        return ""
    if u.hostname in {"www.robichip.com", "robichip.com"}:
        path = u.path
        if path in {"/", "/首頁"}: return "/"
        if path == "/robiagent": return "/#robiagent"
        if path == "/join-us": return "https://profile.104.com.tw/company/1a2x6bnk3q"
        return path + ("?" + u.query if u.query else "") + ("#" + u.fragment if u.fragment else "")
    return url

def clean(node, label):
    if not isinstance(node.tag, str) or node.tag in DROP or node.get("role") == "button": return ""
    if node.get("data-code"):
        return clean(html.fromstring(node.get("data-code")), label)
    if node.get('data-embed-open-url'):
        return '<a href="' + escape_html.escape(local_link(node.get('data-embed-open-url')), quote=True) + '">English reference deck · 英文參考簡報（PDF） ↗</a>'
    tag = node.tag.lower()
    if tag == "iframe":
        url = node.get("src", "")
        u = urllib.parse.urlsplit(url)
        if u.hostname not in {"www.youtube.com", "www.youtube-nocookie.com"} or not u.path.startswith("/embed/"): return ""
        url = "https://www.youtube-nocookie.com" + u.path
        return '<iframe src="' + escape_html.escape(url, quote=True) + '" title="' + escape_html.escape(label + ' — event video', quote=True) + '" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>'
    attrs = {}
    if tag == "img":
        url = node.get("src", "")
        if not url or "gstatic.com" in url: return ""
        digest = hashlib.sha256(url.encode()).hexdigest()[:16]
        path = "/news-archive/" + digest + ".jpg"
        assets[url] = path
        attrs = {"src": path, "alt": node.get("alt") or label + " — event photograph / 活動紀錄", "loading": "lazy"}
    if tag == "a":
        url = local_link(node.get("href", ""))
        if url: attrs = {"href": url}
        else: tag = "span"
    if tag in {"td", "th"}:
        attrs = {k: node.get(k) for k in ("colspan", "rowspan") if node.get(k, "").isdigit()}
    if tag == "time" and node.get("datetime"): attrs["datetime"] = node.get("datetime")
    if node.get("id"): attrs["id"] = "archive-" + node.get("id")
    if tag == "h1": tag = "h2"
    if tag in {"header", "footer"}: tag = "div"
    if tag == "div" and len(node) > 1 and all(c.tag == "article" for c in node): attrs["class"] = "os-archive-grid"
    body = escape_html.escape(node.text or "")
    for child in node:
        body += clean(child, label) + escape_html.escape(child.tail or "")
    if tag not in ALLOWED: return body
    attributes = "".join(' ' + k + '="' + escape_html.escape(v, quote=True) + '"' for k, v in attrs.items())
    if tag in VOID: return '<' + tag + attributes + '>'
    return '<' + tag + attributes + '>' + body + '</' + tag + '>'

articles = []
for slug, date, title, zh, category, recap in RECORDS:
    doc = html.fromstring((SOURCE / (slug + ".html")).read_text())
    if slug in refresh:
        images = [node for node in doc.xpath('//section//img[@src]') if 'gstatic.com' not in node.get('src')]
        if len(images) != len(refresh[slug]): raise ValueError('Image count changed for ' + slug)
        for node, url in zip(images, refresh[slug]): node.set('src', url)
    sections = ['<section class="os-archive-section">' + clean(section, title) + '</section>' for section in doc.xpath('//section')]
    articles.append(dict(slug=slug, date=date, title=title, titleZh=zh, category=category, recap=recap, source="https://www.robichip.com/news-events/"+slug, html="\n".join(sections)))

def download(item):
    url, target = item
    path = ROOT / "public" / target.lstrip("/")
    path.parent.mkdir(parents=True, exist_ok=True)
    existing = list(path.parent.glob(path.stem + '.*'))
    if existing: return target, '/news-archive/' + existing[0].name
    # Preserve the original bytes. Google may serve PNG, JPEG or WebP; correct extension follows below.
    try:
        data = urllib.request.urlopen(url, timeout=20).read()
    except Exception as error:
        print('Image download pending:', target, type(error).__name__, file=sys.stderr)
        return target, url
    from PIL import Image
    import io
    fmt = Image.open(io.BytesIO(data)).format
    suffix = {"PNG": ".png", "JPEG": ".jpg", "WEBP": ".webp", "GIF": ".gif"}[fmt]
    actual = path.with_suffix(suffix)
    actual.write_bytes(data)
    return target, "/news-archive/" + actual.name

with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    for replacement in pool.map(download, assets.items()):
        if replacement:
            for article in articles: article["html"] = article["html"].replace(*replacement)
out = ROOT / "app/news-events/archive.json"
out.write_text(json.dumps(articles, ensure_ascii=False, indent=2) + "\n")
print(json.dumps({"articles":len(articles), "images":len(assets), "sections":sum(a["html"].count('class="os-archive-section"') for a in articles)}))
