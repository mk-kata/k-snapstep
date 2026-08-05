# K-SNAPSTEP 共通レイアウト・ヘッダー・フッター・固定ページ骨格 構築報告書

`docs/KSNAPSTEP_ASTRO_BASE_SETUP.md`・`docs/KSNAPSTEP_PRE_IMPLEMENTATION_RECORD.md`・`docs/KSNAPSTEP_SITE_SPEC.md`・`docs/KSNAPSTEP_WIREFRAME.md`・`docs/KSNAPSTEP_DESIGN_GUIDE.md`・`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`・`docs/IMPLEMENTATION_DECISIONS.md`の内容と矛盾しないよう作成しています。

今回、K-SNAPSTEP新サイト(`/Users/macbook/Desktop/kーsnapstep/ksnapstep/site/`)に、共通レイアウト・ヘッダー・フッター・基本ナビゲーション・固定ページのルート骨格を実装しました。**確定本文の全面実装、GTM、formrun、JSON-LD、リダイレクト、本番公開は行っていません。**

---

## 1. 作業日時

2026年7月23日

---

## 2. 作業ブランチ

`feature/ksnapstep-astro-rebuild`(前回作業から継続。今回新規作成・切り替えなし。commit・push・mainブランチへの変更は行っていない)

作業開始前に、絶対パス(`/Users/macbook/Desktop/kーsnapstep/ksnapstep/`)・現在のブランチ・`git status`(未追跡`site/`のみ)・既存ルートファイルの無変更(ハッシュ比較)・`site/`内の現在の構成・ビルド成功・`build.format: "preserve"`設定を確認したうえで着手した。

---

## 3. 作成・更新したファイル

### 新規作成

```text
site/src/config/site.ts
site/src/layouts/BaseLayout.astro           (既存を全面拡張)
site/src/components/global/SiteHeader.astro
site/src/components/global/SiteFooter.astro
site/src/components/navigation/Breadcrumbs.astro
site/src/components/page/PageHeader.astro
site/src/components/common/CtaBlock.astro
site/src/pages/privacy.astro                (旧 privacy.html を置き換え)
site/src/pages/one-day-web-manager/index.astro
site/src/pages/monthly-support/index.astro
site/src/pages/services/index.astro
site/src/pages/profile/index.astro
site/src/pages/contact/index.astro
site/src/pages/reading/index.astro
```

### 更新

```text
site/astro.config.mjs   (build.format: "preserve" は既存のまま維持)
site/src/pages/index.astro   (共通レイアウト・ヘッダー・フッターを使用する構成へ変更)
site/src/pages/404.astro     (共通レイアウトを使用する構成へ変更、noindex追加)
site/src/styles/tokens.css   (header/footer/breadcrumbs/page-header/cta等を追加)
site/README.md               (今回の変更内容を追記)
```

### 削除

```text
site/src/pages/privacy.html   (Astro版 privacy.astro へ置き換え後、重複ルート確認のうえ削除)
```

既存リポジトリルートのファイル(`index.html`・`labo/index.html`・`privacy.html`・`css/`・`js/`・`images/`・`sitemap.xml`等)は一切変更していない。

---

## 4. 共通レイアウト

`site/src/layouts/BaseLayout.astro`を全面拡張した。

- `<!doctype html>`・`<html lang="ja">`・`<head>`(title・meta description・canonical・OGP基本項目・Twitter Card基本項目・favicon参照・viewport)
- skip link(`<a class="skip-link" href="#main-content">本文へ移動</a>`)
- 共通ヘッダー(`SiteHeader`)・`<main id="main-content">`・共通フッター(`SiteFooter`)を配置
- ページから渡せるprops: `title`・`description`・`canonical`・`noindex`・`ogType`・`ogImage`・`bodyClass`・`layoutType`
- JSON-LD・GTMは今回実装していない(コメントで場所のみ明示)

