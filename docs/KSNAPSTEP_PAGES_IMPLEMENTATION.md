# K-SNAPSTEP 固定ページ・読みもの基盤 実装報告書

`docs/KSNAPSTEP_SITE_SPEC.md`・`docs/KSNAPSTEP_WIREFRAME.md`・`docs/KSNAPSTEP_DESIGN_GUIDE.md`・
`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`・`docs/KSNAPSTEP_HOME_IMPLEMENTATION.md`・
`docs/IMPLEMENTATION_DECISIONS.md`・`docs/KSNAPSTEP_SHARED_LAYOUT_SETUP.md`・
`docs/MARORIRI_SITE_SPEC.md`・`docs/MARORIRI_CONTENT_WIREFRAME.md`の内容と矛盾しないよう作成しています。

今回は、K-SNAPSTEPのトップページを確定し、固定下層ページ(1日WEB担当者・月額Web担当サポート・
対応できること・プロフィール・お問い合わせ・プライバシーポリシー・404)と読みもの基盤(一覧・
シリーズ一覧・記事詳細)を一括で実装しました。**本番公開・push・main変更・GTM・formrun本番接続・
リダイレクト設定は行っていません。**

---

## 1. 作業日時

2026年7月27日

---

## 2. 作業ブランチ

`feature/ksnapstep-astro-rebuild`(継続使用。mainへの変更・pushなし)

---

## 3. 作業前の状態

作業開始時に次を確認した。

| 確認項目 | 結果 |
|---|---|
| 絶対パス | `/Users/macbook/Desktop/kーsnapstep/ksnapstep/site/` |
| 現在のブランチ | `feature/ksnapstep-astro-rebuild` |
| 基盤コミット`47f39bf` | 存在確認済み(`chore: add Astro foundation and shared layout`) |
| `git status` | クリーン(working tree clean) |
| トップページ実装分 | **想定と異なり、すでにコミット済みだった**(下記参照) |
| `site/`以外の意図しない変更 | なし |
| 既存ルートファイル(`index.html`・`privacy.html`・`css/`・`js/`・`images/`・`sitemap.xml`等) | 無変更 |
| `npm run check`(作業前) | 0 errors / 0 warnings / 11 hints |
| `npm run build`(作業前) | 成功、9ページ出力 |

**想定との差異**: 依頼文は「トップページ実装分が未コミットであること」を前提としていたが、実際には
前回セッション(2026年7月23日)で本文監査(`docs/KSNAPSTEP_HOME_COPY_AUDIT.md`)を経て、トップページ
実装がすでに`aab88b9`としてローカルコミット済みだった(`docs/KSNAPSTEP_HOME_IMPLEMENTATION.md`27・28番
に経緯を記録)。この差異は「`site/`以外に意図しない変更がある」場合の中止条件には該当せず、
`site/`配下のみ32ファイルという範囲も一致していたため、作業を中止せず、コミット済みの状態を土台として
そのまま作業を継続した。

---

## 4. 使用した正本資料

優先順位順に次を確認した。

1. `docs/KSNAPSTEP_SITE_SPEC.md`
2. `docs/KSNAPSTEP_WIREFRAME.md`
3. `docs/KSNAPSTEP_DESIGN_GUIDE.md`
4. ブランド再構成前の`docs/MARORIRI_SITE_SPEC.md`(15-1〜15-3・15-5〜15-7、確定本文)
5. `docs/MARORIRI_CONTENT_WIREFRAME.md`(読みもの機能の設計)
6. 現在のAstro暫定実装(基盤コミット`47f39bf`・トップページコミット`aab88b9`)
7. 既存静的サイト(`privacy.html`、および`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`の調査結果)

補助的に`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`・`docs/KSNAPSTEP_HOME_IMPLEMENTATION.md`・
`docs/IMPLEMENTATION_DECISIONS.md`・`docs/KSNAPSTEP_SHARED_LAYOUT_SETUP.md`で、既存実装の経緯・
未確定事項を確認した。`docs/MARORIRI_WIREFRAME.md`・`docs/MARORIRI_SUBPAGE_WIREFRAME.md`・
`docs/BRAND_RESTRUCTURE_PLAN.md`は、`KSNAPSTEP_WIREFRAME.md`がすでに該当部分を再構成・引用済みのため、
今回は個別に再読していない。

---

## 5. トップページ

前回セッションで確定9セクション・本文監査(セクション2・5・6・7・8・9)が完了し、`aab88b9`として
コミット済みだった。今回はこの状態を確認したうえで、次の追加確認・修正のみ行った。

- 9セクション構成(ファーストビュー／このような状態になっていませんか／K-SNAPSTEPが行うこと／
  単発と継続、2つの関わり方／このようなテーマを扱います／Webサイトだけでなく、その周辺まで確認します／
  必要に応じて、実作業にも対応します／片山まゆみについて／お問い合わせ)を維持
