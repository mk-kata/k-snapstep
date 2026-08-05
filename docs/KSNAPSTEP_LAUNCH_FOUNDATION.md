# K-SNAPSTEP フォーム・計測・SEO・公開準備 実装報告書

`docs/KSNAPSTEP_PAGES_IMPLEMENTATION.md`・`docs/KSNAPSTEP_SITE_SPEC.md`・`docs/KSNAPSTEP_WIREFRAME.md`・
`docs/KSNAPSTEP_DESIGN_GUIDE.md`・`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`・`docs/IMPLEMENTATION_DECISIONS.md`・
`docs/KSNAPSTEP_ASTRO_BASE_SETUP.md`・`docs/KSNAPSTEP_SHARED_LAYOUT_SETUP.md`の内容と矛盾しないよう作成しています。

今回は、K-SNAPSTEPのフォーム・計測・SEO・公開準備をまとめて実装しました。**ページ本文の大幅な書き換え・
デザインの全面変更・本番公開・push・mainへの変更は行っていません。**

---

## 1. 作業日時

2026年7月27日

---

## 2. 作業ブランチ

`feature/ksnapstep-astro-rebuild`(継続使用。mainへの変更・pushなし)

---

## 3. 作業前の状態

| 確認項目 | 結果 |
|---|---|
| 絶対パス | `/Users/macbook/Desktop/kーsnapstep/ksnapstep/site/` |
| 現在のブランチ | `feature/ksnapstep-astro-rebuild` |
| コミット`47f39bf` | 存在確認済み |
| コミット`6b15374` | 存在確認済み |
| `git status` | クリーン |
| `site/`以外の変更 | なし |
| 既存ルートファイル | 無変更 |
| `npm run check`(作業前) | 0 errors / 0 warnings / 14 hints |
| `npm run build`(作業前) | 成功、11ページ出力 |

意図しない変更はなく、そのまま作業を継続した。

---

## 4. トップページ2カードの確認

`site/src/components/home/ServiceComparison.astro`(セクション4)を確認した。現在すでに次の状態になっており、**変更は不要と判断した**。

- 1日WEB担当者・月額Web担当サポートの2カード形式(同格の`<article class="service-comparison__card">`を2枚並べる構造)
- 「上位・下位の関係ではありません」という一文を明示
- 見出しレベル(`h3`)・スタイルとも2枚で共通、どちらかを大きく強調するCSSは使用していない

---

## 5. プロフィールMARORIRI文言の確認

`site/src/pages/profile/index.astro`セクション8を確認した。

現在の本文: 「K-SNAPSTEPで実践しているWebの仕事の考え方を、MARORIRIで次のWeb実務者へ伝えています。コーダーとして現場で考えるための場です。」

今回指定された趣旨(「K-SNAPSTEPで実践している仕事の考え方を、次のWeb実務者へ渡す活動」)と意味内容が一致しており、かつ`docs/KSNAPSTEP_SITE_SPEC.md`20番の確定文言ともほぼ同一だったため、**変更は不要と判断した**。

MARORIRIをK-SNAPSTEPの主要サービスとして見せていないことも確認した(背景色を変えた控えめなブロック内に配置、通常ナビ・トップページ・他のサービスページには設置せず、外部リンクである旨を矢印記号+視覚的テキストで明示)。

---

## 6. 既存formrunの調査結果

既存静的サイト(`/Users/macbook/Desktop/kーsnapstep/ksnapstep/`)を読み取り専用で確認した。

| 項目 | 結果 |
|---|---|
| 埋め込み方式 | `<div class="formrun-embed" data-formrun-form="...">`+外部スクリプト`https://sdk.form.run/js/v2/embed.js`(iframeは使用していない) |
| 設置ページ | `labo/index.html`のみ(`index.html`・`privacy.html`には設置されていない) |
| フォーム識別情報 | `data-formrun-form`属性の値(既存コード上でそのまま確認できる公開情報。本報告書には再掲を最小限にとどめる) |
| `data-formrun-redirect` | `"true"` |
| JavaScript読込 | `<script src="https://sdk.form.run/js/v2/embed.js"></script>`を`</body>`直前に1回のみ |
| 完了画面 | ローカルコードからは確認できない。`data-formrun-redirect="true"`により送信後に別画面へ遷移する設定だが、遷移先(formrun標準の完了画面か、formrun管理画面で設定した独自URLか)はローカルファイルからは分からない |
| 自動返信 | ローカルコードに記述なし。formrun管理画面側の設定のため確認できない |
| プライバシーポリシーへの導線 | `labo/index.html`本文中に、フォーム自体からの明示的なリンクは確認できなかった(ページ下部の共通フッターに`/privacy.html`へのリンクはある) |
| GTMによる送信計測 | `labo/index.html`にGTM自体が設置されていないため、送信計測の有無を確認する前提が成立しない(7番参照) |
| フォームの現在の項目 | ローカルコードには記述がなく確認できない(embedスクリプトが実行時にformrunのサーバーから取得して描画するため) |
| 必須・任意 | 同上、確認できない |
| ファイル添付の有無 | 同上、確認できない |

