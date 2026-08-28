(() => {
  'use strict';

  const WIDGET_ID = '6da3b3cc-8e16-4fdf-a0e7-3a00930207e8';
  const PLATFORM_SRC = 'https://elfsightcdn.com/platform.js';
  const LAUNCHER_ID = 'robiagent-chat-launcher';
  const WIDGET_HOST_ID = 'robiagent-elfsight-host';
  const PLATFORM_SCRIPT_ID = 'robiagent-elfsight-platform';

  let loadPromise = null;
  let widgetLoaded = false;
  let clickTracked = false;
  let loadedTracked = false;

  const track = (eventName) => {
    const params = {
      widget_id: WIDGET_ID,
      page_path: window.location.pathname,
      transport_type: 'beacon'
    };
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({event: eventName, ...params});
      }
    } catch (_) {
      // Analytics must never block chatbot or site behavior.
    }
  };

  const getLauncher = () => document.getElementById(LAUNCHER_ID);

  const setLauncherState = (state, title, subtitle) => {
    const launcher = getLauncher();
    if (!launcher) return;
    launcher.dataset.state = state;
    launcher.disabled = state === 'loading';
    const titleNode = launcher.querySelector('.robiagent-chat-title');
    const subtitleNode = launcher.querySelector('.robiagent-chat-subtitle');
    if (titleNode && title) titleNode.textContent = title;
    if (subtitleNode && subtitle) subtitleNode.textContent = subtitle;
  };

  const createWidgetHost = () => {
    let host = document.getElementById(WIDGET_HOST_ID);
    if (host) return host;

    host = document.createElement('div');
    host.id = WIDGET_HOST_ID;
    host.className = `elfsight-app-${WIDGET_ID}`;
    host.setAttribute('aria-live', 'polite');
    document.body.appendChild(host);
    return host;
  };

  const markWidgetReady = () => {
    if (widgetLoaded) return;
    widgetLoaded = true;
    if (!loadedTracked) {
      loadedTracked = true;
      track('chatbot_loaded');
    }
    const launcher = getLauncher();
    if (launcher) launcher.remove();
  };

  const waitForWidgetReady = (host) => new Promise((resolve, reject) => {
    let timeoutId;
    const isReady = () => host.childElementCount > 0 || Boolean(host.querySelector('iframe'));
    if (isReady()) {
      markWidgetReady();
      resolve();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!isReady()) return;
      observer.disconnect();
      window.clearTimeout(timeoutId);
      markWidgetReady();
      resolve();
    });

    observer.observe(host, {childList: true, subtree: true});
    timeoutId = window.setTimeout(() => {
      observer.disconnect();
      reject(new Error('Elfsight widget did not initialize in time.'));
    }, 15000);
  });

  const loadElfsight = () => {
    if (widgetLoaded) return Promise.resolve();
    if (loadPromise) return loadPromise;

    loadPromise = new Promise((resolve, reject) => {
      let settled = false;
      const host = createWidgetHost();
      let platformScript = document.querySelector(`script[src^="${PLATFORM_SRC}"]`);

      const fail = (error) => {
        if (settled) return;
        settled = true;
        host.remove();
        if (platformScript && platformScript.id === PLATFORM_SCRIPT_ID) platformScript.remove();
        loadPromise = null;
        setLauncherState('error', 'Ask RobiAgent', 'Chat unavailable · Click to retry');
        reject(error instanceof Error ? error : new Error('Unable to load Elfsight.'));
      };

      waitForWidgetReady(host).then(() => {
        if (settled) return;
        settled = true;
        resolve();
      }).catch(fail);

      if (platformScript) {
        return;
      }

      platformScript = document.createElement('script');
      platformScript.id = PLATFORM_SCRIPT_ID;
      platformScript.src = PLATFORM_SRC;
      platformScript.async = true;
      platformScript.addEventListener('error', () => fail(new Error('Unable to load Elfsight platform.js.')), {once: true});
      document.head.appendChild(platformScript);
    });

    return loadPromise;
  };

  const onLauncherClick = () => {
    if (!clickTracked) {
      clickTracked = true;
      track('chat_launcher_clicked');
    }
    setLauncherState('loading', 'Loading RobiAgent…', 'Technical support is starting');
    loadElfsight().catch(() => {
      // Failure state is surfaced on the local launcher; the website stays operational.
    });
  };

  const mountLauncher = () => {
    if (getLauncher() || widgetLoaded) return;

    const launcher = document.createElement('button');
    launcher.id = LAUNCHER_ID;
    launcher.className = 'robiagent-chat-launcher';
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Ask RobiAgent for product selection, design-in, or technical support');
    launcher.innerHTML = `
      <span class="robiagent-chat-icon" aria-hidden="true">AI</span>
      <span class="robiagent-chat-copy">
        <span class="robiagent-chat-title">Ask RobiAgent</span>
        <span class="robiagent-chat-subtitle">Product selection · Design-in · Technical support</span>
      </span>`;
    launcher.addEventListener('click', onLauncherClick);
    document.body.appendChild(launcher);
    track('chat_launcher_seen');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountLauncher, {once: true});
  } else {
    mountLauncher();
  }
})();
