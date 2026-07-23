# K-SNAPSTEP Astroサイト(新環境・構築中)

このディレクトリ(`site/`)は、新しいK-SNAPSTEPサイト用のAstroプロジェクトです。

**リポジトリルートにある既存の静的サイト(`index.html`・`labo/index.html`・`privacy.html`・`css/`・`js/`・`images/`・`sitemap.xml`等)は、現在の本番サイトの参照用としてそのまま残しています。** このAstro環境の作成にあたって、既存ルートファイルは一切変更・移動・削除していません。公開方法(自動デプロイか手動アップロードか)が未確認のため、当面はルートの既存ファイルを直接編集しません。

現時点では、共通レイアウト・共通ヘッダー・共通フッター・基本ナビゲーション・固定ページのルート骨格・CSSトークンが実装されています。**確定本文の全面実装、GTM、formrun、JSON-LD、リダイレクト、本番公開はまだ行っていません。**次工程で、まずトップページの確定9セクション本文を実装する予定です。

---

## 開発コマンド

```bash
cd site
npm install   # 依存関係のインストール
npm run dev   # 開発サーバー起動(http://localhost:4321 等)
```

## ビルドコマンド

```bash
npm run build
```

## プレビューコマンド

```bash
npm run preview
```

## 出力先

`site/dist/`(Astro標準のビルド出力ディレクトリ)。本番へアップロードする場合は、このディレクトリの中身のみを対象とする想定(docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 24番)。**ただし、本番公開方法は今回もまだ確認できておらず未確定。**

---

## 記事の置き場所

`site/src/content/articles/`(Markdown、`.md`)。読み込み定義は `site/src/content.config.ts`(Astroの現在の推奨方法であるContent Layer API・`glob`ローダーを使用)。

初期スキーマ項目: `title`・`description`・`publishedDate`・`updatedDate`・`draft`・`relatedArticles`・`serviceLink`・`serviceLinkText`。

`thumbnail`・`category`・`tag`・読了時間・複雑な著者情報は、今回は初期必須にしていない(docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 14番の方針どおり)。

現在、動作確認用のサンプル記事(`sample-article.md`、`draft: true`)が1件だけ存在する。本番記事ではない。

## 画像の置き場所

`site/public/images/`・アイコン類は`site/public/icons/`。現時点ではプレースホルダー(`.gitkeep`)のみで、既存ルートの画像は複製・移植していない。

---

## SEO・計測に関する現状(未実装のもの)

- **GTM(`GTM-TXFRNQ3`)は、今回はまだAstro側へ設置していない。** 既存ルート実装では継続利用の方針(docs/KSNAPSTEP_SITE_SPEC.md 23番)だが、設置は次工程で行う
- **formrunは、今回はまだ設置していない**
- **JSON-LDは本実装していない。** 既存ルートの`index.html`にあるJSON-LD(「本来面目らぼ」名義、`LocalBusiness`型)は新事業内容と一致しないため移植せず、固定ページ実装時に新規作成する(docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 16番)
- 共通レイアウト(`src/layouts/BaseLayout.astro`)には、title・meta description・canonical・OGP(最小限)・Twitter Card・lang="ja"・favicon参照の「型」だけを用意した。値の多くは仮設定であり、正式なドメイン運用・ロゴ確定後に差し替える

## sitemap・robotsの扱い

- 既存ルートの`sitemap.xml`は、このAstro環境作成にあたって変更していない
- Astro側のsitemap自動生成(`@astrojs/sitemap`等の連携)は、**今回はまだ追加していない**。次工程で、既存ルートの`sitemap.xml`との重複が起きない運用方法(本番切り替え時にどちらか一方のみ設置する等)を決めたうえで追加する
- `robots.txt`は、ステージング環境と本番環境で扱いを変える必要があるため(検索エンジンにステージングを登録させない等)、今回の仮ページの段階では作成・確定していない

---

## `/labo/`の301転送

新サイト公開時は`/`へ301転送する方向(docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 18番の初期推奨案)。**今回はリダイレクト設定を作成していない。**

## `/privacy.html`の対応方針(更新)

初回公開では既存URL`/privacy.html`を維持する方向。**`src/pages/privacy.html`(プレーンHTML)から`src/pages/privacy.astro`(共通レイアウト使用)へ置き換えた。**

