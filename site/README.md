# K-SNAPSTEP Astroサイト(構築中・本番未公開)

このディレクトリ(`site/`)は、新しいK-SNAPSTEPサイト用のAstroプロジェクトです。

**リポジトリルートにある既存の静的サイト(`index.html`・`labo/index.html`・`privacy.html`・`css/`・`js/`・`images/`・`sitemap.xml`等)は、現在の本番サイトの参照用としてそのまま残しています。** このAstro環境の作成にあたって、既存ルートファイルは一切変更・移動・削除していません。公開方法(自動デプロイか手動アップロードか)が未確認のため、当面はルートの既存ファイルを直接編集しません。

## 現在の実装状況(2026年7月27日時点)

- 固定ページ(トップ・1日WEB担当者・月額Web担当サポート・対応できること・プロフィール・お問い合わせ・プライバシーポリシー・404)、読みもの基盤(一覧・シリーズ一覧・記事詳細)を実装済み(詳細は`/Users/macbook/Desktop/本来面目/docs/KSNAPSTEP_PAGES_IMPLEMENTATION.md`)
- formrun・GTM・JSON-LD・sitemap・robots.txt・環境変数によるステージング切り替え・リダイレクト準備を実装済み(詳細は`/Users/macbook/Desktop/本来面目/docs/KSNAPSTEP_LAUNCH_FOUNDATION.md`)
- **正式OGP画像は未作成。** トップページデザイン確認後に、K-SNAPSTEP専用のOGP画像を作成する予定
- **本番公開方法(ホスティング・デプロイ経路)は未確定。**
- **本番公開は今回も行っていない。** `dist/`の内容を本番サーバーへアップロードすることは、公開方法が確認できるまで禁止する
- 次工程: 画面確認(実機・複数ブラウザ)、デザイン調整(配色・フォント・ロゴの最終確定)、公開方法の確認(`site/docs/PRE_LAUNCH_CHECKLIST.md`参照)

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

初期スキーマ項目: `title`・`description`・`publishedDate`・`updatedDate`・`draft`・`relatedArticles`・`serviceLink`・`serviceLinkText`。読みもの基盤の実装にあわせ`series`・`slug`・`introduction`・`sample`を追加した。

`thumbnail`・`category`・`tag`・読了時間・複雑な著者情報は、今回は初期必須にしていない(docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 14番の方針どおり)。

現在、動作確認用のサンプル記事が2件存在する。本番記事ではない。`sample-article.md`(`draft: true`)は非公開のまま、`sample-website-checkup.md`(`draft: false`・`sample: true`)は表示確認用として公開しているが、タイトル・本文に「サンプル」と明記し、noindex・Article構造化データ対象外にしている。

## 画像の置き場所

`site/public/images/`・アイコン類は`site/public/icons/`。現時点ではプレースホルダー(`.gitkeep`)のみで、既存ルートの画像は複製・移植していない。

---

## GTM(Googleタグマネージャー)

- 既存コンテナ`GTM-TXFRNQ3`を、共通レイアウト(`src/layouts/BaseLayout.astro`)経由で全ページに1回だけ出力する構成にした(`src/components/global/GtmHead.astro`・`GtmBody.astro`)
- **既定では無効。** `PUBLIC_ENABLE_GTM=true`を明示した場合のみ出力する(開発環境・ステージングでの誤計測を防止するため)
- コンテナIDは`PUBLIC_GTM_ID`で上書き可能(未設定時は`GTM-TXFRNQ3`)
- 既存静的サイトでは`index.html`・`privacy.html`にのみGTMが設置されており、`labo/index.html`には設置されていない不整合があったが、Astro版では共通レイアウト経由のため全ページで一貫して設置される

## formrun(お問い合わせフォーム)

- `site/src/pages/contact/index.astro`に実装済み。既存の正式実装元(`labo/index.html`)で確認したフォーム識別情報(`data-formrun-form`)・埋め込みスクリプト(`https://sdk.form.run/js/v2/embed.js`)・`data-formrun-redirect`をそのまま使用し、値は変更していない(`src/config/site.ts`の`formrun`定数に集約)
- 新しいフォームは作成していない。既存のformrun管理画面上の1つのフォームをそのまま利用する
- **既定では有効。** `PUBLIC_ENABLE_FORM=false`の場合のみ実際の埋め込みを無効化し、代替文言を表示する(ステージング等で誤って実際の問い合わせを送信させないための切り替え)
- スクリプト読み込み失敗時・JavaScript無効時の案内をそれぞれ用意した
- **formrun側で現在設定されている項目(お問い合わせの種類の選択肢等)はローカルのコードからは確認できない。** `docs/KSNAPSTEP_SITE_SPEC.md`15番の確定8択と一致しているかは、formrun管理画面での確認・更新が必要(詳細は`/Users/macbook/Desktop/本来面目/docs/KSNAPSTEP_LAUNCH_FOUNDATION.md`参照)