**今回発見・修正したバグ**: 前回セッションで作成した`tokens.css`は`src/styles/`配下に置かれていたが、`BaseLayout.astro`からは`<link rel="stylesheet" href="/styles/tokens.css" />`という固定パスで参照していた。この参照方法は`public/`配下のファイルにしか有効でないため、実際にはCSSが配信されず404になっていた(前回のビルドでは`dist/styles/`ディレクトリ自体が生成されていないことを確認して発覚)。今回、`BaseLayout.astro`のfrontmatterで`import "../styles/tokens.css";`とするVite importベースの読み込みに修正し、Astroが自動生成するハッシュ付きファイル(`dist/_astro/BaseLayout.*.css`)として正しく配信されることをビルド出力で確認した。

---

## 5. サイト共通設定

`site/src/config/site.ts`を新規作成した。

- `site`: name(K-SNAPSTEP)・tagline(小さな会社の外部Web担当者)・owner(片山まゆみ)・url(`https://k-snapstep.com`、候補)・lang(ja)・defaultTitle・defaultDescription
- `urls`: home・oneDayWebManager・monthlySupport・services・profile・reading・contact・privacyの仮URL一式
- `mainNav`: グローバルナビ通常5項目(配列で管理、変更しやすい構造)
- `contactCta`: 独立CTA(お問い合わせ)
- `maroriri`: `https://maroriri.com/`(候補)、`isExternal: true`
- `copyright`: `© K-SNAPSTEP`

note・ココナラ・本来面目noteへのリンクは、指示どおりこの共通設定に含めていない。

---

## 6. ヘッダー

`site/src/components/global/SiteHeader.astro`を新規作成した。

- ブランド: 文字だけの仮ワードマーク(「K-SNAPSTEP」+「小さな会社の外部Web担当者」)。画像ロゴ・片山まゆみの個人名は大きく表示していない
- デスクトップ: 左にワードマーク、右に通常ナビ5項目(テキストリンク)、末尾にお問い合わせCTA(`.btn-primary`のみ主CTA、他はボタン化していない)
- ナビ項目は`site.ts`の`mainNav`配列から生成(変更しやすい構造)
- 固定ヘッダーは採用していない(通常のフロー内に配置)

---

## 7. スマートフォンナビ

- メニュー開閉ボタンを`<button type="button">`として実装し、`aria-expanded`・`aria-controls="site-nav"`を付与
- 最小限のJavaScript(コンポーネント内`<script>`)でクリック時に開閉、`aria-expanded`を切り替え、開いた際は最初のナビリンクへフォーカスを移動
- Escapeキーでメニューを閉じ、フォーカスをトグルボタンへ戻す
- メニュー外クリックへの対応は実装していない(指示どおり必須としていない)
- **JavaScriptなしでも到達できる設計**: CSSでは`html.js-nav-enabled`クラスが付いた場合のみモバイル幅でナビを折りたたむ。このクラスは、JS実行が正常に完了した場合の最後にのみ`document.documentElement.classList.add("js-nav-enabled")`で付与される(try/catchで保護)。JavaScriptが無効・エラーで失敗した場合はこのクラスが付与されず、ナビは常時展開表示のままとなり、主要ページへの到達手段が失われない
- `prefers-reduced-motion`に配慮し、アニメーション(トランジション)は今回付与していない(display切り替えのみ)

---

## 8. フッター

`site/src/components/global/SiteFooter.astro`を新規作成した。

- K-SNAPSTEP・肩書き・代表(片山まゆみ)
- 主要ページ(1日WEB担当者/月額Web担当サポート/対応できること/片山まゆみについて)・読みもの(読みもの一覧)・法務等(お問い合わせ/プライバシーポリシー)の3列ナビ
- MARORIRIへの外部リンク: 「コーダー・Web制作者向けの活動 / MARORIRI」という短い方の文言を採用(長い方の候補は使用していない)。他の主要ナビと同列に置かず、末尾の控えめな1行として配置
- 外部リンクである旨は、視覚的な矢印記号(`↗`、`aria-hidden`)+スクリーンリーダー向けテキスト(`(外部サイト)`)の両方で示した
- コピーライト(`© K-SNAPSTEP`)

---

## 9. パンくず

`site/src/components/navigation/Breadcrumbs.astro`を新規作成した。