- h1は1つ(ファーストビューの見出しのみ)
- 仮ページ表記(「本来面目らぼ」「占い」「マロリリコーダー部」等)が含まれていないことを再確認
- MARORIRIの言及は共通フッターの補助リンクのみであることを再確認

**セクション4(単発と継続、2つの関わり方)についての判断**: `docs/MARORIRI_SITE_SPEC.md`379〜404行目に、
現在の料金表由来の箇条書きとは別の、地の文によるプロセス本文が存在することを確認した。ただし
`KSNAPSTEP_SITE_SPEC.md`10番はこのセクションを「既存本文(1日WEB担当者/月額Web担当サポートの2カード)を
そのまま維持」と明記しており、`KSNAPSTEP_WIREFRAME.md`9番セクション4も同じく2カード形式のワイヤーを
示している。優先順位最上位である`KSNAPSTEP_SITE_SPEC.md`の指示(2カード形式)を優先し、現状の
料金・回数・時間を用いた2カード実装を維持し、地の文への差し替えは行わなかった。この判断は
`docs/KSNAPSTEP_HOME_IMPLEMENTATION.md`29番で「将来の課題」として記録されていたものへの回答である。

トップページの暫定文は、これで確定として扱ってよい状態にした。

---

## 6. 1日WEB担当者

対象: `site/src/pages/one-day-web-manager/index.astro`

`docs/MARORIRI_SITE_SPEC.md`15-2(全12セクション)を、`KSNAPSTEP_SITE_SPEC.md`11番の指示どおり
無変更で使用した(本文中に「MARORIRI」という事業全体のブランド名の記述がないため)。

実装した12セクション:

1. ファーストビュー(バッジ列・料金非表示・主/副CTA)
2. 1日WEB担当者とは
3. こんな状況で、ご相談いただけます
4. その日は、次のようなテーマを扱います
5. 具体例3パターン(3列カード、「判断するときの視点」のみ背景色で強調)
6. お問い合わせから実施後までの流れ(6ステップ、`StepList`コンポーネント)
7. お渡しするのは、この二つです
8. 1日で行うこと・基本料金に含まれないこと(含む8項目/含まない5項目を2列で対比)
9. 料金と実施の概要(`PriceTable`、8行)
10. その後も、継続して相談したい方へ(月額サポートへの控えめな1ブロック)
11. よくあるご質問(`FaqAccordion`、ネイティブ`<details>`、6問)
12. お問い合わせ(最終CTA)

ページ内目次は主要7項目に絞った(1日WEB担当者とは／こんな状況で／具体例／流れ／含まれること・
含まれないこと／料金と実施概要／FAQ)。JavaScriptはFAQ・目次とも使用していない(ネイティブ`<details>`・
アンカーリンクのみ)。

**一部調整**: セクション12の元CTA文言「送信する」は、本ページ自体にフォームを持たない構成(お問い合わせは
`/contact/`へ集約)のため、他ページと一貫する「今の状況を相談する」に変更した。

---

## 7. 月額Web担当サポート

対象: `site/src/pages/monthly-support/index.astro`

`docs/MARORIRI_SITE_SPEC.md`15-5(全10セクション)を無変更で使用した。

実装した10セクション: ファーストビュー／このような方へ／月額サポートで行うこと／2回の面談は
案件の状況に合わせて使えます／このようなテーマを扱います／制作会社の提案を、発注する側の視点で
確認します／判断が必要なことは、画面を見ながら確認します／料金と、含まれる内容／一度集中して
整理するか、継続して確認するか／お問い合わせ。

- セクション3(月額サポートで行うこと)は、一直線の工程図(番号付き矢印フロー)にせず、罫線区切りの
  非直線グリッドで実装し、確認を繰り返す性質が伝わるようにした
- セクション7(メッセージと面談の使い分け)は、確定文をそのまま2列に配置し、「メッセージでできること」
  「面談で扱うこと」という見出しラベルのみ新規に付与した(本文の言い換えはしていない)
- セクション9(1日WEB担当者との違い)は、2枚並びのカードで時間の使い方の違いを見せる構成にした
  (○×比較表は使用していない)

ページ内目次は7項目(このような方へ／月額サポートで行うこと／月2回のオンライン面談／扱うテーマ／
メッセージと面談の使い分け／料金と含まれる内容／1日WEB担当者との違い)。

---

## 8. 対応できることページ

対象: `site/src/pages/services/index.astro`

`docs/MARORIRI_SITE_SPEC.md`15-6(全10セクション)を使用した。`KSNAPSTEP_SITE_SPEC.md`13番の指示どおり、
セクション1のみ「MARORIRIが対応すること」→「K-SNAPSTEPが対応すること」に変更し、他セクションは
無変更で使用した。

