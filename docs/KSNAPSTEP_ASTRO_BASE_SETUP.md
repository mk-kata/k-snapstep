# K-SNAPSTEP Astro基盤 構築報告書

`docs/IMPLEMENTATION_DECISIONS.md`・`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`・`docs/KSNAPSTEP_SITE_SPEC.md`・`docs/KSNAPSTEP_WIREFRAME.md`・`docs/KSNAPSTEP_DESIGN_GUIDE.md`・`docs/DUAL_SITE_TECH_PLAN.md`・`docs/MARORIRI_WORK_LOG.md`・`docs/KSNAPSTEP_PRE_IMPLEMENTATION_RECORD.md`の内容と矛盾しないよう作成しています。

今回、正式実装元(`/Users/macbook/Desktop/kーsnapstep/ksnapstep/`)を保護したうえで、既存リポジトリ内に新しいAstro作業環境(`site/`)を作成しました。**本番公開・既存ルートファイルの変更・コミット・pushは行っていません。**

---

## 1. 作業日時

2026年7月23日

---

## 2. 作業ブランチ

`feature/ksnapstep-astro-rebuild`

作業開始前に同名ブランチの存在有無を確認し(存在しないことを確認済み)、`main`(`origin/main`と同期済み・作業ツリークリーン)から新規作成した。commit・push・merge・rebase・tag作成・`main`ブランチへの変更は行っていない。

---

## 3. バックアップ先

`/Users/macbook/Desktop/kーsnapstep/backups/ksnapstep-before-astro-20260723-181105/`

- 正式実装元の`.git`を除く全ファイル(273件)をリポジトリ外へ`rsync`でコピー
- コピー後、元(273件)とバックアップ(273件)のファイル数が一致することを確認
- 主要ファイル(`index.html`・`privacy.html`・`labo/index.html`・`sitemap.xml`・`css/common.css`・`js/script.js`・`images/profile.jpg`)の存在をすべて確認
- `.DS_Store`等のOS一時ファイル・`node_modules`は含まれていないことを確認済み(バックアップ全体サイズ約255MB。正式実装元に含まれる無関係な検証用フォルダー`test0627/`・`test_lp2507/`も、Git管理対象のためそのままバックアップに含めている)

---

## 4. 作業前Git状態

| 項目 | 内容 |
|---|---|
| 絶対パス | `/Users/macbook/Desktop/kーsnapstep/ksnapstep/` |
| 作業前ブランチ | `main` |
| 最新コミット | `6991d30fc485801338ea017e694310d4522ad165`(2026-05-24 15:32:27 +0900、「feat: PHASE1-3 OGP/JSON-LD/testimonials/相互リンク/sitemap対応」) |
| Gitリモート | `origin` → `https://github.com/mk-kata/k-snapstep.git` |
| 未コミット変更 | なし(作業開始前・開始後とも`git status`クリーンを確認) |
| `origin/main`との差 | ローカル参照上は差分なし(**pull・fetchは行っていない**ため、リモート側の最新状態そのものは未確認) |

詳細は`docs/KSNAPSTEP_PRE_IMPLEMENTATION_RECORD.md`を参照。

---

## 5. 作成したAstroのバージョン

Astro `7.1.3`(`create-astro@5.2.2`経由でインストール。`--template minimal --typescript strict --install --no-git --no-ai --skip-houston --yes`で作成)

型チェック用に`@astrojs/check`・`typescript`を`devDependencies`として追加インストールした(`astro check`の実行に必要なため)。

---

## 6. Node.js・npmのバージョン

- Node.js: `v26.0.0`
- npm: `11.12.1`

いずれも今回アップデートしていない(既存環境のバージョンをそのまま使用)。

---

## 7. 作成したファイル・ディレクトリ