- `items: { label: string; href?: string }[]`を受け取る
- `<nav aria-label="パンくず">`+`<ol>`(順序付きリスト)
- `href`を指定しない項目(現在ページ)はリンクにせず`<span aria-current="page">`で表示
- 構造化データ(BreadcrumbList)は今回実装していない
- 長いページ名は`overflow-wrap: anywhere`でスマートフォンでも折り返せるようにした
- トップページ(`index.astro`)では使用していない(呼び出し側で判断する設計)

---

## 10. ページヘッダー

`site/src/components/page/PageHeader.astro`を新規作成した。

- 受け取る情報: `pageName`・`heading`・`intro`・`badges`・`price`・`note`・`ctaLabel`・`ctaHref`(料金・CTA・バッジはすべて任意)
- 1日WEB担当者・月額Web担当サポートでは料金・バッジ・CTAを指定し、対応できることページでは料金を指定せず未表示にした(すべてのページで料金・CTAを必須にしない設計を確認済み)

---

## 11. CTA

`site/src/components/common/CtaBlock.astro`を新規作成した。

- 受け取る情報: `label`・`heading`・`body`・`buttonLabel`・`url`・`variant`(primary/quiet/reading)・`secondaryLinkLabel`・`secondaryLinkUrl`
- 今回はコンポーネントの作成のみ行い、各ページへの大量配置は行っていない(いずれの固定ページ骨格からも呼び出していない)

---

## 12. 作成した仮ページ

| ページ | ソース |
|---|---|
| トップ | `site/src/pages/index.astro`(共通レイアウト化、主要ページへの仮リンク・Content Collections動作確認を表示) |
| 1日WEB担当者 | `site/src/pages/one-day-web-manager/index.astro`(パンくず・PageHeader・55,000円(税込)・単発・「本文は次工程で実装する」仮表示) |
| 月額Web担当サポート | `site/src/pages/monthly-support/index.astro`(パンくず・PageHeader・月額55,000円(税込)・月2回各60分・仮表示) |
| 対応できること | `site/src/pages/services/index.astro`(パンくず・PageHeader・料金非表示) |
| プロフィール | `site/src/pages/profile/index.astro`(パンくず・PageHeader・プロフィール写真は非表示) |
| お問い合わせ | `site/src/pages/contact/index.astro`(パンくず・PageHeader・formrun設置予定の仮表示) |
| 読みもの | `site/src/pages/reading/index.astro`(パンくず・PageHeader・サンプル記事の扱いは14番参照) |
| プライバシーポリシー | `site/src/pages/privacy.astro`(13番参照) |
| 404 | `site/src/pages/404.astro`(共通レイアウト化、noindex追加) |

いずれも確定本文は実装しておらず、「本文は次工程で実装する」旨の仮表示のみ。

---

## 13. privacy.htmlの変更

`site/src/pages/privacy.html`(プレーンHTML)を`site/src/pages/privacy.astro`(共通レイアウト使用)へ置き換えた。

- `astro.config.mjs`の`build: { format: "preserve" }`は変更せず維持
- 置き換え作業の途中、旧`privacy.html`と新`privacy.astro`を一時的に共存させた状態でビルドし、「`The route "/privacy" is defined in both "src/pages/privacy.astro" and "src/pages/privacy.html"`」という重複ルート警告(将来のAstroバージョンではハードエラーになる旨の注記つき)が出ることを確認した
- 旧`privacy.html`を削除し、再ビルドで警告が消え、`dist/privacy.html`のみが1件出力されることを確認したうえで削除を確定した
- 共通レイアウト・共通ヘッダー・共通フッターを使用し、パンくずも表示する
- 現時点では仮本文のみ。本番の条文はまだ全面移植していない
- リポジトリルートの既存`privacy.html`は変更していない

---

## 14. URL出力結果

`build.format: "preserve"`のまま、指示どおりの構成で出力されることを確認した。

```text
dist/
├── index.html
├── one-day-web-manager/index.html
├── monthly-support/index.html
├── services/index.html
├── profile/index.html
├── contact/index.html
├── reading/index.html
├── privacy.html
├── 404.html
└── _astro/BaseLayout.*.css   (CSSのバグ修正により新たに生成)
```

`privacy/index.html`・404の重複・`404/index.html`・ページURLの二重生成は、いずれも発生していないことを確認した(9ページすべてが意図どおりの1件ずつで出力)。