構成: ファーストビュー(料金バッジなし)／まず行うのは、状況の確認と整理です(5項目)／`CategoryBlock`
6件(Webサイト・CMS／制作会社とのやり取り／サーバー・ドメイン・メール／SEO・アクセス解析・EC／
必要に応じて対応する実作業／対応できる範囲と、専門会社にお任せする範囲)／幅広い範囲を確認できる背景
(プロフィールへの控えめなテキストリンクのみ)／お問い合わせ。

対応領域はカード化せず、罫線区切りの可変高さ「カテゴリブロック」(`CategoryBlock`)で実装した。
ページ内目次は`KSNAPSTEP_WIREFRAME.md`8番の指示どおり設けていない。

**一部調整として記録する判断**: `KSNAPSTEP_WIREFRAME.md`12番は「専門会社へ任せる範囲」を左右2列の役割
分担表示にする案を示しているが、`MARORIRI_SITE_SPEC.md`15-6セクション8の確定本文は、SNS・広告・印刷物の
3段落それぞれの中で「対応できること」と「お任せする範囲」を1文内で対比する構成になっており、段落を
機械的に2列へ分割すると文を分断することになる。確定本文を優先し、3段落の地の文のまま`CategoryBlock`で
表示した(本文の言い換え・分割は行っていない)。

---

## 9. プロフィールページ

対象: `site/src/pages/profile/index.astro`

`docs/MARORIRI_SITE_SPEC.md`15-3(全9セクション)を土台に、`KSNAPSTEP_SITE_SPEC.md`14番の確定調整を反映した。

- セクション2(現在の仕事): マロリリコーダー部の段落を削除し、1日WEB担当者・月額Web担当サポートの
  2段落のみとした(旧事業の内容を取り除く最小限の調整)
- セクション3〜7(経歴／変わってきたこと／間に立つ仕事／判断軸／1日WEB担当者が生まれた理由): 無変更
- セクション3には、`KSNAPSTEP_WIREFRAME.md`13番の指定どおり「銀行勤務 → 印刷会社(営業事務・DTP) →
  Web制作 → 現在(K-SNAPSTEP)」という短い接続ラベルを、本文とは別の添え書きとして併記した
- セクション8: `KSNAPSTEP_SITE_SPEC.md`14番の調整案(見出し「もうひとつの活動、MARORIRIについて。」・
  本文「K-SNAPSTEPで実践しているWebの仕事の考え方を、MARORIRIで次のWeb実務者へ伝えています。
  コーダーとして現場で考えるための場です。」)を採用し、MARORIRIへの外部リンクを1箇所のみ設置した
- セクション9: 確定本文中の「マロリリコーダー部」への言及を除外し、「1日WEB担当者については、
  詳細ページでご案内しています。」へ最小限に調整した。CTAは「今の状況を相談する」「1日WEB担当者に
  ついて見る」「対応できることを見る」の3つとし、MARORIRIへのリンクはセクション8のみに置き、
  末尾CTA群には含めていない(`KSNAPSTEP_WIREFRAME.md`13番の指示どおり)

**新規作成箇所**: 「対応できることを見る」への控えめなテキストリンクは、確定9セクションの本文には
含まれていなかったが、今回のページ実装指示(9番)で明示的に求められていたため、末尾に1行のみ新規追加した。

プロフィール写真は今回も使用していない。

---

## 10. お問い合わせページ

対象: `site/src/pages/contact/index.astro`

`docs/MARORIRI_SITE_SPEC.md`15-7(全7セクション+フォーム項目一覧)を使用し、「お問い合わせの種類」の
選択肢のみ`KSNAPSTEP_SITE_SPEC.md`15番の確定8択へ差し替えた。他セクションは「MARORIRIが」→
「K-SNAPSTEPが」等のブランド名変更のみ。

構成: ファーストビュー／このような内容をご相談いただけます(6項目、うち1項目「MARORIRIで実作業に
対応できるか」→「K-SNAPSTEPで実作業に対応できるか」)／サービスを決めていなくても構いません／
お問い合わせ後の流れ(4ステップ、`StepList`)／フォームに入力していただく内容／オンラインと訪問に
ついて／お問い合わせフォーム。

フォーム項目一覧(お名前・会社名屋号・メールアドレス・お問い合わせの種類8択・対象サイトURL・
使用中CMS/ECサービス・制作会社の有無・希望する対応時期・オンライン/訪問の希望・現在困っていること・
個人情報同意)をすべて実装した。**formrunの本番埋め込みは行っていない**。フィールドはラベル・入力欄
とも実装したが送信は機能せず、埋め込み予定位置はHTMLコメント(`<!-- formrun埋め込み予定位置... -->`)
でのみ示した。一般利用者向けの見た目には「未完成」「構築中」等の表示を一切行っていない。