```text
ksnapstep/
├── (既存ルートファイル。無変更)
└── site/                          ← 今回新規作成
    ├── .gitignore                 (Astro既定。dist/・.astro/・node_modules/・.env系・.DS_Store等)
    ├── .vscode/
    ├── README.md                  (新K-SNAPSTEP Astroサイトの説明に書き換え)
    ├── astro.config.mjs           (output: 'static'・site・build.format: 'preserve'を追記)
    ├── package.json / package-lock.json
    ├── tsconfig.json              (astro/tsconfigs/strict を継承。既定のまま)
    ├── public/
    │   ├── favicon.ico / favicon.svg  (Astro既定のプレースホルダー)
    │   ├── icons/.gitkeep
    │   └── images/.gitkeep
    └── src/
        ├── content.config.ts       (Content Collections定義)
        ├── content/articles/sample-article.md  (サンプル記事、draft: true)
        ├── layouts/BaseLayout.astro
        ├── components/Button.astro
        ├── styles/tokens.css
        └── pages/
            ├── index.astro         (仮トップページ)
            ├── 404.astro           (仮404ページ)
            └── privacy.html        (仮privacyページ、プレーンHTML)
```

リポジトリルートの既存ファイル(`index.html`・`labo/`・`privacy.html`・`css/`・`js/`・`images/`・`sitemap.xml`・`test0627/`・`test_lp2507/`)は、今回一切変更していない(15番で詳述)。`legacy/`ディレクトリは作成していない(今回の方針どおり)。

Astro初期化コマンドは`site/`ディレクトリを指定して実行したため、`site/`外にファイルは生成されていない。

---

## 8. Content Collectionsの構成

`site/src/content.config.ts`にて、Astroの現在の推奨方法(Content Layer API、`glob`ローダー)に沿って定義した。`src/content/config.ts`(旧方式)ではなく、プロジェクト直下の`src/content.config.ts`を採用している。

```ts
const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(false),
    relatedArticles: z.array(z.string()).default([]),
    serviceLink: z.string().optional(),
    serviceLinkText: z.string().optional(),
  }),
});
```

- 初期必須項目(`title`・`description`・`publishedDate`・`updatedDate`・`draft`・`relatedArticles`・`serviceLink`・`serviceLinkText`)のみを定義。`thumbnail`・`category`・`tag`・読了時間・複雑な著者情報は今回定義していない
- サンプル記事`sample-article.md`を1件作成(`draft: true`、本文冒頭に「これはサンプル記事です」「本番記事ではありません」と明記)
- トップページ仮ページ(`index.astro`)から`getCollection("articles")`でサンプル記事を実際に読み込み、件数・タイトル・draft値を表示することで、Content Collectionsが正しく機能することを確認した
- 一覧ページ・記事詳細ページの本格実装は行っていない

---

## 9. CSS基盤

`site/src/styles/tokens.css`に、`docs/KSNAPSTEP_DESIGN_GUIDE.md`を参照した暫定CSS変数のみを定義した。

- 配色: 候補2(白・グレーベース、同13番)を暫定採用。背景`#ffffff`、本文色`#2b2a28`、見出し色`#1f1e1c`、補助文字色`#726f6a`、境界線`#e4e1dc`、アクセント(CTA)`#8f2c22`
- フォント: 案B(ゴシック体中心、同14番)を暫定採用
- コンテナ幅・本文幅・基本余白(大・中・小の3段階)・基本文字サイズ・行間を変数化
- 主CTA(`.btn-primary`)・副CTA(`.btn-ghost`)を用意し、`src/components/Button.astro`で構造として確認
- キーボードフォーカス: アクセント赤とは別系統の青系(`--color-focus`)を使用し、色だけに依存しない設計にした(同25番のアクセシビリティ方針)
- ファイル冒頭のコメントで「配色・フォント・数値はすべて暫定値であり最終確定ではない」ことを明記した
- 既存CSS(`css/common.css`等)からのコピー・大量移植は行っていない。ゼロから最小限のトークンのみ新規作成した

---

## 10. SEO基盤

`site/src/layouts/BaseLayout.astro`に、次の「型」のみを用意した(値は仮設定)。