### 現在の項目と新仕様の比較

現在のformrun側の実際の項目がローカルから確認できないため、`docs/KSNAPSTEP_SITE_SPEC.md`15番の確定8択(1日WEB担当者について／月額Web担当サポートについて／Webサイト・CMSについて／制作会社とのやり取りについて／サーバー・ドメイン・メールについて／必要な実作業について／どれを選べばよいか分からない／その他)と一致しているかどうかは、**今回の調査だけでは判断できなかった**。formrun管理画面での確認が必要(7番)。

---

## 7. お問い合わせページへの設置

対象: `site/src/pages/contact/index.astro`

- 既存の`data-formrun-form`の値・`data-formrun-redirect="true"`・埋め込みスクリプトURLを、`site/src/config/site.ts`の`formrun`定数へ集約し、そのまま使用した(変更していない)
- 新しいフォームは作成していない
- 埋め込みスクリプトはこのページでのみ1回だけ読み込む(共通レイアウトには含めていないため、他ページでの重複読込は発生しない)
- `PUBLIC_ENABLE_FORM=false`の場合のみ実際の埋め込みを行わず、「現在、このフォームは表示していません。時間をおいて再度お試しください。」という代替文言を表示する(既定は有効)
- スクリプト読み込み失敗時: `<script>`の`onerror`属性で、あらかじめ用意した案内文(`#formrun-load-error`)を表示する仕組みを実装した
- JavaScript無効時: `<noscript>`で「JavaScriptが無効になっているため、フォームを表示できません」という案内を表示する
- プライバシーポリシーへのリンクをフォーム直前に設置した(「送信いただく内容は、プライバシーポリシーに基づき取り扱います。」)
- 一般利用者向けの「未完成」「構築中」等の表示はしていない
- スマートフォンでの横スクロールは発生しない(埋め込みdivの幅は`--content-width`を上限とした可変幅)
- 共通レイアウト・ナビは変更していない
- フォーム送信テストは、実際の問い合わせとして通知される可能性があるため、指示どおり今回は行っていない

### 本文とフォーム項目の整合性について

6番のとおり、formrun側の実際の現在の項目はローカルから確認できない。このページの本文(「フォームに入力していただく内容」セクション、お問い合わせの種類8択の説明等)は`KSNAPSTEP_SITE_SPEC.md`の確定仕様に基づいて記述しているが、**formrun管理画面側の実際の設定と完全に一致しているかは未確認**であり、矛盾がある場合は8番の管理画面変更が必要になる。

---

## 8. formrun管理画面で必要な変更

ローカルのコード実装だけでは解決できないため、次をユーザー側でformrun管理画面から確認・実施する必要がある。

- 「お問い合わせの種類」の選択肢が、`KSNAPSTEP_SITE_SPEC.md`15番の確定8択になっているかの確認、なっていない場合の更新
- 自動返信メールの文面が、K-SNAPSTEP名義かつ現行サービス内容(1日WEB担当者・月額Web担当サポート)に即しているかの確認
- 通知先メールアドレスの確認
- 送信完了画面(リダイレクト先)の内容確認
- ファイル添付機能の要否の確認
- スパム対策(reCAPTCHA等)の設定状況確認

---

## 9. GTM

既存コンテナ`GTM-TXFRNQ3`を、共通レイアウト経由でAstro側に実装した。

