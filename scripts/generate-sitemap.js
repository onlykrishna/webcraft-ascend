#!/usr/bin/env node
/**
 * Scalvicon — Sitemap Generator
 * Fetches published blog posts from Firestore and generates public/sitemap.xml
 *
 * Usage:
 *   node scripts/generate-sitemap.js
 *
 * Requires:
 *   serviceAccountKey.json in project root
 *   Download from: Firebase Console → Project Settings → Service accounts → Generate new private key
 */

const fs = require("fs");
const path = require("path");

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const BASE_URL = "https://scalvicon-9bf2f.web.app";

const escXml = (s) =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

async function generateSitemap() {
    console.log("📡 Fetching published blog posts from Firestore…");

    const staticPages = [
        { url: "", priority: "1.0", changefreq: "daily" },
        { url: "/blog", priority: "0.9", changefreq: "weekly" },
    ];

    const snap = await db
        .collection("blog")
        .where("status", "==", "published")
        .get();

    const blogPages = snap.docs.map((d) => {
        const data = d.data();
        const lastmod = data.updatedAt
            ? data.updatedAt.toDate().toISOString()
            : data.publishedAt?.toDate().toISOString() ?? new Date().toISOString();
        return {
            url: `/blog/${data.slug}`,
            priority: "0.8",
            changefreq: "weekly",
            lastmod,
        };
    });

    const pages = [...staticPages, ...blogPages];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
            .map(
                (p) => `  <url>
    <loc>${escXml(`${BASE_URL}${p.url}`)}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ""}
  </url>`,
            )
            .join("\n")}
</urlset>`;

    const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
    fs.writeFileSync(outPath, xml, "utf-8");

    console.log(`✅ Sitemap written → ${outPath}`);
    console.log(`   ${pages.length} URLs (${blogPages.length} blog posts)`);

    process.exit(0);
}

generateSitemap().catch((err) => {
    console.error("❌ Sitemap generation failed:", err);
    process.exit(1);
});