- サイト共通タイトル(`{title} ｜ K-SNAPSTEP`形式)・meta description
- canonical(仮のサイトURL`https://k-snapstep.com`から`Astro.url.pathname`で生成)
- OGP(`og:type`・`og:site_name`・`og:title`・`og:description`・`og:url`の最小限)
- Twitter Card(`summary_large_image`・title・description)
- `<html lang="ja">`
- faviconの配置先(`public/favicon.ico`・`public/favicon.svg`。Astro既定のプレースホルダーのまま、正式ロゴ確定後に差し替え予定)
- JSON-LDは、後から追加できるようコメントで場所だけ示し、**今回は内容を実装していない**。既存ルートの「本来面目らぼ」名義JSON-LD(`LocalBusiness`型)は移植していない
- **GTM(`GTM-TXFRNQ3`)は、今回はまだAstro側へ設置していない**
- **formrunも、今回はまだ設置していない**

---

## 11. privacy.htmlの対応方法

`site/src/pages/privacy.html`を、Astroコンポーネント構文を使わないプレーンな`.html`ファイルとして配置した。

当初、Astro既定のビルド形式(`build.format`未指定=`'directory'`)でビルドしたところ、`.html`ファイルであっても`dist/privacy/index.html`としてディレクトリ化されてしまうことを確認した(想定と異なる挙動だったため、`astro.config.mjs`に`build: { format: 'preserve' }`を追記して再ビルドし、`dist/privacy.html`という意図どおりのフラットな形式で出力されることを確認済み)。この設定により、他の`.astro`ページ(トップ・404等)は通常どおりディレクトリ形式(`/foo/`)を維持しつつ、`.html`で明示したページだけURLをそのまま保てる。

実際の条文(既存`privacy.html`の内容)は移植していない。既存ルートの`privacy.html`(正式実装元)も変更していない。

---

## 12. 404の対応方法

`site/src/pages/404.astro`を作成。Astroの標準的な404ページの仕組みに沿っており、`build.format`の設定に関わらず`dist/404.html`としてフラットに出力されることを確認した(directory形式でも404はフラット出力される仕様)。最小限の見出し・本文・トップへのリンクのみで構成し、本文の本実装(`docs/KSNAPSTEP_WIREFRAME.md`19番)は行っていない。

---

## 13. sitemap・robotsの扱い

- 既存ルートの`sitemap.xml`は今回変更していない
- Astro側のsitemap自動生成(`@astrojs/sitemap`等)は、**今回はまだ追加していない**。`site/README.md`に、次工程で既存`sitemap.xml`との重複を避ける運用方法を決めたうえで追加する旨を記録した
- `robots.txt`は、ステージングと本番で扱いが異なるため、今回の仮ページの段階では作成・確定していない。この方針も`site/README.md`に記録済み

---

## 14. ビルド結果

| 確認項目 | 結果 |
|---|---|
| 依存関係のインストール | `npm install`(Astro作成時)+`npm install --save-dev @astrojs/check typescript`(型チェック用)、いずれも成功 |
| `npx astro check` | **0 errors / 0 warnings / 11 hints**。hintは`astro:content`が再エクスポートする`z`が非推奨である旨の情報のみで、エラーではない |
| `npm run build` | 成功。「3 page(s) built」 |
| 生成ファイル一覧 | `dist/404.html`・`dist/privacy.html`・`dist/index.html`・`dist/favicon.ico`・`dist/favicon.svg`・`dist/icons/.gitkeep`・`dist/images/.gitkeep` |
| トップページ出力確認 | `dist/index.html`に「K-SNAPSTEP」「小さな会社の外部Web担当者」「Astro構築確認用の仮ページ」の文言、およびサンプル記事1件(`draft: true`)の読み込み結果が正しく出力されていることを`grep`で確認 |
| 404出力確認 | `dist/404.html`のtitleに「ページが見つかりません（仮） ｜ K-SNAPSTEP」を確認 |
| privacy.html出力確認 | `dist/privacy.html`(ディレクトリ化されず)のtitleに「プライバシーポリシー（仮）｜ K-SNAPSTEP」を確認 |
| サンプル記事の読み込み確認 | トップページで`getCollection("articles")`により1件読み込み、タイトル・draft値を表示できることを確認 |
| 開発サーバー | 起動していない(`npm run dev`は実行せず、`build`+`check`のみで確認したため、起動したままのプロセスは存在しない。`ps aux`で確認済み) |

