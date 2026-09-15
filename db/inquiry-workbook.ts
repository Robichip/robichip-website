import { strToU8, zipSync } from "fflate";
import type { InferSelectModel } from "drizzle-orm";
import type { inquiries } from "./schema";

type Inquiry = InferSelectModel<typeof inquiries>;
type Cell = { value: string | number; style?: number };
type Sheet = { name: string; rows: Cell[][]; widths: number[]; merges?: string[]; filter?: boolean; heights?: Record<number, number> };
const ns = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const declaration = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
function xml(value: unknown) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function column(index: number): string {
  let result = "";
  for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) result = String.fromCharCode(65 + (n - 1) % 26) + result;
  return result;
}
function cells(values: (string | number)[], style = 0): Cell[] { return values.map(value => ({ value, style })); }
function display(value: string) { return value || "未提供 / Not provided"; }
function recordType(row: Inquiry) { return row.sourcePath.startsWith("/simulation/") ? "TEST／模擬；不可實際聯繫" : "Customer inquiry／客戶詢問"; }
function sheetXml(sheet: Sheet) {
  const last = `${column(sheet.widths.length - 1)}${sheet.rows.length || 1}`;
  return declaration + `<worksheet xmlns="${ns}"><dimension ref="A1:${last}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="28"/><cols>${sheet.widths.map((width, i) => `<col min="${i + 1}" max="${i + 1}" width="${width}" customWidth="1"/>`).join("")}</cols><sheetData>${sheet.rows.map((row, i) => `<row r="${i + 1}"${sheet.heights?.[i + 1] ? ` ht="${sheet.heights[i + 1]}" customHeight="1"` : ""}>${row.map((cell, j) => `<c r="${column(j)}${i + 1}" s="${cell.style || 0}" t="inlineStr"><is><t xml:space="preserve">${xml(cell.value)}</t></is></c>`).join("")}</row>`).join("")}</sheetData>${sheet.filter ? `<autoFilter ref="A1:${last}"/>` : ""}${sheet.merges?.length ? `<mergeCells count="${sheet.merges.length}">${sheet.merges.map(ref => `<mergeCell ref="${ref}"/>`).join("")}</mergeCells>` : ""}<pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.3" footer="0.3"/></worksheet>`;
}

// Runtime export for Cloudflare Workers; all customer strings use literal cells,
// never formulas, so phone numbers and user-supplied text are preserved safely.
export function buildInquiryWorkbook(records: Inquiry[]): Uint8Array {
  const contacts: Sheet = {
    name: "客戶聯絡清單", widths: [12, 30, 34, 24, 42, 26, 24, 30, 26, 22, 24, 42, 24, 60], filter: true,
    rows: [cells(["ID", "Full name／姓名", "Company／公司", "Job title／職稱", "Email／電子郵件", "Phone／電話", "Region／國家地區", "Record type／資料類型", "Received (UTC)／建檔時間", "Status／狀態", "BD owner／跟進窗口", "Meeting window／會議時段", "Time zone／時區", "Follow-up／跟進紀錄"], 1)],
  };
  const cards: Sheet = { name: "逐筆聯絡卡", widths: [31, 32, 32, 32], rows: [cells(["RobiChip · Customer contact cards／客戶聯絡卡"], 1)], merges: ["A1:D1"], heights: { 1: 34 } };
  const technical: Sheet = { name: "產品技術需求", widths: [12, 30, 34, 26, 36, 28, 30, 28, 80], filter: true,
    rows: [cells(["ID", "Full name／姓名", "Company／公司", "Intent／需求類型", "Application／應用", "Project stage／階段", "Quantity／數量", "Target timing／時程", "Details／產品技術需求"], 1)] };
  for (const row of records) {
    contacts.rows.push(cells([row.id, display(row.fullName), display(row.company), display(row.jobTitle), display(row.email), display(row.phone), display(row.region), recordType(row), row.createdAt, row.status, display(row.owner), display(row.preferredWindow), display(row.timeZone), display(row.followUpNote)]));
    cards.rows.push([]);
    const titleRow = cards.rows.length + 1;
    cards.rows.push(cells([`#${row.id} · ${row.fullName} · ${recordType(row)}`], 1));
    cards.merges!.push(`A${titleRow}:D${titleRow}`);
    cards.heights![titleRow] = 40;
    const fields: [string, string][] = [
      ["姓名 / Name", row.fullName], ["公司 / Company", row.company], ["職稱 / Job title", row.jobTitle],
      ["電子郵件 / Email", row.email], ["電話 / Phone", row.phone], ["國家地區 / Region", row.region],
      ["接觸時間 / Received (UTC)", row.createdAt], ["跟進窗口 / BD owner", row.owner], ["狀態 / Status", row.status],
      ["會議時段 / Meeting window", row.preferredWindow], ["時區 / Time zone", row.timeZone], ["跟進紀錄 / Follow-up", row.followUpNote],
    ];
    for (const [label, value] of fields) {
      const n = cards.rows.length + 1;
      cards.rows.push([{ value: label, style: 2 }, { value: display(value) }]);
      cards.merges!.push(`B${n}:D${n}`);
      cards.heights![n] = Math.min(180, Math.max(30, Math.ceil(display(value).length / 65) * 22));
    }
    technical.rows.push(cells([row.id, row.fullName, row.company, row.intent, row.application, display(row.projectStage), display(row.quantity), display(row.targetTiming), row.details]));
  }
  if (!records.length) cards.rows.push(cells(["尚無客戶聯絡紀錄 / No contacts yet."]));
  const sheets = [contacts, cards, technical];
  const files: Record<string, Uint8Array> = {};
  const put = (path: string, value: string) => { files[path] = strToU8(value); };
  put("[Content_Types].xml", declaration + `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>`);
  put("_rels/.rels", declaration + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
  put("xl/workbook.xml", declaration + `<workbook xmlns="${ns}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((s, i) => `<sheet name="${xml(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets></workbook>`);
  put("xl/_rels/workbook.xml.rels", declaration + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`);
  put("xl/styles.xml", declaration + `<styleSheet xmlns="${ns}"><fonts count="2"><font><sz val="12"/><name val="Calibri"/></font><font><b/><sz val="12"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF10191E"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="49" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="49" fontId="1" fillId="2" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="49" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`);
  sheets.forEach((s, i) => put(`xl/worksheets/sheet${i + 1}.xml`, sheetXml(s)));
  return zipSync(files, { level: 1 });
}