---

## 11. プライバシーポリシー

対象: `site/src/pages/privacy.astro`

リポジトリルートの既存`privacy.html`(正式実装元、無変更)から、条文9項目をそのまま移植した。

- 変更した箇所: 事業者名義のみ(「本来面目らぼ（k-snapstep / 片山まゆみ）」→「K-SNAPSTEP（片山まゆみ）」)、
  お問い合わせ先リンク(`/labo/#contact-form`→`/contact/`、URL構成変更に伴う最小限の調整)
- 変更していない箇所: 条文9項目の法的内容(個人情報の管理・利用目的・第三者提供の禁止・安全対策・
  formrunの利用・アクセス解析ツール・Cookie・法令遵守・お問い合わせ)、制定日「2025年」の記載
- formrunに関する記載(株式会社ベーシック・formrunプライバシーポリシーへのリンク)を維持した
- 改定日は既存に記載がないため、新たに追加していない
- 共通レイアウト(`BaseLayout`・ヘッダー・フッター・パンくず)を使用した
- 出力URLは`astro.config.mjs`の`build.format: "preserve"`により`/privacy.html`のまま維持されることを
  ビルド出力で確認した

法的な新規判断は行わず、既存条文の移植のみとした。

---

## 12. 404ページ

対象: `site/src/pages/404.astro`

`docs/KSNAPSTEP_WIREFRAME.md`19番の構成(404／説明／トップへ戻る／主要ページ補助リンク／読みもの)を
実装した。1日WEB担当者・月額Web担当サポート・対応できること・読みものへのリンクを補助リンクとして
配置し、強い問い合わせCTAは置いていない。`noindex`と、実際の出力URL(`/404.html`)に一致する`canonical`を
設定した。

---

## 13. 読みもの一覧

対象: `site/src/pages/reading/index.astro`

確定資料に本文が見当たらなかったため、見出し・導入文は今回新規作成した(新規本文案)。

- ページタイトル・導入文
- シリーズ紹介(「小さな会社のホームページ見直しノート」1本、旧`MARORIRI_CONTENT_WIREFRAME.md`3番の
  2シリーズ左右比較レイアウトはそのまま使用せず、1シリーズでも不自然にならない構成にした)
- 最新記事(公開日順、最大3件、`ArticleCard`)
- 関連サービスへの控えめなテキストリンク(1日WEB担当者／対応できること)

`draft: true`の記事は`getCollection`のフィルタ段階で除外しており、一覧には表示されない。

---

## 14. シリーズ一覧

対象: `site/src/pages/reading/website-review/index.astro`

- 対象者(小さな会社・事業者向け)・コード解説ブログではない旨を導入文で明記(新規本文案)
- 記事は公開日の降順で時系列表示(`ArticleCard`のリスト)
- 記事が増えた段階で分類を追加できるよう、Content Collectionsに`series`フィールドを持たせる設計とし、
  一覧側は現時点でカテゴリー分類を行わない実装にとどめた
- 関連するサービスへの控えめなリンク(1日WEB担当者／月額Web担当サポート)

---

## 15. 記事詳細

対象: `site/src/pages/reading/website-review/[slug]/index.astro`

実装した要素: パンくず／シリーズ名(ラベル)／記事タイトル(h1)／公開日・更新日(`updatedDate`がある
場合のみ表示)／導入文(`introduction`、未設定時は`description`を使用)／条件付き目次(`h2`見出しが
3件以上の場合のみ表示、`TableOfContents`)／本文(`render()`の`<Content />`)／補足・引用・リストの
CSSスタイル(`blockquote`・`ul`/`ol`・`img`)／関連記事(`relatedArticles`が設定されている場合のみ表示)／
シリーズ一覧へ戻る導線／サービス導線(`serviceLink`/`serviceLinkText`が設定されている記事のみ表示)。

全記事に同じ大型CTAを機械的に表示しない設計(サンプル記事のみ`serviceLink`を設定し、表示確認した)。
`draft: true`の記事は`getStaticPaths`の時点で除外されるため、静的ページ自体が生成されず、一般には
到達できない。

**実装時に発見・修正した不具合**: 当初`[slug].astro`(ディレクトリ化しないファイル名)で実装したところ、
`astro.config.mjs`の`build.format: "preserve"`により出力が`/reading/website-review/slug.html`
(フラット形式)になり、他コンポーネントが組み立てる`/reading/website-review/slug/`(末尾スラッシュ)
リンクと一致しない不具合を、ビルド出力の確認中に発見した。`[slug]/index.astro`へファイル配置を変更し、
`/reading/website-review/slug/index.html`という意図どおりのディレクトリ形式で出力されることを確認した。

