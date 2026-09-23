/**
 * postbuild — static SEO artifacts that must exist for non-JS crawlers.
 *
 * npm runs this automatically after `npm run build`.
 *
 * Does three things, all inside dist/ (source tree is never modified):
 *   1. writes dist/sitemap.xml from src/data/seo-routes.json
 *   2. appends the Sitemap directive to dist/robots.txt
 *   3. rewrites the og:image / twitter:image / canonical tags in
 *      dist/index.html to absolute URLs (social scrapers reject relative ones)
 *
 * Requires VITE_SITE_URL (e.g. https://www.example.com). If it is not set the
 * script warns and skips — it never fails the build, so a missing variable can
 * cost you SEO metadata but can never break a deployment.
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

/**
 * On Vercel the variable arrives in process.env. Locally it usually lives in
 * .env, which Node does not read on its own — so fall back to parsing it, to
 * keep a local `npm run build` behaving the same as a deployed one.
 */
const fromDotEnv = (key) => {
  for (const file of [".env.local", ".env"]) {
    const path = resolve(root, file);
    if (!existsSync(path)) continue;
    const line = readFileSync(path, "utf8")
      .split(/\r?\n/)
      .find((l) => l.trim().startsWith(`${key}=`));
    if (line) return line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
  }
  return "";
};

const rawSiteUrl = process.env.VITE_SITE_URL || fromDotEnv("VITE_SITE_URL") || "";
const SITE_URL = rawSiteUrl.trim().replace(/\/+$/, "");

if (!SITE_URL) {
  console.warn(
    "\n[postbuild] VITE_SITE_URL is not set — skipping sitemap.xml, the " +
      "robots.txt Sitemap directive and absolute og:image rewriting.\n" +
      "[postbuild] Set it in the Vercel dashboard (e.g. https://www.example.com) " +
      "and redeploy to enable them.\n",
  );
  process.exit(0);
}

if (!/^https?:\/\//.test(SITE_URL)) {
  console.warn(
    `\n[postbuild] VITE_SITE_URL ("${rawSiteUrl}") must start with http:// or ` +
      "https:// — skipping SEO artifacts.\n",
  );
  process.exit(0);
}

if (!existsSync(dist)) {
  console.warn("[postbuild] dist/ not found — nothing to do.");
  process.exit(0);
}

// ── 1. sitemap.xml ──────────────────────────────────────────────────────────
const { routes } = JSON.parse(
  readFileSync(resolve(root, "src/data/seo-routes.json"), "utf8"),
);

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes
    .map(
      (r) =>
        "  <url>\n" +
        `    <loc>${SITE_URL}${r.path}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <priority>${r.priority}</priority>\n` +
        "  </url>",
    )
    .join("\n") +
  "\n</urlset>\n";

writeFileSync(resolve(dist, "sitemap.xml"), sitemap, "utf8");
console.log(`[postbuild] wrote dist/sitemap.xml (${routes.length} URLs)`);

// ── 2. robots.txt Sitemap directive ─────────────────────────────────────────
const robotsPath = resolve(dist, "robots.txt");
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf8");
  if (!/^\s*Sitemap:/im.test(robots)) {
    appendFileSync(robotsPath, `\nSitemap: ${SITE_URL}/sitemap.xml\n`, "utf8");
    console.log("[postbuild] appended Sitemap directive to dist/robots.txt");
  }
}

// ── 3. absolute social URLs + canonical in index.html ───────────────────────
const indexPath = resolve(dist, "index.html");
if (existsSync(indexPath)) {
  let html = readFileSync(indexPath, "utf8");

  // Relative -> absolute for any og:*/twitter:* image or url content attribute.
  html = html.replace(
    /(<meta\s+(?:property|name)="(?:og:image|twitter:image|og:url)"\s+content=")\/([^"]*)(")/g,
    `$1${SITE_URL}/$2$3`,
  );

  // Baseline canonical for the document root, so crawlers that do not execute
  // JS still get one. The Seo component overwrites it per route at runtime.
  if (!/rel="canonical"/.test(html)) {
    html = html.replace(
      "</head>",
      `    <link rel="canonical" href="${SITE_URL}/" />\n  </head>`,
    );
  }

  // og:url is absent from the source HTML; add it alongside the other OG tags.
  if (!/property="og:url"/.test(html)) {
    html = html.replace(
      '<meta property="og:type"',
      `<meta property="og:url" content="${SITE_URL}/" />\n    <meta property="og:type"`,
    );
  }

  writeFileSync(indexPath, html, "utf8");
  console.log("[postbuild] rewrote absolute URLs in dist/index.html");
}

console.log(`[postbuild] done — site URL: ${SITE_URL}`);
