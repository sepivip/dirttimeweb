import type { APIRoute } from "astro";
import { pages } from "../site";

export const GET: APIRoute = ({ site }) => {
  const urls = Object.keys(pages).map((route) => {
    return `  <url><loc>${new URL(route, site).href}</loc></url>`;
  });
  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls,
      "</urlset>",
    ].join("\n") + "\n",
    { headers: { "Content-Type": "application/xml; charset=UTF-8" } },
  );
};
