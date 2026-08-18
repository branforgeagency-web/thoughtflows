import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { ALL_COURSE_OPTIONS } from "../src/config/allCoursesList.js";
import { BRANCHES } from "../src/data/branches.js";
import { BLOG_POSTS } from "../src/data/blogs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.SITE_URL || "https://thoughtflows.in";
const TODAY = new Date().toISOString().split("T")[0];

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/about", priority: "0.8", changefreq: "monthly" },
  { url: "/courses", priority: "0.9", changefreq: "weekly" },
  { url: "/branches", priority: "0.9", changefreq: "weekly" },
  { url: "/our-team", priority: "0.8", changefreq: "monthly" },
  { url: "/placements", priority: "0.8", changefreq: "weekly" },
  { url: "/success-stories", priority: "0.8", changefreq: "weekly" },
  { url: "/gallery", priority: "0.7", changefreq: "monthly" },
  { url: "/blogs", priority: "0.8", changefreq: "weekly" },
  { url: "/contact", priority: "0.8", changefreq: "monthly" }
];

const courseSlugs = ALL_COURSE_OPTIONS.map((c) => c.value);
const branchSlugs = BRANCHES.map((b) => b.slug);
const blogSlugs = BLOG_POSTS.map((b) => b.slug);

function generateSitemapXml() {
  const urls = [];

  for (const page of staticPages) {
    urls.push(`  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  }

  for (const slug of courseSlugs) {
    urls.push(`  <url>
    <loc>${BASE_URL}/courses/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  for (const slug of branchSlugs) {
    urls.push(`  <url>
    <loc>${BASE_URL}/branches/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  for (const slug of blogSlugs) {
    urls.push(`  <url>
    <loc>${BASE_URL}/blogs/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

const sitemapXml = generateSitemapXml();
const targetPath = path.resolve(__dirname, "../public/sitemap.xml");

fs.writeFileSync(targetPath, sitemapXml, "utf8");
console.log(`[Sitemap] Generated sitemap.xml with ${staticPages.length + courseSlugs.length + branchSlugs.length} URLs at ${targetPath}`);
