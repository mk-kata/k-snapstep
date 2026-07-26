// K-SNAPSTEP robots.txt(Astro側で生成する新サイト用。リポジトリルートの既存robots.txtはそもそも存在しない)
//
// 参照元: docs/KSNAPSTEP_LAUNCH_FOUNDATION.md 15番。
// production(PUBLIC_SITE_ENV=production)のみクロールを許可し、sitemapを案内する。
// それ以外(staging・development)は全体をcrawl拒否にし、本番用sitemapを案内しない
// (docs/KSNAPSTEP_LAUNCH_FOUNDATION.md 16番のステージング構成方針と対応)。
import { site, shouldIndex } from "../config/site";

export const prerender = true;

export function GET() {
  const body = shouldIndex
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site.url).toString()}\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
