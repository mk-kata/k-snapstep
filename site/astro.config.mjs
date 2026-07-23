// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// 静的出力を前提とする(docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 23番のAstro移行方針どおり)。
	// Astroのデフォルトも'static'だが、方針を明示するため記載する。
	output: 'static',

	// canonical/sitemap生成の土台として仮のドメインを設定する。
	// 実際のドメイン運用方法・公開方法は未確定のため、本番反映はまだ行わない。
	site: 'https://k-snapstep.com',

	// sitemap連携(@astrojs/sitemap等)は今回はまだ追加しない。
	// 既存ルートのsitemap.xmlとの重複を避けるため、追加は次工程で行う(site/README.md参照)。
	integrations: [],

	// build.format: 'preserve' を指定すると、src/pages/privacy.html のように
	// ファイル名に拡張子を含むページはそのURLのまま出力され、
	// 他の.astroページは通常どおりディレクトリ形式(/foo/)で出力される。
	// /privacy.html というURLを維持しつつ、他の新規ページは拡張子なしURLにするための設定。
	build: {
		format: 'preserve',
	},
});