## JSON-LD

- サイト共通(`ProfessionalService`+`WebSite`、`src/components/seo/OrganizationJsonLd.astro`)を全ページで1回出力する。K-SNAPSTEPは法人組織ではなく屋号のため、`Organization`ではなく`ProfessionalService`を採用した
- 固定下層ページ・読みものページに`BreadcrumbList`(`BreadcrumbJsonLd.astro`)を追加した
- 1日WEB担当者・月額Web担当サポートページに`Service`(`ServiceJsonLd.astro`、確定料金のみ使用)を追加した
- 記事詳細に`BlogPosting`(`ArticleJsonLd.astro`)を追加した。**表示確認用のサンプル記事(`sample: true`)は対象外**とし、あわせてnoindexにしている
- 既存ルート`index.html`のJSON-LD(「本来面目らぼ」名義、`LocalBusiness`型、旧料金)は移植していない

## sitemap・robots.txt

- `src/pages/sitemap.xml.ts`で新サイト用のsitemapを生成する(固定ページ・読みもの一覧・シリーズ一覧・公開記事のみ、404・draft記事は含まない)
- 当初`@astrojs/sitemap`公式連携を試したが、`build.format: "preserve"`による混在ルーティング(ディレクトリ形式+`/privacy.html`)を正しく認識できず、末尾スラッシュ・拡張子が欠落したURLを出力したため採用しなかった。実際の出力ページに完全一致するURLを手動で列挙する方式にした
- 既存ルートの`sitemap.xml`は、このAstro環境作成にあたって変更していない(別ファイルであり重複しない)
- `src/pages/robots.txt.ts`で、`PUBLIC_SITE_ENV=production`のときのみ`Allow: /`+sitemap案内、それ以外は`Disallow: /`を出力する

## 環境変数

`.env.example`参照(実際の秘密情報は含まない)。

| 変数 | 既定値 | 役割 |
|---|---|---|
| `PUBLIC_SITE_URL` | `https://k-snapstep.com` | canonical・OGP・sitemap・robotsの基準URL |
| `PUBLIC_SITE_ENV` | 未設定(development扱い) | `production`以外は常にnoindex・robots全体拒否 |
| `PUBLIC_GTM_ID` | `GTM-TXFRNQ3` | GTMコンテナID |
| `PUBLIC_ENABLE_GTM` | `false`扱い | `true`のときのみGTM出力 |
| `PUBLIC_ENABLE_FORM` | 有効 | `false`のときのみformrun埋め込みを無効化 |

## ステージング構成

- production以外(staging・development)は、ページ個別のnoindex指定に関わらず常にnoindexになる(`src/layouts/BaseLayout.astro`)
- `robots.txt`もproduction以外は全体クロール拒否になる
- GTMは明示的に有効化しない限り出力されない
- formrunは`PUBLIC_ENABLE_FORM=false`で実埋め込みを止められる
- 本番URLは`PUBLIC_SITE_URL`で切り替えるため、ステージングURLをそのままcanonical・sitemap・robotsへ反映できる

## `/labo/`の301転送(準備のみ・未適用)

新サイト公開時は`/`へ301転送する方針(docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 18番の初期推奨案)。`site/deploy/apache/.htaccess.example`に転送案を用意したが、**今回は本番・ステージングいずれにも適用していない**(`public/`配下にも配置していないため、ビルド出力には含まれない)。ホスティング環境(Apacheかどうか含む)を確認したうえで、公開作業時に手動で適用する想定。

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

`/`(トップページ)以外は確定本文が未実装(「本文は次工程で実装する」の仮表示のみ)。`/reading/`では、`draft: true`の記事は「公開中の記事」一覧には含めず、「開発確認用の下書き記事」という見出しで別枠表示する方針を実装済み。

---

## トップページ(確定9セクション実装済み)

`src/pages/index.astro`に、`docs/KSNAPSTEP_SITE_SPEC.md`10番・`docs/KSNAPSTEP_WIREFRAME.md`9番の確定9セクション(ファーストビュー/困りごと/K-SNAPSTEPが行うこと/1日WEB担当者と月額Web担当サポート/相談テーマ例/幅広く確認できる理由/必要な実作業について/片山まゆみプロフィール/お問い合わせ)を実装した。詳細は`docs/KSNAPSTEP_HOME_IMPLEMENTATION.md`を参照。

