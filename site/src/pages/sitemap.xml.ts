// K-SNAPSTEP sitemap.xml(Astro側で生成する新サイト用。リポジトリルートの既存sitemap.xmlとは別物)
//
// 参照元: docs/KSNAPSTEP_LAUNCH_FOUNDATION.md 14番。
// 公式連携(@astrojs/sitemap)は、build.format: "preserve"による混在ルーティング
// (ディレクトリ形式ページ + 拡張子付きの/privacy.html)を正しく認識できず、
// 末尾スラッシュ・拡張子が欠落したURLを出力したため採用しなかった。
// 実際に出力される静的ページの一覧に完全に一致させるため、手動で列挙する。
//
// 含める: 固定ページ・読みもの一覧・シリーズ一覧・公開記事のみ。
// 含めない: 404・draft記事・存在しないURL・重複URL。
import { getCollection } from "astro:content";
import { site, urls } from "../config/site";

export const prerender = true;

export async function GET() {
  const staticPaths = [
    urls.home,
    urls.oneDayWebManager,
    urls.monthlySupport,
    urls.services,
    urls.profile,
    urls.contact,
    urls.reading,
    `${urls.reading}website-review/`,
    urls.privacy,
  ];

  const articles = await getCollection("articles", ({ data }) => !data.draft && data.series === "website-review");
  const articlePaths = articles.map((article) => `${urls.reading}website-review/${article.data.slug ?? article.id}/`);

  const allPaths = [...staticPaths, ...articlePaths];

  const urlEntries = allPaths
    .map((path) => `  <url>\n    <loc>${new URL(path, site.url).toString()}</loc>\n  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