- `astro.config.mjs`の`build: { format: "preserve" }`により、ソースファイル名に拡張子(`.html`)を含む場合はそのURLのまま出力され、他の`.astro`ページは通常どおりディレクトリ形式(`/foo/`)で出力される
- `src/pages/privacy.astro`という**ファイル名(拡張子なし)**でも、Astroは出力パスをソースの相対パスから決定するため、`build.format: "preserve"`と組み合わせると`dist/privacy.html`としてフラットに出力される(実際にビルドで確認済み)
- 一時的に`src/pages/privacy.html`と`src/pages/privacy.astro`を共存させてビルドしたところ、`The route "/privacy" is defined in both...`という重複ルート警告(将来のAstroバージョンではハードエラーになる旨の警告つき)が出ることを確認したため、旧`privacy.html`は削除した
- 削除後の再ビルドでは警告が消え、`dist/privacy.html`のみが1件出力されることを確認済み
- 実際の条文はまだ移植していない仮ページ。既存ルートの`privacy.html`(正式実装元)は変更していない

## 共通レイアウト・共通部品

| ファイル | 役割 |
|---|---|
| `src/config/site.ts` | サイト名・肩書き・運営者・本番URL候補・各ページ仮URL・グローバルナビ項目・MARORIRI外部リンク・コピーライトを1箇所で管理 |
| `src/layouts/BaseLayout.astro` | `<!doctype html>`・`<html lang="ja">`・title/description/canonical/OGP/Twitter Card・favicon参照・skip link・共通ヘッダー・`<main id="main-content">`・共通フッターを提供。JSON-LD・GTMは未実装 |
| `src/components/global/SiteHeader.astro` | ブランド(文字ワードマーク)・通常ナビ5項目・独立CTA(お問い合わせ)。スマートフォンは開閉式ナビ(最小限のJS、JS失敗時は常時展開のフォールバック) |
| `src/components/global/SiteFooter.astro` | K-SNAPSTEP名・肩書き・代表・主要ページ/読みもの/法務等のナビ・MARORIRI外部リンク(控えめな1行)・コピーライト |
| `src/components/navigation/Breadcrumbs.astro` | 固定下層ページ用の最小パンくず(構造化データは未実装) |
| `src/components/page/PageHeader.astro` | ページ名・主見出し・導入文・バッジ・料金・補足・CTAを受け取る共通ページヘッダー(すべて任意) |
| `src/components/common/CtaBlock.astro` | 汎用CTA(primary/quiet/reading の3variant)。今回は各ページへの大量配置はしていない |

CSSはすべて`src/styles/tokens.css`に追加した(header/nav/footer/breadcrumbs/page-header/cta/skip-link/build-notice等)。**このファイルはBaseLayout.astroの frontmatterで`import "../styles/tokens.css";`として読み込む方式に修正した**(以前は`public/`配下ではない場所を`<link href="/styles/tokens.css">`で直接参照しており、実際には配信されない状態だった。今回のビルド確認で発見し、Vite importベースの読み込みに修正して解消した)。

## 固定ページのルート骨格(今回追加、すべて仮本文)

| 出力URL | ソース |
|---|---|
| `/` | `src/pages/index.astro` |
| `/one-day-web-manager/` | `src/pages/one-day-web-manager/index.astro` |
| `/monthly-support/` | `src/pages/monthly-support/index.astro` |
| `/services/` | `src/pages/services/index.astro` |
| `/profile/` | `src/pages/profile/index.astro` |
| `/contact/` | `src/pages/contact/index.astro` |
| `/reading/` | `src/pages/reading/index.astro` |
| `/privacy.html` | `src/pages/privacy.astro` |
| `dist/404.html` | `src/pages/404.astro` |

いずれも確定本文は未実装(「本文は次工程で実装する」の仮表示のみ)。`/reading/`では、`draft: true`の記事は「公開中の記事」一覧には含めず、「開発確認用の下書き記事」という見出しで別枠表示する方針を実装済み。

---

## 本番公開に関する注意

**このAstro環境は、まだ本番公開しない。** ビルド確認・ローカルプレビューのみを目的とする。本番公開方法(ホスティング・デプロイ経路)は`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`のとおり未確定であり、確認が取れるまで`dist/`の内容を本番へアップロードしない。
