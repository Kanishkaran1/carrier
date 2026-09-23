import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seoData from "@/data/seo-routes.json";

/**
 * Seo — per-route document metadata.
 *
 * Mounted once inside <BrowserRouter> (next to <ResetScroll />), so it covers
 * all routes without touching a single page component. On every navigation it
 * rewrites the document title, meta description, canonical URL and Open Graph
 * tags from the table in `src/data/seo-routes.json`.
 *
 * Purely additive: it changes nothing that renders. If a route is missing from
 * the table, the site-wide defaults from index.html are used.
 *
 * Note: this runs client-side. Google executes JS and will see these tags, but
 * most social-media scrapers do not — the static fallbacks baked into
 * index.html by scripts/postbuild.mjs are what they read.
 */

const SITE_URL = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

const DEFAULT_TITLE = "Comfort Aircon";
const DEFAULT_DESCRIPTION =
  "Authorized Dealer for Carrier, Midea & Toshiba Air Conditioning Systems";

type RouteMeta = {
  path: string;
  title: string;
  description: string;
  priority: string;
};

const ROUTES = seoData.routes as RouteMeta[];

/** Create the tag if it is missing, then set its content. */
const setMeta = (
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Trailing slashes are equivalent for lookup purposes ("/about/" → "/about").
    const normalised = pathname.replace(/\/+$/, "") || "/";
    const match = ROUTES.find((r) => r.path === normalised);

    const title = match?.title ?? DEFAULT_TITLE;
    const description = match?.description ?? DEFAULT_DESCRIPTION;

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description,
    );
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      description,
    );

    // Canonical and og:url need an absolute origin. Prefer the configured
    // production domain; fall back to the current origin so preview
    // deployments still emit something valid rather than nothing.
    const origin = SITE_URL || window.location.origin;
    const url = `${origin}${normalised === "/" ? "/" : normalised}`;
    setCanonical(url);
    setMeta('meta[property="og:url"]', "property", "og:url", url);

    // Unknown routes render the 404 page and should not be indexed.
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      match ? "index, follow" : "noindex, follow",
    );
  }, [pathname]);

  return null;
};

export default Seo;