---

## 16. Content Collections

`site/src/content.config.ts`を次のとおり更新した。

初期必須項目(維持): `title`・`description`・`publishedDate`・`updatedDate`(任意)・`draft`・
`relatedArticles`・`serviceLink`・`serviceLinkText`

今回追加した項目: `series`(`"website-review"`のenum、既定値あり。将来シリーズが増えた場合の拡張余地)・
`slug`(任意、URL上書き用)・`introduction`(任意、記事詳細の導入文用。未設定時は`description`を使用)

初期必須にしなかった項目: `thumbnail`・`category`・`tag`・読了時間・複雑な著者情報(いずれも今回定義していない)

サンプル記事:

- `sample-article.md`(既存、`draft: true`のまま維持。動作確認用のダミー記事として残す)
- `sample-website-checkup.md`(新規、`draft: false`。表示確認用として1件追加し、タイトル・導入文・
  本文冒頭のいずれにも「サンプル」であることを明記した)

本番向け一覧(`/reading/`・`/reading/website-review/`)には`draft: true`の記事が表示されないことを
ビルド出力で確認した。

---

## 17. 追加・更新したコンポーネント

### 新規作成

| コンポーネント | 用途 | 判断理由 |
|---|---|---|
| `common/FaqAccordion.astro` | FAQ(1日WEB担当者) | ネイティブ`<details>`/`<summary>`で実装し、JavaScript・追加のARIA制御なしでキーボード開閉に対応 |
| `common/PriceTable.astro` | 料金表(1日WEB担当者・月額サポート) | 複数ページで使用、料金はカードでなく表形式で統一する方針(DESIGN_GUIDE 18・19番) |
| `common/TableOfContents.astro` | ページ内目次(1日WEB担当者・月額サポート・記事詳細) | 3ページで使用、記事詳細では見出し数による条件付き表示が必要 |
| `common/StepList.astro` | 縦型ステップリスト(1日WEB担当者の流れ・お問い合わせ後の流れ) | 2ページで使用する繰り返し構造 |
| `services/CategoryBlock.astro` | カテゴリブロック(対応できること) | 同一ページ内で6回繰り返す構造、可変高さでカード化しない方針に対応 |
| `reading/ArticleCard.astro` | 記事カード(読みもの一覧・シリーズ一覧) | 2ページで使用する繰り返し構造、最小構成(シリーズ名・タイトル・概要・公開日)を統一 |
| `reading/RelatedArticles.astro` | 関連記事(記事詳細) | 「あれば表示、なければ非表示」の条件表示を1箇所に集約 |

### 更新

| コンポーネント | 変更内容 |
|---|---|
| `page/PageHeader.astro` | 副CTA(`secondaryLabel`/`secondaryHref`)を追加(1日WEB担当者のファーストビューで主/副の2導線が必要なため) |

過剰な細分化を避けるため、単一ページでしか使わない構造(月額サポートの循環グリッド・比較列、
お問い合わせのフォームフィールド等)はページ内のスコープ付きスタイルとして実装し、コンポーネント化していない。

---

## 18. CSS

`docs/KSNAPSTEP_DESIGN_GUIDE.md`の方向案B(「外部Web担当者の実務ノート」、白・薄いグレー基調、
深い赤・えんじのアクセント、ゴシック体)を継承する既存トークン(`site/src/styles/tokens.css`)を
そのまま使用した。今回追加したのは`.page-header__cta-group`(副CTAの並び)のみで、他はすべて
各ページ・各コンポーネントのAstroスコープ付き`<style>`として実装した。

- カードの大量使用を避け、罫線(`border-top`)・背景色の切り替え(`--color-bg-alt`)・余白で
  セクションを区切る構成を各ページで踏襲した
- 赤い塗りボタン(`.btn-primary`)は各ページの主要CTA(ファーストビュー・末尾CTA)に限定し、
  ページ内の他のリンクは`.btn-ghost`または通常のテキストリンクとした
- ページごとに見せ方を変えた例: 1日WEB担当者(3列カード+視点強調)、月額サポート(非直線グリッド+
  2列比較)、対応できること(カテゴリブロック)、プロフィール(1カラムの文章+接続ラベル)、
  お問い合わせ(フォーム中心)、読みもの(罫線区切りのリスト)

---

## 19. レスポンシブ

各ページのグリッド・比較レイアウトに`@media (max-width: 760px)`を設定し、1カラムへ変換することを
確認した。