- **本文の正本**: `KSNAPSTEP_SITE_SPEC.md` > `KSNAPSTEP_WIREFRAME.md` > `KSNAPSTEP_DESIGN_GUIDE.md` > `MARORIRI_SITE_SPEC.md`(ブランド再構成前の確定本文)の優先順で使用した。確定本文がある箇所は要約・言い換えせずそのまま使用している
- **2026年7月23日 本文監査により更新**: `docs/KSNAPSTEP_HOME_COPY_AUDIT.md`の調査により、セクション2(困りごと)・5(相談テーマ例)・6(幅広く確認できる理由)・7(必要な実作業)・8(プロフィール概要)、および参考発見のセクション9(お問い合わせ)の確定本文が`docs/MARORIRI_SITE_SPEC.md`15-1(旧トップページ本文)にそのまま存在することが判明し、暫定文から差し替えた。いずれもMARORIRIというブランド名の言及がなく、変更なしで使用できた。**特にセクション6は、前回実装で資料整理用の項目ラベル(「幅広い範囲を確認できる理由」)を誤って表示見出しとして使用していたバグがあり、実際の確定見出し(「Webサイトだけでなく、その周辺まで確認します。」)へ訂正した**
- 旧「本来面目らぼ」・「頭の中をほどく」・占い(`unki_guide`・`uranai_blender`)・マロリリコーダー部・コーディングチェック等は一切含めていない(ビルド後のHTMLで不在を確認済み)
- MARORIRIへの言及はトップページ本文にはなく、共通フッターの補助リンクのみ
- プロフィール写真・新ロゴ・図版はいずれも未使用/未作成
- トップページ専用コンポーネント: `src/components/home/`配下(HeroSection・ConcernsSection・RoleSection・ServiceComparison・TopicsSection・ExperienceSection・WorkSupportSection・ProfileSummary)。セクション9(お問い合わせ)は新規コンポーネントを作らず、既存の`CtaBlock`を`headingLevel="h2"`で再利用した(見出し階層をh2で統一するため、`CtaBlock`に`headingLevel`propを追加した)
- 専用CSSは`src/styles/home.css`(トップページからのみ`import`。既存の`tokens.css`は変更せず、その上に追加する形)
- トップページのみ、共通レイアウトの`showBuildNotice={false}`により「Astro基盤の動作確認用の仮ページです」という表示を非表示にした(下層ページは引き続き表示)

---

## トップページ デザイン比較用の一時ページ(`/__review/`、削除予定)

`docs/KSNAPSTEP_HOME_DESIGN_OPTIONS.md`の作業で、既存トップページ(`/`)の文章・構成を一切変更せず、見た目のみ異なる2つのデザイン案を比較できるようにした一時ページ。

- URL: `/__review/home-design-a/`(実務ノート・エディトリアル案)・`/__review/home-design-b/`(外部Web担当者・進行ボード案)
- 実装: `src/pages/[...reviewSlug].astro`(動的ルート。Astroは`src/pages/`配下の`_`始まりのファイル/フォルダを自動的にルーティング対象から除外するため、`__review/`という出力パスにするには`getStaticPaths()`の`params`で直接指定する方式を取った)、表示コンポーネントは`src/components/review/HomeDesignA.astro`・`HomeDesignB.astro`、本文データは`src/data/homeContent.ts`(既存トップページの確定本文を一字一句そのまま書き写した、比較専用の読み取り元)
- 常にnoindex固定。`src/pages/sitemap.xml.ts`は出力ページを自動探索せず手動列挙のため、この2ページは追加していない限りsitemapに含まれない
- ヘッダー・フッターのナビゲーションからはリンクしていない
- スクリーンショット(`review/home-design-options/`)は容量が大きいため`.gitignore`でGit管理対象外にしている
- **デザイン決定後に削除する想定の一時実装。** 本番採用するデザインが決まったら、採用しない側のコンポーネント・このルートファイル・`src/data/homeContent.ts`・比較用スクリーンショットを削除し、採用したデザインを`src/pages/index.astro`・`src/components/home/`側へ反映する

## 本番公開に関する注意

**このAstro環境は、まだ本番公開しない。** ビルド確認・ローカルプレビューのみを目的とする。本番公開方法(ホスティング・デプロイ経路)は`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`のとおり未確定であり、確認が取れるまで`dist/`の内容を本番へアップロードしない。
