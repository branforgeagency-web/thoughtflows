import mongoose from "mongoose";
import Course from "../models/Course.js";
import Branch from "../models/Branch.js";

const BASE_URL = process.env.SITE_URL || process.env.CLIENT_URL || "https://thoughtflows.in";

// Standard fallback course slugs in case DB doesn't have all entries yet
const FALLBACK_COURSE_SLUGS = [
  "cpc-certification",
  "cic-certification",
  "coc-certification",
  "cpma-certification",
  "hcc-risk-adjustment",
  "medical-billing-denial-management",
  "cedc-certification",
  "advanced-em-surgery-coding",
  "cdeo-certification",
  "cdei-certification",
  "cppm-certification",
  "ccs-certification",
  "ccs-p-certification",
  "rhia-certification",
  "rhit-certification",
  "ccc-certification",
  "him-certification",
  "surgery-specialty-coding",
  "ed-specialty-coding",
  "em-specialty-coding",
  "radiology-specialty-coding",
  "anesthesia-specialty-coding",
  "ip-drg-coding",
  "ivr-specialty-coding",
  "cdi-specialty-coding",
  "medical-coding-foundation"
];

// Standard fallback branch slugs
const FALLBACK_BRANCH_SLUGS = [
  "gandhipuram-coimbatore",
  "hope-college-coimbatore",
  "saravanampatti-coimbatore",
  "trichy",
  "salem",
  "kochi",
  "trivandrum",
  "vizag",
  "tirupathi",
  "ameerpet-hyderabad",
  "dilsukhnagar-hyderabad"
];

const FALLBACK_BLOG_SLUGS = [
  "cpc-exam-preparation-guide-2026",
  "aapc-vs-ahima-certification-comparison",
  "medical-coding-career-roadmap-2026",
  "demystifying-icd-10-cm-coding-guidelines"
];

const STATIC_PAGES = [
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

export const getSitemap = async (req, res, next) => {
  try {
    const todayStr = new Date().toISOString().split("T")[0];

    // Fetch DB courses and branches
    let dbCourses = [];
    let dbBranches = [];
    try {
      if (mongoose.connection.readyState === 1) {
        dbCourses = await Course.find({}, "slug updatedAt").lean();
        dbBranches = await Branch.find({}, "slug updatedAt").lean();
      }
    } catch (dbErr) {
      console.warn("[Sitemap] MongoDB query failed, falling back to static lists:", dbErr.message);
    }

    const courseMap = new Map();
    // Pre-populate with fallback
    for (const slug of FALLBACK_COURSE_SLUGS) {
      courseMap.set(slug, todayStr);
    }
    // Override/add DB entries
    for (const c of dbCourses) {
      if (c.slug) {
        const lastMod = c.updatedAt ? new Date(c.updatedAt).toISOString().split("T")[0] : todayStr;
        courseMap.set(c.slug, lastMod);
      }
    }

    const branchMap = new Map();
    // Pre-populate with fallback
    for (const slug of FALLBACK_BRANCH_SLUGS) {
      branchMap.set(slug, todayStr);
    }
    // Override/add DB entries
    for (const b of dbBranches) {
      if (b.slug) {
        const lastMod = b.updatedAt ? new Date(b.updatedAt).toISOString().split("T")[0] : todayStr;
        branchMap.set(b.slug, lastMod);
      }
    }

    const urls = [];

    // Static pages
    for (const page of STATIC_PAGES) {
      urls.push(`  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${todayStr}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
    }

    // Dynamic courses
    for (const [slug, lastmod] of courseMap.entries()) {
      urls.push(`  <url>
    <loc>${BASE_URL}/courses/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    // Dynamic branches
    for (const [slug, lastmod] of branchMap.entries()) {
      urls.push(`  <url>
    <loc>${BASE_URL}/branches/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    // Blogs
    for (const slug of FALLBACK_BLOG_SLUGS) {
      urls.push(`  <url>
    <loc>${BASE_URL}/blogs/${slug}</loc>
    <lastmod>${todayStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml; charset=utf-8");
    return res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
};

export const getRobotsTxt = (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${BASE_URL}/sitemap.xml
`;
  res.header("Content-Type", "text/plain; charset=utf-8");
  return res.status(200).send(robots);
};