| 要素 | 対応 |
|---|---|
| ヘッダー・スマホナビ | 前回実装のまま(JS成功時のみ折りたたみ、失敗時は常時展開) |
| 1日WEB担当者の3列カード・含む/含まない2列 | 1列へ変換 |
| 月額サポートの非直線グリッド・2列比較・2枚カード | 1列へ変換 |
| ページ内目次 | `<details>`による開閉式(全ページ共通) |
| 料金表(`PriceTable`) | 横スクロールさせず、ラベル→値の縦積みに変形 |
| FAQ | `<details>`のため、スマートフォンでも同一の開閉挙動 |
| フォーム(お問い合わせ) | 入力欄が`width: 100%`のため、追加のブレークポイントなしで単一カラム表示 |
| 記事本文・引用・表 | 本文幅(`--content-width`)を上限にした可変幅、画像は`max-width: 100%` |

DOM順序を並べ替えるCSS(`order`プロパティ等)は新規ページでは使用しておらず、スマートフォン表示の
情報順はHTML記述順と一致する。

---

## 20. アクセシビリティ

| 項目 | 対応状況 |
|---|---|
| 各ページのh1 | 全11ページで1件のみであることをビルド出力で確認済み(28番参照) |
| 見出し階層 | h1→h2→h3の順を維持。ビルド後のHTMLで階層スキップがないことを確認(実装中に`reading/website-review/index.html`でh1→h3のスキップを発見し、`<h2>記事一覧</h2>`を追加して修正済み) |
| skip link | 全ページで`SiteHeader`より前に配置(既存実装を継続使用) |
| パンくず | トップ・404を除く全ページに設置、`aria-label="パンくず"` |
| navのaria-label | ヘッダー・フッター・パンくず・目次・404補助リンクとも設定済み |
| FAQのキーボード操作 | ネイティブ`<details>`/`<summary>`のため、追加のJavaScriptなしでキーボード開閉に対応 |
| ページ内目次 | `<details>`による開閉式、記事詳細では見出し数による条件付き表示 |
| フォーカス表示 | 既存の`:focus-visible`ルール(青系、アクセント赤と別系統)を継続使用 |
| 十分なタップ領域 | `--tap-target-min: 44px`をFAQ・目次のトグル、フォームのチェックボックスに適用 |
| リンクとボタンの区別 | ページ遷移は`<a>`、フォーム送信は`<button type="submit">`で区別 |
| 色だけで状態を示さない | 必須/任意バッジはテキスト(「必須」「任意」)+枠線で表示、色のみに依存しない |
| 外部リンクの識別 | MARORIRIリンク・プライバシーポリシーの外部リンクとも、矢印記号(`aria-hidden`)+視覚的なテキストまたは`visually-hidden`テキストで明示 |
| draft記事の非表示 | `getCollection`のフィルタと`getStaticPaths`の両方で除外し、一覧にも直接URLにも出てこない設計 |
| 表の見出しセル | `PriceTable`で`<th scope="row">`を使用 |
| `prefers-reduced-motion` | 新規コンポーネントはいずれもCSSトランジション・アニメーションを使用していないため、追加対応の必要なし |
| JavaScript失敗時の可読性 | FAQ・目次ともJavaScript不使用。ヘッダーのスマホナビのみ既存のtry/catch設計を継続 |

**実装中に発見・修正したアクセシビリティ上の不具合**: プロフィールページの経歴接続ラベル(`<p class="career-chain">`)に、当初`aria-label="経歴の流れ"`を付与していたが、これは`<p>`要素の可視テキスト全体をスクリーンリーダーの読み上げ対象から置き換えてしまう(「銀行勤務 → 印刷会社 → …」という実際の経歴が読み上げられなくなる)不具合だったため、`aria-label`を削除し、視覚的に隠した接頭テキスト(`visually-hidden`の「経歴の流れ：」)に差し替えて修正した。

---

## 21. SEO

各ページで`BaseLayout`のprops経由でtitle・meta description・canonical・OGP(title/description/url)・
Twitter Cardを個別設定し、ビルド出力で11ページすべてに存在することを確認した。404ページには
`noindex`と、実際の出力URL(`/404.html`)に一致する`canonical`を設定した(修正前は`Astro.url.pathname`
由来の`/404/`という実態と異なるURLになっていたため、明示的に指定して修正した)。

今回実装していないもの(指示どおり): JSON-LD・GTM・GA4・本番OGP画像・sitemap連携・robots.txt。
記事詳細ページは`render()`の`headings`を利用しており、将来Article構造化データを追加する際に
`publishedDate`・`updatedDate`・`title`・`description`をそのまま流用できる設計にしている。

---

## 22. 既存本文を使用した箇所

