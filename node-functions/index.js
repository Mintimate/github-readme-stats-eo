/*
 * Landing page for GitHub Readme Stats (EdgeOne edition)
 * GET /
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const I18N = {
  en: {
    lang: "en",
    title: "GitHub Readme Stats · EdgeOne Edition",
    subtitle: "Drop-in EdgeOne Pages build of the classic GitHub Readme Stats API.",
    badge: "Vercel-compatible query interface",
    sectionTitle: "Available endpoints",
    quickStart: "Quick start",
    usage: "Change the username then paste into your README or anywhere you render images.",
    links: {
      github: "GitHub",
      cnb: "CNB Repo",
      docs: "Upstream Docs",
    },
    footer: "Made by Mintimate · Powered by EdgeOne Pages",
    ctaLabel: "Copy & play",
  },
  zh: {
    lang: "zh-CN",
    title: "GitHub Readme Stats · EdgeOne 版本",
    subtitle: "基于 EdgeOne Pages 的 GitHub Readme Stats 兼容实现。",
    badge: "兼容 Vercel 参数接口",
    sectionTitle: "可用接口",
    quickStart: "快速开始",
    usage: "替换用户名后粘贴到 README 或任意支持图片的地方。",
    links: {
      github: "GitHub",
      cnb: "CNB 镜像",
      docs: "上游文档",
    },
    footer: "Mintimate 打造 · EdgeOne Pages 驱动",
    ctaLabel: "复制使用",
  },
};

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api",
    label: { en: "Stats Card", zh: "GitHub 统计卡" },
    hint: "?username=Mintimate&show_icons=true",
  },
  {
    method: "GET",
    path: "/api/top-langs",
    label: { en: "Top Languages", zh: "语言占比卡" },
    hint: "?username=Mintimate&layout=compact",
  },
  {
    method: "GET",
    path: "/api/pin",
    label: { en: "Repo Pin", zh: "仓库卡片" },
    hint: "?username=Mintimate&repo=oh-my-rime",
  },
  {
    method: "GET",
    path: "/api/gist",
    label: { en: "Gist Card", zh: "Gist 卡片" },
    hint: "?id=bbfce31e0217a3689c8d961a356cb10d",
  },
  {
    method: "GET",
    path: "/api/wakatime",
    label: { en: "WakaTime", zh: "WakaTime 统计" },
    hint: "?username=ffflabs&layout=compact",
  },
];

const buildSnippets = (baseUrl) => [
  {
    title: "Stats",
    url: `${baseUrl}/api?username=Mintimate&show_icons=true`,
  },
  {
    title: "Top Languages",
    url: `${baseUrl}/api/top-langs?username=Mintimate&layout=compact`,
  },
  {
    title: "Repo Pin",
    url: `${baseUrl}/api/pin/?username=Mintimate&repo=oh-my-rime`,
  },
];

function getHtml(langData, baseUrl) {
  const endpointList = ENDPOINTS.map((item) => {
    const demoUrl = `${baseUrl}${item.path}${item.hint || ""}`;
    return `
      <div class="endpoint" data-url="${demoUrl}">
        <span class="method ${item.method.toLowerCase()}">${item.method}</span>
        <div class="endpoint-meta">
          <div class="path">${item.path}</div>
          <div class="label">${item.label[langData.lang.startsWith("zh") ? "zh" : "en"]}</div>
          <div class="hint">${item.hint}</div>
        </div>
      </div>`;
  }).join("");

  const snippetList = buildSnippets(baseUrl).map((snippet) => {
    return `
      <div class="snippet">
        <div class="snippet-title">${snippet.title}</div>
        <div class="snippet-url">${snippet.url}</div>
        <button class="copy-btn" data-url="${snippet.url}">${langData.ctaLabel}</button>
      </div>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="${langData.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${langData.title}</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <style>
    :root {
      --bg-1: #0f172a;
      --bg-2: #111827;
      --accent: #6ee7b7;
      --accent-2: #60a5fa;
      --text-1: #e5e7eb;
      --text-2: #9ca3af;
      --card: rgba(17, 24, 39, 0.7);
      --border: rgba(255, 255, 255, 0.08);
      --shadow: 0 25px 70px rgba(0, 0, 0, 0.35);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      background: radial-gradient(circle at 20% 20%, rgba(96,165,250,0.18), transparent 32%),
                  radial-gradient(circle at 80% 10%, rgba(110,231,183,0.16), transparent 32%),
                  radial-gradient(circle at 50% 80%, rgba(236,72,153,0.08), transparent 38%),
                  linear-gradient(145deg, var(--bg-1), var(--bg-2));
      color: var(--text-1);
      font-family: "Space Grotesk", "Inter", "Segoe UI", "PingFang SC", system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 28px;
    }

    .card {
      width: 100%;
      max-width: 880px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      box-shadow: var(--shadow);
      padding: 36px;
      backdrop-filter: blur(8px);
    }

    .header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      margin-bottom: 28px;
    }

    .title-box h1 {
      font-size: 28px;
      letter-spacing: -0.5px;
      line-height: 1.25;
      background: linear-gradient(120deg, var(--accent), var(--accent-2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .title-box p { margin-top: 8px; color: var(--text-2); font-size: 15px; }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(110, 231, 183, 0.08);
      color: #a7f3d0;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .section-title {
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-2);
      margin: 20px 0 12px;
    }

    .endpoint-list { display: grid; gap: 12px; }

    .endpoint {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 14px;
      padding: 14px 16px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.02);
      transition: border-color 0.2s ease, transform 0.2s ease;
      cursor: pointer;
    }

    .endpoint:hover { border-color: rgba(110, 231, 183, 0.4); transform: translateY(-2px); }

    .method {
      align-self: center;
      padding: 6px 12px;
      border-radius: 10px;
      font-weight: 800;
      font-size: 12px;
      letter-spacing: 0.03em;
      border: 1px solid var(--border);
    }

    .method.get { color: #93c5fd; background: rgba(96, 165, 250, 0.12); }
    .method.post { color: #6ee7b7; background: rgba(110, 231, 183, 0.12); }

    .endpoint-meta .path {
      font-family: "JetBrains Mono", "SFMono-Regular", Menlo, monospace;
      font-size: 15px;
      color: var(--text-1);
    }

    .endpoint-meta .label { margin-top: 2px; color: var(--text-2); font-size: 13px; }
    .endpoint-meta .hint { margin-top: 4px; color: #a5b4fc; font-size: 12px; }

    .snippets { margin-top: 10px; display: grid; gap: 12px; }

    .snippet {
      border: 1px dashed var(--border);
      border-radius: 12px;
      padding: 12px;
      display: grid;
      gap: 6px;
      background: rgba(255, 255, 255, 0.02);
    }

    .snippet-title { font-weight: 700; letter-spacing: 0.02em; }
    .snippet-url {
      font-family: "JetBrains Mono", "SFMono-Regular", Menlo, monospace;
      font-size: 13px;
      color: var(--text-1);
      word-break: break-all;
    }

    .copy-btn {
      justify-self: start;
      margin-top: 4px;
      padding: 8px 12px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: rgba(96, 165, 250, 0.12);
      color: #bfdbfe;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }

    .copy-btn:hover { transform: translateY(-1px); border-color: rgba(110, 231, 183, 0.6); }

    .links {
      display: flex;
      gap: 16px;
      margin-top: 24px;
      flex-wrap: wrap;
    }

    .link {
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-1);
      text-decoration: none;
      font-weight: 600;
      transition: border-color 0.2s ease, transform 0.2s ease;
    }

    .link:hover { border-color: rgba(96, 165, 250, 0.6); transform: translateY(-1px); }

    .footer { margin-top: 28px; color: var(--text-2); font-size: 13px; text-align: center; }

    @media (max-width: 720px) {
      .card { padding: 24px; }
      .header { flex-direction: column; align-items: flex-start; }
      .badge { align-self: flex-start; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="title-box">
        <h1>${langData.title}</h1>
        <p>${langData.subtitle}</p>
      </div>
      <span class="badge">${langData.badge}</span>
    </div>

    <div class="section">
      <div class="section-title">${langData.sectionTitle}</div>
      <div class="endpoint-list">${endpointList}</div>
    </div>

    <div class="section">
      <div class="section-title">${langData.quickStart}</div>
      <div class="snippets">${snippetList}</div>
      <p style="margin-top:10px; color: var(--text-2); font-size: 13px;">${langData.usage}</p>
    </div>

    <div class="links">
      <a class="link" href="https://github.com/Mintimate/github-readme-stats-eo" target="_blank" rel="noreferrer">${langData.links.github}</a>
      <a class="link" href="https://cnb.cool/Mintimate/code-nest/github-readme-stats-eo" target="_blank" rel="noreferrer">${langData.links.cnb}</a>
      <a class="link" href="https://raw.githubusercontent.com/anuraghazra/github-readme-stats/refs/heads/master/readme.md" target="_blank" rel="noreferrer">${langData.links.docs}</a>
    </div>

    <div class="footer">${langData.footer}</div>
  </div>

  <script>
    const buttons = document.querySelectorAll('.copy-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const url = btn.getAttribute('data-url');
        try {
          await navigator.clipboard.writeText(url);
          btn.textContent = 'Copied!';
          setTimeout(() => (btn.textContent = btn.dataset.reset || btn.textContent), 1200);
        } catch (err) {
          console.error('Copy failed', err);
        }
      });
      btn.dataset.reset = btn.textContent;
    });

    const endpointLinks = document.querySelectorAll('.endpoint');
    endpointLinks.forEach((endpoint) => {
      endpoint.addEventListener('click', () => {
        const demoUrl = endpoint.dataset.url;
        if (demoUrl) {
          window.open(demoUrl, '_blank');
        }
      });
    });
  </script>
</body>
</html>`;
}

export function onRequest({ request }) {
  const method = request.method;

  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  const isZh = acceptLanguage.toLowerCase().includes("zh");
  const langData = isZh ? I18N.zh : I18N.en;
  const baseUrl = resolveBaseUrl(request);

  return new Response(getHtml(langData, baseUrl), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

function resolveBaseUrl(request) {
  const envOrigin = (process.env.PREFERRED_ORIGIN || "").trim();
  if (envOrigin) return envOrigin;

  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    new URL(request.url).host;
  const proto = request.headers.get("x-forwarded-proto") || new URL(request.url).protocol.replace(":", "");
  return `${proto}://${host}`;
}
