// ─────────────────────────────────────────────────────────────────────────────
//  PAGE TITLE + SEO TAGS
//
//  This is a single-page app: the browser only ever loads index.html, so the
//  <title> and <link rel="canonical"> in that file would otherwise be the same
//  on every page. This hook rewrites them whenever a page mounts.
//
//  Use it once at the top of every page component:
//
//      usePageMeta({
//        title: "Bedrijven | T.I.S. Bedrijvendag",
//        description: "Alle deelnemende bedrijven.",
//        canonicalPath: "/November2026/bedrijven"
//      });
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from "react";
import { SITE_URL } from "../../site.config.js";

function setMetaTag(attribute, name, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(url) {
  if (!url) return;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export function usePageMeta({ title, description, canonicalPath }) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (title) document.title = title;

    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    }

    if (title) {
      setMetaTag("property", "og:title", title);
      setMetaTag("name", "twitter:title", title);
    }

    if (canonicalPath) {
      const url = `${SITE_URL}${canonicalPath}`;
      setCanonical(url);
      setMetaTag("property", "og:url", url);
    }
  }, [title, description, canonicalPath]);
}