- トップページ セクション2・5・6・7・8・9(前回セッションで確定済み、`MARORIRI_SITE_SPEC.md`15-1由来)
- 1日WEB担当者ページ 全12セクション(`MARORIRI_SITE_SPEC.md`15-2、無変更)
- 月額Web担当サポートページ 全10セクション(同15-5、無変更)
- 対応できることページ セクション2〜10(同15-6、セクション1以外は無変更)
- プロフィールページ セクション1・3〜7(同15-3、無変更)
- お問い合わせページ セクション1〜7の大部分・フォーム項目のうち「お問い合わせの種類」以外(同15-7)
- プライバシーポリシーの条文9項目の法的内容(既存`privacy.html`)

---

## 23. ブランド名のみ変更した箇所

- 対応できることページ セクション1「MARORIRIが対応すること」→「K-SNAPSTEPが対応すること」
  (`KSNAPSTEP_SITE_SPEC.md`13番の確定指示)
- お問い合わせページ「このような内容をご相談いただけます」1項目「MARORIRIで実作業に対応できるか」
  →「K-SNAPSTEPで実作業に対応できるか」、「お問い合わせ後の流れ」1ステップ「MARORIRIが内容を
  確認します」→「K-SNAPSTEPが内容を確認します」、ファーストビュー本文「MARORIRIから」→
  「K-SNAPSTEPから」
- プライバシーポリシーの事業者名義「本来面目らぼ（k-snapstep / 片山まゆみ）」→「K-SNAPSTEP（片山まゆみ）」

---

## 24. 一部調整した箇所

- プロフィールページ セクション2: マロリリコーダー部の段落を削除(旧事業の内容を取り除く最小限の調整、
  `KSNAPSTEP_SITE_SPEC.md`14番の確定指示)
- プロフィールページ セクション8: 見出し・本文をMARORIRIへの外部リンク的な扱いへ調整
  (`KSNAPSTEP_SITE_SPEC.md`14番の調整案を採用。同文書内で「最終文言は次回検討」と付記されている点は
  33番「未確定事項」に記録する)
- プロフィールページ セクション9: 確定本文中の「マロリリコーダー部」への言及を除外に伴い調整
  (今回の作業指示にある除外対象と矛盾するため)
- 1日WEB担当者ページ セクション12: CTA文言「送信する」→「今の状況を相談する」
  (本ページに実フォームを持たない構成のための調整)
- 月額サポートページ セクション7: 「メッセージでできること」「面談で扱うこと」という2列見出しラベルを
  新規付与(本文の言い換えはなし)
- プライバシーポリシー: お問い合わせ先リンクを`/labo/#contact-form`→`/contact/`へ変更
  (URL構成変更に伴う最小限の調整)

---

## 25. 新規作成した本文

- トップページの暫定文はすべて前回セッションで確定済みのため、今回新規作成した本文はなし
- 読みもの一覧ページの見出し・導入文・シリーズ紹介文(確定資料に本文が見当たらなかったため新規作成)
- シリーズ一覧ページ(小さな会社のホームページ見直しノート)の導入文(同上)
- プロフィールページ末尾の「対応できることを見る」テキストリンク(確定9セクションには含まれていなかったが、今回のページ実装指示で明示的に求められたため新規追加)
- サンプル記事1件(`sample-website-checkup.md`、表示確認用であることを明記)

---

## 26. 旧要素の除外確認

ビルド後の`dist/`全体に対し、次の語をそれぞれ`grep`で確認し、いずれも0件であることを確認した。

`本来面目`・`頭の中をほどく`・`占い`・`unki_guide`・`uranai_blender`・`借金脳`・`曼荼羅`・`仏教`・
`マロリリコーダー部`・`コーディングチェック`・`案件全体相談`

`MARORIRI`は各ページに1件(共通フッターの補助リンク)のみで、プロフィールページのみ5件
(セクション8の見出し・本文・外部リンク、フッターの補助リンク)であることを確認した。トップページの
HTMLコメント内に`docs/MARORIRI_SITE_SPEC.md`という資料パスへの言及が残っているが、これは前回セッション
由来の開発者向けコメント(出典コメント)であり、閲覧可能な本文としては表示されない。

---

## 27. ビルド・チェック結果

| 確認項目 | 結果 |
|---|---|
| `npm run check`(最終) | 0 errors / 0 warnings / 14 hints(既知の`z`非推奨hintのみ、エラーなし) |
| `npm run build`(最終) | 成功。11ページ出力 |
| 出力ページ数 | 9(固定ページ・トップ・404) + 3(読みもの一覧・シリーズ一覧・記事詳細1件) = 11 |
| h1の数 | 全11ページで1件ずつ |
| 見出し階層のスキップ | 発見1件(website-review一覧)、修正済み |
| 内部リンクの解決 | 全ページのリンク先を突合し、すべて実在するパスであることを確認(アセット参照含む) |
| draft記事の非公開 | 一覧・静的パス生成の両方で除外を確認 |