- `site/src/components/global/GtmHead.astro`(head内script)・`GtmBody.astro`(body直後のnoscript)を新規作成し、`BaseLayout.astro`から1回だけ読み込む構成にした(全ページで二重設置なし)
- スニペットの構造は既存`index.html`のものをそのまま踏襲した
- 既存静的サイトの調査で、GTMが`index.html`・`privacy.html`には設置されているが、`labo/index.html`には設置されていない不整合を確認した(6番)。Astro版は共通レイアウト経由のため、この不整合は解消される設計になっている
- **既定では無効**。`PUBLIC_ENABLE_GTM=true`を明示した場合のみ出力する(`site/src/config/site.ts`の`gtm.enabled`)
- コンテナIDは`PUBLIC_GTM_ID`で上書き可能(未設定時は既存の`GTM-TXFRNQ3`)
- ビルド確認: `PUBLIC_ENABLE_GTM`未設定時は出力0件、`PUBLIC_ENABLE_GTM=true`かつ`PUBLIC_SITE_ENV=production`でビルドすると出力されることを確認した

---

## 10. GA4・送信計測

既存静的サイトに`gtag`や`G-`形式のGA4測定IDの直接記述は見つからなかった(GTMコンテナ内で設定されている可能性があるが、ローカルファイルからは確認できない)。formrun送信完了イベント・完了ページ・dataLayerでのクリック計測も、いずれもGTM管理画面側の設定であり、ローカルからは確認できない。

今回はGTMコンテナ内部の設定変更は行っていない。Astro側では、次の「安定した属性」の土台のみ用意した。

| 用途 | 属性 | 設置箇所 |
|---|---|---|
| ヘッダーの独立CTA | `data-cta="nav-contact"` | 全ページ共通ヘッダー |
| トップページ ファーストビュー | `data-cta="home-hero-primary"` / `"home-hero-secondary"` | トップページ |
| トップページ サービス比較 | `data-cta="home-compare-oneday"` / `"home-compare-monthly"` | トップページ |
| 各ページ末尾CTA(`CtaBlock`) | `data-cta="{ページ名}-contact-cta"` | トップ・1日WEB担当者・月額サポート・対応できること・プロフィール |
| ページヘッダーCTA(`PageHeader`) | `data-cta="{任意のID}"`(propとして受け取る) | 1日WEB担当者(ファーストビュー・料金セクション)・お問い合わせ(フォームへのジャンプ) |
| formrun設置領域 | `data-form-area="formrun"`(コンテナ)・`data-cta="formrun-embed"`(埋め込みdiv) | お問い合わせページ |

GA4のイベント名は今回新しく決めていない(指示どおり)。完了URLはformrun管理画面側の設定であり、ローカルからは確認できなかったため記録していない。

---

## 11. SEO共通設定

`site/src/layouts/BaseLayout.astro`・`site/src/config/site.ts`を確認・整備した。

- title・meta description・canonical・OGP(title/description/url/type/site_name)・Twitter Card・`lang="ja"`・favicon参照は、共通レイアウト側の「型」として実装済み(前回セッションから継続)
- 各ページはtitle・description等をprops経由で個別指定しており、共通設定(サイト名・運営者名・本番URL)とページ固有設定が重複しない構成になっている
- noindexは、ページ固有の`noindex` propと、環境(`shouldIndex`)による強制noindexのORで決定する(16番参照)
- 本番URル・サイト名・運営者名は`site/src/config/site.ts`の`site`定数に一元化されている
- 旧「本来面目らぼ」・占いに関するSEO情報(旧OGP画像・旧meta description等)は移植していない

---

## 12. JSON-LD

新しい事業内容に合わせて実装した。旧静的サイトのJSON-LD(「本来面目らぼ」名義の`LocalBusiness`、`labo/index.html`の`Service`+旧料金の`offers`)はいずれも移植していない。

### サイト共通(`OrganizationJsonLd.astro`)

`ProfessionalService`+`WebSite`を`@graph`で1つの`<script>`にまとめ、全ページで1回だけ出力する。K-SNAPSTEPは法人組織ではなく屋号であるため、`Organization`ではなく`ProfessionalService`(LocalBusinessのサブタイプ)を採用した。含めた項目: name(K-SNAPSTEP)・alternateName(小さな会社の外部Web担当者)・url・founder(片山まゆみ、Person)・areaServed(JP)・serviceType(1日WEB担当者/月額Web担当サポート)・description。電話番号・住所・価格帯は含めていない。

### パンくず(`BreadcrumbJsonLd.astro`)

固定下層ページ(1日WEB担当者・月額Web担当サポート・対応できること・プロフィール・お問い合わせ・プライバシーポリシー)・読みもの一覧・シリーズ一覧・記事詳細に設置した。画面上の`<Breadcrumbs>`と同じitems配列を渡しているため、表示内容と構造化データが一致している。