---

## 15. Content Collectionsの扱い

- スキーマ定義(`src/content.config.ts`)は前回作成のものをそのまま使用し、今回は変更していない
- `site/src/pages/reading/index.astro`で、`getCollection("articles")`の結果を`draft === false`(公開中)と`draft === true`(下書き)に分けて表示する処理を実装した
- サンプル記事(`sample-article.md`)は`draft: true`のため、「公開中の記事」一覧には表示されず(「現在、公開中の記事はありません」と表示)、「開発確認用の下書き記事」という見出しの下に明記して表示されることをビルド出力で確認した
- 一覧ページ・記事詳細ページの本格的なデザイン実装は行っていない

---

## 16. CSS基盤

`site/src/styles/tokens.css`に、既存の暫定トークン(候補2の配色・案Bのゴシック体・3段階余白等)を維持したまま、次を追加した。

- 共通ヘッダー(`.site-header`系)・デスクトップナビ(`.site-nav`)・スマートフォンナビ(`@media (max-width: 760px)`内、`html.js-nav-enabled`と組み合わせた折りたたみ)
- 共通フッター(`.site-footer`系)
- パンくず(`.breadcrumbs`系)
- ページヘッダー(`.page-header`系)
- 主CTA・副CTA(既存`.btn-primary`・`.btn-ghost`をそのまま使用)
- テキストリンク(`main a`に下線)・外部リンク識別(`.external-link-indicator`)
- 仮ページ表示(`.build-notice`)
- フォーカス表示(既存の`:focus-visible`ルールを維持)・skip link(`.skip-link`)
- タップ領域の最小サイズ変数(`--tap-target-min: 44px`)を導入し、メニューボタン・ナビリンクに適用

ファイル冒頭・追加箇所ともに、配色・フォント・数値は暫定値であり最終デザインではない旨をコメントで明記している。角丸・影付きカードの多用、赤いボタンの多用は行っていない。

---

## 17. アクセシビリティ

| 項目 | 対応状況 |
|---|---|
| skip link | 実装済み(`.skip-link`、フォーカス時のみ表示) |
| lang="ja" | `BaseLayout.astro`の`<html lang={site.lang}>`で設定済み |
| 見出し階層 | 各ページ`<h1>`は`PageHeader`または直接1つのみ、本文内は`<h2>`以降を使用 |
| ナビのaria-label | `aria-label="グローバルナビゲーション"`(ヘッダー)・`aria-label="フッターナビゲーション"`(フッター)・`aria-label="パンくず"`を設定済み |
| スマートフォンメニューのaria属性 | `aria-expanded`・`aria-controls="site-nav"`を実装済み |
| キーボード操作 | メニュー開閉(Enter/Space、ボタン要素のため標準動作)・Escapeキーでの閉じる操作を実装済み |
| フォーカス表示 | 既存の`:focus-visible`ルール(青系、アクセント赤と別系統)を維持 |
| 外部リンクの識別 | MARORIRIリンクに矢印記号+`(外部サイト)`のスクリーンリーダー向けテキストを付与 |
| ボタンとリンクの区別 | メニュー開閉は`<button>`、ページ遷移は`<a>`で実装 |
| 十分なタップ領域 | `--tap-target-min: 44px`をメニューボタン・ナビリンクに適用 |
| 色だけで状態を示さない | ナビの開閉はdisplay切り替え+aria属性で示し、色のみに依存していない |
| prefers-reduced-motion | ナビ開閉にアニメーションを付与していないため、reduced motion環境でも追加の配慮は不要な構成にした |
| JavaScript無効時も本文が読める | 7番のとおり、JS失敗時もナビ・本文とも通常表示のまま到達可能な設計にした |

---

## 18. SEO基盤

各仮ページで、`BaseLayout`のprops経由でページ固有のtitle・description・canonical・OGP(title/description/url)・Twitter Cardを設定した(ビルド出力で全ページ分を確認済み、19番参照)。404ページには`noindex={true}`を指定し、`<meta name="robots" content="noindex, nofollow">`が出力されることを確認した。OGP画像は今回未設定(共通の仮参照も用意していない)。旧事業のJSON-LDは使用せず、GTMも設置していない。

