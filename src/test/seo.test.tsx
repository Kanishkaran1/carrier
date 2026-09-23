import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Seo from "@/components/Seo";
import seoData from "@/data/seo-routes.json";

/**
 * Verifies the per-route metadata layer added for the Vercel deployment.
 * Seo renders nothing, so these assertions read document.head directly.
 */

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Seo />
    </MemoryRouter>,
  );

const content = (selector: string) =>
  document.head.querySelector<HTMLMetaElement>(selector)?.content;

const canonical = () =>
  document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;

describe("Seo", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  it("sets a route-specific title and description", () => {
    renderAt("/contact");
    expect(document.title).toBe(
      "Contact Us — Free Quote & Site Visit | Comfort Aircon",
    );
    expect(content('meta[name="description"]')).toContain("free air conditioning quote");
  });

  it("gives each route a distinct title", () => {
    renderAt("/about");
    const about = document.title;
    renderAt("/services");
    expect(document.title).not.toBe(about);
  });

  it("emits a canonical URL and marks known routes indexable", () => {
    renderAt("/products");
    expect(canonical()).toMatch(/\/products$/);
    expect(content('meta[name="robots"]')).toBe("index, follow");
  });

  it("treats a trailing slash as the same route", () => {
    renderAt("/about/");
    expect(document.title).toContain("About Us");
  });

  it("marks unknown routes noindex and falls back to the default title", () => {
    renderAt("/this-route-does-not-exist");
    expect(content('meta[name="robots"]')).toBe("noindex, follow");
    expect(document.title).toBe("Comfort Aircon");
  });

  it("keeps the sitemap route table in sync with a unique path per entry", () => {
    const paths = seoData.routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("/");
  });
});