### サービス(`ServiceJsonLd.astro`)

1日WEB担当者(55,000円/1回あたり)・月額Web担当サポート(55,000円/1か月あたり)に設置した。料金は`KSNAPSTEP_SITE_SPEC.md`7番の確定料金のみを使用している。

### 記事詳細(`ArticleJsonLd.astro`)

`BlogPosting`として、headline・description・datePublished・dateModified(あれば)・mainEntityOfPage・author(Person)・publisher(Organization)・articleSectionを、実際の記事データ(Content Collectionsのfrontmatter)とそのまま一致させて出力する。

**サンプル記事の扱い**: Content Collectionsに`sample: boolean`フィールドを追加し、表示確認用のサンプル記事(`sample-website-checkup.md`)には`sample: true`を設定した。記事詳細ページは`sample: true`の場合、Article JSON-LDの出力をスキップし、あわせて`noindex`にする(ビルド出力で、Organization+Breadcrumbの2件のみが出力され、Article JSON-LDが含まれないことを確認済み)。

各ページのJSON-LDは別々の`<script>`タグとして出力しており、同一ページ内で同じ実体について矛盾する記述をしていないことを確認した。

---

## 13. OGP画像

正式OGP画像は今回も作成していない。既存静的サイトが参照している`images/ogp.jpg`・`images/ogp-labo.jpg`は、実際には`images/`フォルダー内に存在しないファイルであることを確認した(存在するのは`images/profile.jpg`のみ)。

このため、**OGP画像設定を省略する**方針を採用した。`BaseLayout`の`ogImage` propはこれまでどおり任意のままとし、今回もどのページからも渡していない。存在しないURLをog:image等として出力することはない。

トップページデザイン確認後に、K-SNAPSTEP専用のOGP画像を作成する予定であることを`site/README.md`・本報告書の両方に記録した。

---

## 14. sitemap

`site/src/pages/sitemap.xml.ts`を新規実装した。

- 当初、公式連携`@astrojs/sitemap`を導入して試したが、このプロジェクトの`build.format: "preserve"`(ディレクトリ形式のページと、拡張子付きの`/privacy.html`が混在するルーティング)を正しく認識できず、`/contact`(末尾スラッシュ欠落)・`/privacy`(拡張子欠落)という誤ったURLを出力することが分かったため、**採用しなかった**(パッケージは削除済み)
- 代わりに、実際に出力される静的ページ一覧と完全に一致するURLを直接列挙する方式にした
- 含まれるもの: トップ・1日WEB担当者・月額Web担当サポート・対応できること・プロフィール・お問い合わせ・読みもの一覧・シリーズ一覧・`/privacy.html`・公開中の記事(`draft: false`のもの)
- 含まれないもの: 404・draft記事(`getCollection`のフィルタで除外)・重複URL
- 本番URLは`site.url`(`PUBLIC_SITE_URL`環境変数、既定`https://k-snapstep.com/`)を使用
- リポジトリルートの既存`sitemap.xml`は変更していない(別ファイルであり重複しない)
- ビルド出力で、9固定URL+読みもの2URL+公開記事1件=10件のURLが、意図どおりの形式(末尾スラッシュあり、`/privacy.html`は拡張子付き)で出力されることを確認した

---

## 15. robots

`site/src/pages/robots.txt.ts`を新規実装した。

- `PUBLIC_SITE_ENV=production`のときのみ`User-agent: * / Allow: / / Sitemap: https://k-snapstep.com/sitemap.xml`を出力
- それ以外(staging・development、未設定時含む)は`User-agent: * / Disallow: /`のみを出力し、sitemapを案内しない
- ビルド確認: 環境変数未設定時は`Disallow: /`、`PUBLIC_SITE_ENV=production`時は`Allow: /`+sitemap案内が出力されることを確認した
- 現在の本番サイトにはrobots.txtが存在しないことが分かっているが、既存ルートへは追加していない(Astro側の`dist/robots.txt`としてのみ生成される)

---

## 16. 404 noindex

`site/src/pages/404.astro`を確認・調整した。

- `noindex={true}`は前回セッションから設定済み
- `canonical="/404.html"`を明示指定し、`Astro.url.pathname`由来の不自然な値(`/404/`)にならないようにした(前回セッションで一度修正済みの箇所を再確認)
- OGPは共通レイアウトの最小限のもの(title・description・url等)のみで、画像等の追加出力はない
- sitemapには含めていない(`sitemap.xml.ts`の列挙対象に404を含めていない)