---

## 28. 出力ページ一覧

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
└── 404.html
```

---

## 29. 既存ルートファイルの状態

作業前後で、リポジトリルートの既存ファイル(`index.html`・`privacy.html`・`css/`・`js/`・`images/`・
`sitemap.xml`・`labo/`・`test0627/`・`test_lp2507/`)は一切変更していない。
`git diff --stat 47f39bf..HEAD -- . ':!site'`が空であることを確認済み。

---

## 30. Git差分

作業前の状態(基盤コミット`47f39bf`＋トップページコミット`aab88b9`、working tree clean)から、
今回の変更をすべて`site/`配下のみでコミットした。

```text
site/src/components/common/FaqAccordion.astro       (新規)
site/src/components/common/PriceTable.astro          (新規)
site/src/components/common/StepList.astro             (新規)
site/src/components/common/TableOfContents.astro      (新規)
site/src/components/page/PageHeader.astro             (更新: 副CTA追加)
site/src/components/reading/ArticleCard.astro         (新規)
site/src/components/reading/RelatedArticles.astro     (新規)
site/src/components/services/CategoryBlock.astro      (新規)
site/src/content.config.ts                            (更新: series/slug/introduction追加)
site/src/content/articles/sample-article.md           (更新: series/introduction追加、draft維持)
site/src/content/articles/sample-website-checkup.md   (新規、draft: false)
site/src/pages/404.astro                               (更新: 本文実装)
site/src/pages/contact/index.astro                     (更新: 本文実装)
site/src/pages/monthly-support/index.astro             (更新: 本文実装)
site/src/pages/one-day-web-manager/index.astro         (更新: 本文実装)
site/src/pages/privacy.astro                           (更新: 条文移植)
site/src/pages/profile/index.astro                     (更新: 本文実装)
site/src/pages/reading/index.astro                     (更新: 本文実装)
site/src/pages/reading/website-review/index.astro      (新規)
site/src/pages/reading/website-review/[slug]/index.astro (新規)
site/src/pages/services/index.astro                    (更新: 本文実装)
site/src/styles/tokens.css                             (更新: 副CTA用CSSのみ追加)
```

22ファイル変更(新規11・更新11)。`site/`以外の変更は0件。

---

## 31. コミットID

`6b15374`(`feat: implement K-SNAPSTEP pages and reading foundation`)

コミット後、`git status`は`nothing to commit, working tree clean`であることを確認した。push・merge・
tag作成・mainブランチへの変更は行っていない。

---

## 32. 今回行わなかったこと

- 正式ロゴ作成
- プロフィール写真の使用
- 完成図版作成(月額確認サイクル図版等)
- GTM設置
- GA4設置
- formrun本番接続(お問い合わせページのフィールドは実装したが送信は機能しない)
- JSON-LD実装
- sitemap連携
- robots.txt作成
- `/labo/`リダイレクト
- ステージング環境構築
- 本番公開
- push
- mainブランチへの変更
- MARORIRI側の変更

---

## 33. 未確定事項

- プロフィールページ セクション8の文言は、`KSNAPSTEP_SITE_SPEC.md`14番自体が「最終文言は次回検討」と
  付記している調整案を採用したものであり、最終確定ではない
- トップページ セクション4を2カード形式のまま維持する判断は、`KSNAPSTEP_SITE_SPEC.md`の指示を優先した
  結果であり、`MARORIRI_SITE_SPEC.md`379〜404行目の地の文プロセス本文を採用するかどうかは、
  今回あらためて判断を求める形で記録しておく
- 対応できることページ セクション8を3段落の地の文のまま実装した判断(左右2列への分割は行わなかった)も、
  ワイヤーフレーム案との差異として記録する
- お問い合わせフォームの実際の項目(formrun側の設定)・自動返信・ファイル添付・確認画面は未確定のまま
- 各ページの仮URL(`/one-day-web-manager/`等)の最終確定
- K-SNAPSTEPの正式ロゴ・配色・フォントの最終値
- `/labo/`の扱い・リダイレクト方針
- サンプル記事(`sample-website-checkup.md`)は表示確認用であり、実際の編集記事への差し替えが必要

---

## 34. 次の作業

1. 33番の未確定事項(特にプロフィール セクション8・トップ セクション4)についてユーザー確認を取る
2. 実際の編集記事(「小さな会社のホームページ見直しノート」本編)の執筆・追加
3. GTM・formrunの実設置
4. JSON-LD(Person/Organization/Article)の新規実装
5. sitemap自動生成・robots.txtの環境別運用方針決定
6. `/labo/`の301リダイレクト実装
7. K-SNAPSTEPの正式ロゴ・配色・フォントの確定
8. ステージング環境での確認、公開方法確定後の本番切り替え