---

## 15. 既存ルートファイルが変更されていないこと

Astro作成前に、既存ルートファイル(273件、`.git`・`site/`を除く)全件の`sha256`ハッシュを記録し、Astro環境作成・ビルド後に同じ範囲を再度ハッシュ化して`diff`で比較した。**差分は0件で、既存ルートファイルは完全に無変更であることを確認した。**

対象には`index.html`・`labo/index.html`・`privacy.html`・既存CSS(`css/common.css`等)・既存JavaScript(`js/script.js`・`js/labo.js`)・既存画像(`images/`配下22件)・`sitemap.xml`・GTM設置箇所・formrun関連ファイルをすべて含む。

---

## 16. Git差分

```text
On branch feature/ksnapstep-astro-rebuild
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	site/

nothing added to commit but untracked files present (use "git add" to track)
```

`git diff --stat`(既存ファイル対象)は差分なし。`git add --dry-run site/`で内容を事前確認したところ、Git追跡対象候補は20ファイルで、`node_modules`・`dist/`・`.astro/`はすべて`site/.gitignore`により正しく除外されることを確認した(実際の`git add`・commitは行っていない)。

リポジトリルートに`.gitignore`は存在しないが、ルート直下に無視すべきファイル(`.DS_Store`等)が現に存在しないため、`site/.gitignore`との重複・矛盾は生じていない。

---

## 17. 今回行わなかったこと

- 既存ルートファイルの移動・`legacy/`の作成
- 既存HTML・CSS・JSの変更
- 固定ページの確定本文の全面実装
- GTM設置
- formrun設置
- JSON-LD本実装
- リダイレクト設定(`/labo/`の301転送含む)
- ステージング環境構築
- 本番公開
- commit・push・mainブランチへの変更
- MARORIRIへの変更
- リモートからのpull・fetch

---

## 18. 次に行う作業

1. `docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`28番のユーザー確認事項への回答取得(特にホスティング・公開方法の確認)
2. 共通ヘッダー・フッターコンポーネントの実装
3. 固定ページ(トップ・1日WEB担当者・月額Web担当サポート・対応できること・プロフィール・お問い合わせ)の確定本文実装
4. GTM・formrunの実設置
5. JSON-LD(Person/Organization等)の新規実装
6. 読みもの一覧・記事詳細ページの本格実装
7. sitemap自動生成の追加、`robots.txt`の環境別運用方針決定
8. `/labo/`の301リダイレクト実装
9. ステージング環境での確認、公開方法確定後の本番切り替え

---

## 19. 未確定事項

- 本番公開方法(ホスティング・デプロイ経路)。`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`5-3番のとおり、ロリポップ！レンタルサーバーの可能性が高いという状況証拠はあるが未確定
- Astroを既存リポジトリ内(`site/`)に置き続けるか、将来的に別リポジトリへ切り出すか
- K-SNAPSTEPの正式ロゴ・配色・フォント(今回のCSS基盤はすべて暫定値)
- GTM・formrunの実設置タイミング・設定内容
- sitemap自動生成の方式、`robots.txt`のステージング/本番切り替え方法
- `/labo/`・`/privacy.html`のリダイレクト実装方法・実施タイミング
- `docs/KSNAPSTEP_PRE_IMPLEMENTATION_RECORD.md`13番で判明した「`labo/index.html`にGTMが設置されていない」という事実(既存資料の記載と異なる)の扱い・原因確認
