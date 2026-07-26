// @ts-check
import { defineConfig } from 'astro/config';

// astro.config.mjsはNodeで直接評価されるため、Vite経由のimport.meta.envではなくprocess.envを使う。
// site/src/config/site.ts側(import.meta.env)と値の意味は揃えている(.env.example参照)。
const siteUrl = process.env.PUBLIC_SITE_URL || 'https://k-snapstep.com';

// https://astro.build/config
export default defineConfig({
	// 静的出力を前提とする(docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 23番のAstro移行方針どおり)。
	// Astroのデフォルトも'static'だが、方針を明示するため記載する。
	output: 'static',

	// canonical/sitemap生成の土台となる本番/ステージングURL。PUBLIC_SITE_URL未設定時は本番候補URL。
	// 実際のドメイン運用方法・公開方法は未確定のため、本番反映はまだ行わない。
	site: siteUrl,

	// sitemapは公式連携(@astrojs/sitemap)を試したが、build.format: 'preserve'による混在ルーティング
	// (ディレクトリ形式のページ+拡張子付きの/privacy.html)を正しく認識できず、末尾スラッシュや
	// 拡張子が欠落したURLを出力したため採用しなかった(docs/KSNAPSTEP_LAUNCH_FOUNDATION.md 14番参照)。
	// 代わりに src/pages/sitemap.xml.ts で、実際のページ構成に合わせたURL一覧を直接出力する。

	// build.format: 'preserve' を指定すると、src/pages/privacy.astro のように
	// ファイル名に拡張子を含むページはそのURLのまま出力され、
	// 他の.astroページは通常どおりディレクトリ形式(/foo/)で出力される。
	// /privacy.html というURLを維持しつつ、他の新規ページは拡張子なしURLにするための設定。
	build: {
		format: 'preserve',
	},
});