---

## 17. 読みものSEO

読みもの一覧・シリーズ一覧・記事詳細を確認した。

| 項目 | 状態 |
|---|---|
| title | 3ページとも異なる値(「読みもの」「小さな会社のホームページ見直しノート」「記事タイトル」) |
| description | 読みもの一覧と、シリーズ一覧とで異なる文言であることを確認した(重複なし、13番参照) |
| canonical | 各ページ固有のパスで出力 |
| OGP | 共通レイアウト経由で他ページと同様に出力 |
| 公開日・更新日 | 記事詳細に表示(更新日は設定がある場合のみ) |
| draft除外 | 一覧2ページ・静的パス生成の両方で除外を確認済み(前回セッションから継続) |
| Article JSON-LD | 記事詳細に設置(sample記事は対象外、12番) |
| パンくず | 3ページとも表示・構造化データとも設置 |
| 関連記事 | `relatedArticles`が空の場合は非表示(コンポーネント側で判定) |
| 重複ページ | 確認できず(記事1件のみのため重複の実例はないが、slug重複時にAstroのビルドが失敗する設計になっている) |
| 存在しないslugの404 | `getStaticPaths`で存在する記事のみパスを生成するため、存在しないslugへのアクセスはAstroの標準404処理になることを確認した(ビルドは静的サイトのため、実際の404応答はホスティング側の設定に依存する) |

---

## 18. 内部リンク

全ページのビルド後HTMLから`href="/..."`形式のリンクを抽出し、実際の出力ファイルと突き合わせて確認した。

- 存在しないURL: 0件
- 末尾スラッシュの不統一: 確認されず(全ページ末尾スラッシュあり、`/privacy.html`のみ意図的に拡張子付きで統一)
- `/privacy/`と`/privacy.html`の混在: 混在なし(`/privacy.html`のみを使用)
- 旧noteリンク・占いリンク・旧本来面目リンク: 0件
- MARORIRIを内部リンクとして扱っている箇所: 0件(`https://maroriri.com/`として`target="_blank" rel="noopener"`付きの外部リンクでのみ使用されていることを確認)
- 仮URL: 0件
- `href="#"`のみのリンク: 0件

---

## 19. リダイレクト準備

本番のリダイレクトは今回有効化していない。`site/deploy/apache/.htaccess.example`を新規作成し、次を記録した。

- `/labo/`・`/labo/index.html`を新トップページ(`/`)へ301転送する案
- `/privacy.html`は転送しない(新サイトでも同じURLを維持)
- 存在しないURLの一括トップ転送は行わない設定
- Astroの静的ファイル配信を妨げない設定

このファイルは`site/public/`配下には配置しておらず、ビルド出力(`dist/`)にも含まれない。ホスティング環境(Apache・ロリポップである可能性が高いという手掛かりが`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`にあるが、契約情報は未確認)を確認したうえで、公開作業時に手動で適用する運用を想定している。

---

## 20. ステージング構成

実際のステージング公開は行っていない。次を準備した。

- `PUBLIC_SITE_ENV`が`production`以外の場合、ページ個別のnoindex指定に関わらず常にnoindexになる(`BaseLayout.astro`の`effectiveNoindex`)
- 同条件で`robots.txt`が全体クロール拒否になる
- GTMは`PUBLIC_ENABLE_GTM=true`を明示しない限り出力されない(既定オフ)
- formrunは`PUBLIC_ENABLE_FORM=false`で実際の埋め込みを止められる(既定オン)
- `PUBLIC_SITE_URL`でcanonical・OGP・sitemap・robotsの基準URLを切り替えられるため、ステージング用ドメインを設定すれば、本番URLのcanonicalを出さずに済む
- 環境変数一覧は22番・`.env.example`参照

---

## 21. 公開前チェックリスト

`site/docs/PRE_LAUNCH_CHECKLIST.md`を新規作成した。表示(デスクトップ・スマートフォン・タブレット・3ブラウザ・長い見出し・ナビ・フッター・FAQ・記事本文)・リンク・フォーム・SEO・公開の5カテゴリでチェック項目を用意した。

---

## 22. 環境変数

`site/.env.example`を新規作成した(実際の秘密情報は含まない)。