---

## 19. ビルド結果

| 確認項目 | 結果 |
|---|---|
| `npx astro check` | **0 errors / 0 warnings / 11 hints**(hintは`astro:content`の`z`非推奨表示のみ、前回から変化なし) |
| `npm run build` | 成功。「9 page(s) built」 |
| 出力ファイル一覧 | `dist/index.html`・`dist/one-day-web-manager/index.html`・`dist/monthly-support/index.html`・`dist/services/index.html`・`dist/profile/index.html`・`dist/contact/index.html`・`dist/reading/index.html`・`dist/privacy.html`・`dist/404.html`・`dist/_astro/BaseLayout.*.css`・`dist/favicon.ico`・`dist/favicon.svg`・`dist/icons/.gitkeep`・`dist/images/.gitkeep` |
| 全ページのtitle確認 | 9ページすべてで意図どおりのtitleを`grep`で確認(例:「K-SNAPSTEP ｜ 小さな会社の外部Web担当者」「1日WEB担当者（仮） ｜ K-SNAPSTEP」等) |
| 全ページの共通ヘッダー・フッター確認 | 9ページすべてで`site-header`・`site-footer`クラスの存在を確認 |
| privacy.html出力確認 | `dist/privacy.html`として1件のみ出力(重複なし) |
| 404.html出力確認 | `dist/404.html`として出力、`noindex`メタタグを確認 |
| ナビリンク確認 | トップページの`site-nav`から6つの主要URL(`/one-day-web-manager/`等)へのリンクを確認 |
| draft記事の扱い確認 | `/reading/`で「開発確認用の下書き記事」の明記・「現在、公開中の記事はありません」の表示を確認 |
| 開発サーバー | 起動していない(`build`+`check`のみで確認。`ps aux`で未起動を確認済み) |

---

## 20. 既存ルートファイルの状態

作業開始前・作業完了後の2時点で、既存ルートファイル(`.git`・`site/`を除く全ファイル)の`sha256`ハッシュを比較し、**差分が0件であることを確認した**。既存ルートファイルは今回のAstro実装作業を通じて一切変更されていない。

---

## 21. Git差分

```text
On branch feature/ksnapstep-astro-rebuild
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	site/

nothing added to commit but untracked files present (use "git add" to track)
```

`git diff --stat`は空(既存の追跡対象ファイルへの変更なし)。commit・pushは行っていない。

---

## 22. 今回行わなかったこと

- 確定本文の全面実装(トップページ9セクションの完成含む)
- プロフィール写真の表示
- 新ロゴ作成
- 図版作成
- GTM設置
- formrun設置
- JSON-LD実装
- sitemap自動生成
- robots.txt作成
- リダイレクト(`/labo/`の301転送含む)
- ステージング環境構築
- 本番公開
- 既存ルートファイルの変更
- commit・push
- MARORIRIへの変更

---

## 23. 未確定事項

- トップページ確定9セクション・各固定ページの確定本文の実装時期
- K-SNAPSTEPの正式ロゴ・配色・フォント(CSS基盤はすべて暫定値のまま)
- GTM・formrunの実設置タイミング・設定内容
- OGP画像(共通の仮参照も含め今回は未設定)
- MARORIRIのURL(`https://maroriri.com/`は候補のまま)・フッター文言の最終確定
- 各固定ページの仮URL(`/one-day-web-manager/`等)の最終確定
- `docs/KSNAPSTEP_ASTRO_BASE_SETUP.md`から引き続き未確定の、本番公開方法・`/labo/`にGTMが設置されていない件の扱い等

---

## 24. 次の作業

1. トップページの確定9セクション本文の実装(`docs/KSNAPSTEP_SITE_SPEC.md`10番)
2. 1日WEB担当者・月額Web担当サポート・対応できること・プロフィール・お問い合わせの確定本文実装
3. 読みもの一覧・記事詳細ページの本格実装
4. GTM・formrunの実設置
5. JSON-LD(Person/Organization等)の新規実装
6. sitemap自動生成・robots.txtの環境別運用方針決定
7. `/labo/`の301リダイレクト実装
8. ステージング環境での確認、公開方法確定後の本番切り替え