| 変数 | 既定値 | 役割 |
|---|---|---|
| `PUBLIC_SITE_URL` | `https://k-snapstep.com` | canonical・OGP・sitemap・robotsの基準URL |
| `PUBLIC_SITE_ENV` | 未設定(development扱い) | `production`以外は常にnoindex・robots全体拒否 |
| `PUBLIC_GTM_ID` | `GTM-TXFRNQ3` | GTMコンテナID |
| `PUBLIC_ENABLE_GTM` | 無効(`true`のときのみ有効) | GTM出力の切り替え |
| `PUBLIC_ENABLE_FORM` | 有効(`false`のときのみ無効) | formrun埋め込みの切り替え |

5個にとどめ、増やしすぎないようにした。`.env`・`.env.production`は`.gitignore`済みで、今回もコミットしていない。

---

## 23. ビルド・チェック結果

| 確認項目 | 結果 |
|---|---|
| `npm run check`(最終) | 0 errors / 0 warnings / 15 hints(既知の`z`非推奨hintのみ) |
| `npm run build`(既定/development) | 成功。11ページ+`robots.txt`+`sitemap.xml`出力 |
| `PUBLIC_SITE_ENV=production PUBLIC_ENABLE_GTM=true`でのビルド | 成功。GTM出力・robots.txtが`Allow`になることを確認 |
| `PUBLIC_ENABLE_FORM=false`でのビルド | 成功。formrun埋め込みが代替文言に切り替わることを確認 |
| sitemap出力 | `dist/sitemap.xml`、10件のURL、末尾スラッシュ・`/privacy.html`とも正しい形式 |
| robots出力 | `dist/robots.txt`、環境に応じて`Allow`/`Disallow`が切り替わることを確認 |
| JSON-LDの構文確認 | 各ページの`<script type="application/ld+json">`をPythonで`json.loads`し、パースエラーがないことを確認 |
| canonical確認 | 全11ページでページ固有の値を確認、404も`/404.html`で正しい |
| noindex確認 | development既定時は全ページでnoindex、production指定時は404以外でnoindexが外れることを確認 |
| GTM有効・無効切り替え確認 | 23番の2ビルドで確認済み |
| formrun埋め込み確認 | 埋め込みdiv・スクリプトタグとも意図どおり1回だけ出力されることを確認(送信テストは実施していない) |
| 内部リンク確認 | 18番参照、0件の破損リンク |
| draft記事除外 | 一覧・静的パス生成の両方で除外を確認 |
| 404確認 | h1・noindex・canonical・補助リンクを確認 |
| `/privacy.html`確認 | 出力URL・条文・canonicalとも確認 |
| 旧要素が0件であること | 26番相当の確認を実施、0件 |
| 既存ルートファイルが無変更であること | 25番参照 |
| `git status` | コミット後クリーン |
| `git diff` | なし(コミット後) |

開発サーバーは起動していない(`ps aux`相当の確認は行っていないが、`npm run dev`は一度も実行していない)。フォーム送信は行っていない。

---

## 24. 出力ファイル

```text
dist/
├── index.html
├── one-day-web-manager/index.html
├── monthly-support/index.html
├── services/index.html
├── profile/index.html
├── contact/index.html
├── reading/index.html
├── reading/website-review/index.html
├── reading/website-review/sample-website-checkup/index.html
├── privacy.html
├── 404.html
├── sitemap.xml
└── robots.txt
```

---

## 25. 既存ルートファイルの状態

`git diff --stat 47f39bf..HEAD -- . ':!site'`が空であることを確認した。リポジトリルートの既存ファイル(`index.html`・`privacy.html`・`css/`・`js/`・`images/`・`sitemap.xml`・`labo/`・`test0627/`・`test_lp2507/`)は今回も一切変更していない。

---

## 26. Git差分

作業前の状態(コミット`6b15374`、working tree clean)から、今回の変更をすべて`site/`配下のみでコミットした。

```text
新規:
site/.env.example
site/deploy/apache/.htaccess.example
site/docs/PRE_LAUNCH_CHECKLIST.md
site/src/components/global/GtmHead.astro
site/src/components/global/GtmBody.astro
site/src/components/seo/OrganizationJsonLd.astro
site/src/components/seo/BreadcrumbJsonLd.astro
site/src/components/seo/ServiceJsonLd.astro
site/src/components/seo/ArticleJsonLd.astro
site/src/pages/sitemap.xml.ts
site/src/pages/robots.txt.ts

更新:
site/README.md
site/astro.config.mjs
site/package.json・package-lock.json(@types/nodeを追加。@astrojs/sitemapは試験導入後に不採用と判断し削除済み)
site/src/config/site.ts(環境変数駆動の設定・GTM・formrun定数を追加)
site/src/content.config.ts(sampleフィールドを追加)
site/src/content/articles/sample-article.md・sample-website-checkup.md(sampleフィールド反映)
site/src/layouts/BaseLayout.astro(GTM・JSON-LD組み込み、noindex判定の更新)
site/src/components/common/CtaBlock.astro・src/components/page/PageHeader.astro(ctaId prop追加)
site/src/components/global/SiteHeader.astro・src/components/home/HeroSection.astro・ServiceComparison.astro(data-cta属性追加)
site/src/pages/contact/index.astro(formrun実装)
site/src/pages/index.astro・monthly-support/index.astro・one-day-web-manager/index.astro・
  profile/index.astro・privacy.astro・services/index.astro・
  reading/index.astro・reading/website-review/index.astro・reading/website-review/[slug]/index.astro
  (BreadcrumbJsonLd・ServiceJsonLd・ArticleJsonLd・ctaIdの組み込み)
```

35ファイル変更(新規11・更新24)。`site/`以外の変更は0件。

---

## 27. コミットID

`7317404`(`feat: add forms, analytics, and launch SEO foundation`)

コミット後、`git status`は`nothing to commit, working tree clean`であることを確認した。push・merge・tag作成・mainブランチへの変更は行っていない。

---

## 28. 今回行わなかったこと

- 本番フォーム送信
- formrun管理画面の変更
- GTM管理画面の変更
- GA4管理画面の変更
- 正式OGP画像作成
- 正式ロゴ作成
- プロフィール写真の使用
- 完成図版作成
- 有効な本番`.htaccess`の配置(サンプルのみ`site/deploy/`に保存)
- ステージング公開
- 本番公開
- push
- mainブランチへの変更
- MARORIRIの変更

---

## 29. ユーザーまたは管理画面で必要な作業

- formrun管理画面: 「お問い合わせの種類」選択肢の確認・更新(8番)、自動返信・通知先・完了画面・ファイル添付・スパム対策の確認
- GTM管理画面: GA4設定の有無、formrun送信計測(dataLayerイベント等)の設定
- GA4管理画面: プロパティ・測定IDの確認(既存サイトに直接記述がないため、GTM経由かどうかの確認が必要)
- 本番公開前に、ホスティング環境(Apacheかどうか含む)・公開ディレクトリ・アップロード方法を確認する
- `/labo/`の301リダイレクトを、ホスティング確認後に`site/deploy/apache/.htaccess.example`を参考に適用する
- Search Consoleへの登録・sitemap送信
- 本番ビルド時に`PUBLIC_SITE_ENV=production`・`PUBLIC_ENABLE_GTM=true`(GTM運用を開始する場合)を設定する

---

## 30. 未確定事項

- formrunの実際の現在の項目設定(お問い合わせの種類の選択肢等)が新仕様と一致しているか
- formrunの完了画面・自動返信の内容
- GA4の設置有無・プロパティ
- 本番のホスティング・デプロイ方法(ロリポップの可能性が高いという手掛かりのみ)
- K-SNAPSTEPの正式ロゴ・配色・フォント
- 正式OGP画像
- `/labo/`リダイレクトの実際の適用時期
- `docs/KSNAPSTEP_PAGES_IMPLEMENTATION.md`33番からの持ち越し(プロフィール セクション8の文言、トップ セクション4の判断)は、今回4・5番で確認し、いずれも変更不要と判断したが、最終確定は関係者確認を推奨する

---

## 31. 次の作業

1. formrun管理画面の確認・必要な変更(8番)
2. GTM・GA4管理画面側の設定確認
3. 画面確認(実機・複数ブラウザ、`site/docs/PRE_LAUNCH_CHECKLIST.md`)
4. デザイン調整(配色・フォント・ロゴの最終確定)
5. 実際の編集記事(「小さな会社のホームページ見直しノート」本編)の執筆・追加
6. 正式OGP画像の作成
7. 公開方法の確認・ステージング環境での実地確認
8. `/labo/`の301リダイレクトの実際の適用
9. Search Console登録・sitemap送信
10. 本番切り替え(`PUBLIC_SITE_ENV=production`等の環境変数設定を含む)
