# K-SNAPSTEP トップページ 正式デザイン実装(2026年7月28日作業)

承認済みデザイン画像(通常のサービスサイト型)を正本として、正式トップページ`/`を実装した記録。

## 1. 作業日時

2026年7月28日 23:20頃〜23:55頃

## 2. 作業ブランチ

`feature/ksnapstep-astro-rebuild`(基準コミット: `5c991d8`)

## 3. 承認デザイン画像について

`docs/KSNAPSTEP_TOP_DESIGN_REFERENCE.png`というファイルはリポジトリ内に存在しなかった(チャットに直接添付された画像のみで、ファイルとしては保存されていない)。画像バイト自体を取得する手段がなかったため、ファイルの切り出しやピクセル単位の複製はできなかった。そのため、チャットで直接見た画像を目視で分析し、レイアウト・余白・見出しサイズ・配色・背景装飾・アイコンの使い方・セクション密度・カードの形・CTAの見せ方・ヘッダー/フッター・ファーストビュー構成を読み取ったうえで、実装可能なコード(HTML/CSS/インラインSVG)として再構成した。

## 4. 実装できたか

実装完了。既存の確定9セクション構成・確定本文・料金・CTA文言・URL・SEO関連設定は変更せず、通常のサービスサイト型のビジュアルへ作り直した。

### 4-1. 追記(2026年7月29日): 実イラスト・アイコン素材への差し替え

作業完了後、ユーザーから実際のイラスト・アイコン素材(ChatGPT生成の背景透過PNG、5点)が提供され、「この画像を使ってOKです」と使用許可を得たため、以下のとおり差し替えた。

- ファーストビューのイラスト(手描き風のインラインSVG)→ 提供されたイラスト素材(`site/public/images/home/hero-web-manager.webp`)へ差し替え
- 「このような状態になっていませんか」「K-SNAPSTEPが行うこと」「このようなテーマを扱います」の3セクション、計18アイコン(線画SVG)→ 提供されたイラスト調アイコン素材(`site/public/images/home/icons/`配下、18点)へ差し替え。SciPyの連結成分分析(`scipy.ndimage.label`)でスプライトシートから各アイコンを自動検出・個別切り出しし、内容が近いものから各項目へ割り当てた
- サービス比較・幅広く確認できる理由(代表例タグ)・必要な実作業については、対応する素材が提供されなかったため、従来どおり自作の線画SVG(`Icon.astro`)のまま維持している
- 背景装飾シート(1点、15マス相当)も提供されたが、既存のCSSのみによる淡い円形装飾(`.section--decorated`)で要件を満たせていたため、今回は採用を見送った(素材は使用していない)
- 画像はすべてWebPに変換して軽量化した(元PNG合計約4.5MB→WebP約600KB)。変換後の元PNGは削除済み
- WordPress社等の公式ブランドロゴ画像は使用していない(提供アイコンはAI生成の抽象的な線画イラストであり、実在のロゴ画像そのものではない)

## 5. 作成・更新した主なファイル

**新規作成**
- `site/src/components/icons/Icon.astro`(線画アイコン共通コンポーネント。外部CDN・アイコンフォントは使用せず、すべて自作のインラインSVG。サービス比較・幅広く確認できる理由・必要な実作業で使用)
- `site/src/components/home/HeroIllustration.astro`(ファーストビュー右側のイラスト。当初は独自インラインSVGだったが、2026年7月29日にユーザー提供の実イラスト素材へ差し替え)
- `site/public/images/home/hero-web-manager.webp`(ファーストビューのイラスト、163KB)
- `site/public/images/home/icons/*.webp`(困りごと・K-SNAPSTEPが行うこと・相談テーマの計18アイコン、1点あたり13〜33KB)

**変更**
- `site/src/pages/index.astro`(お問い合わせCTAをえんじ色の帯として表示するためのラッパー追加。本文・CTA文言・URLは変更なし)
- `site/src/components/home/HeroSection.astro`(2カラム化・イラスト追加。本文・CTA文言は変更なし)
- `site/src/components/home/ConcernsSection.astro`(6項目をアイコン付きカードの3×2グリッドへ。項目文は変更なし)
- `site/src/components/home/RoleSection.astro`(6ラベルをアイコン付きの帯セクションへ。ラベル文言は変更なし)
- `site/src/components/home/ServiceComparison.astro`(アイコン・小ラベルを追加した2枚カードへ。料金・内容・CTA文言は変更なし)
- `site/src/components/home/TopicsSection.astro`(6項目をアイコン付き薄枠ボックスへ。項目文・CTA文言は変更なし)
- `site/src/components/home/ExperienceSection.astro`(左に文章・右に代表例タグという2カラムへ。本文・代表例の語句は変更なし)
- `site/src/components/home/WorkSupportSection.astro`(左に文章・右に線画アイコン装飾という2カラムへ。本文は変更なし)
- `site/src/components/home/ProfileSummary.astro`(人物紹介と分かる背景色・経歴ラベル入りの2カラムへ。本文は変更なし。架空人物の写真は使用していない)
- `site/src/components/global/SiteHeader.astro`(お問い合わせボタンへメールアイコンを追加。ナビ構成・文言は変更なし)
- `site/src/styles/home.css`(トップページ専用CSSを全面刷新。新しい配色トークン・背景装飾・カード・アイコン・グリッドのスタイルを定義)
- `site/src/styles/tokens.css`(サイト全体のボタン角丸を2px→8pxへ統一し、アイコン用の共通クラスを追加。配色・使用箇所は変更なし)
- `site/README.md`・`site/.gitignore`(スクリーンショット保存先の追記)

**既存のまま変更していないもの**
- 確定9セクションの見出し・本文・料金・CTA文言・URL・内部リンク
- `/__review/home-design-a/`・`/__review/home-design-b/`(参照用として残置)
- 下層ページ(1日WEB担当者・月額Web担当サポート・対応できること・プロフィール・お問い合わせ・読みもの・プライバシーポリシー・404)の本文・構造
- SEO(canonical・OGP・JSON-LD)・sitemap・robots・GTMの環境切り替え・formrun・Content Collections

## 6. ファーストビューの実装方法

左に見出し・本文・主副CTA、右にイラストという2カラム構成(`grid-template-columns: 1.05fr 1fr`)。900px未満で1カラムに切り替わり、文章→イラストの順で表示される(DOM順がもともと文章→ビジュアルのため、モバイルでも自然にこの順になる)。見出しは`clamp(1.75rem, 1.3rem + 2vw, 2.75rem)`で画面幅に応じて可変。「単発／継続」の内訳は、イラスト下に小さな2枚のチップとして配置した。

## 7. イラスト・画像の扱い

承認画像のファイルがリポジトリ内に存在せず、画像バイトを直接切り出す手段がなかったため、外部ストック写真や架空人物の写真は一切使用していない。代わりに、`HeroIllustration.astro`として、ノートPCに向かう人物・観葉植物・マグカップ・メール/円グラフ/棒グラフ/チェックの浮遊カードを独自に描き起こしたインラインSVGイラストを実装した。実在の人物を描写したものではない。プロフィールセクションも同様の理由で、写真領域を設けず経歴ラベルで構成する方式を採用した(将来、実際の写真を追加できるよう`.profile-summary__visual`を差し込み先として確保している)。

## 8. 背景装飾の実装方法

`.section--decorated`という共通クラスを作り、セクションの左下・右上に淡い暖色の円形(`--home-bg-warm`)をCSSの疑似要素(`::before`/`::after`)で配置した。困りごと・サービス比較・相談テーマ・プロフィール・最終CTAの各セクションに適用している。装飾は`position: absolute`かつコンテンツより背面(z-index: 0)に置き、`pointer-events: none`でクリック・読み上げの対象にしていない。最終CTA(えんじ色の帯)では、同じ仕組みのまま円の色を白の半透明に切り替えている。ファーストビューの背景の丸みは、`HeroIllustration.astro`内の`<ellipse>`で個別に表現した(二重にならないよう、`.hero`セクション自体には`.section--decorated`を適用していない)。

## 9. 困りごと・役割・テーマのアイコン

外部アイコンCDN・アイコンフォント・絵文字は使用せず、すべて`Icon.astro`による自作の線画インラインSVG(`stroke="currentColor"`、太さ統一)。困りごと(question/monitor-question/database-swap/server/search-check/user-alone)、K-SNAPSTEPが行うこと(search/split/file-check/toggle/users/flag)、相談テーマ(target/scale/layers/cart/server/trending-up)をそれぞれ意味の近い形で割り当てた。WordPress等のブランドロゴ画像は使用せず、「layers(層)」という一般的な線画で表現している。困りごとのアイコンは淡い暖色円の上にえんじ色、K-SNAPSTEPが行うことのアイコンはえんじ色円の上に白、相談テーマのアイコンは白丸+細枠線という3パターンに分け、セクションごとに見た目の違いを出した。

## 10. サービス比較

1日WEB担当者・月額Web担当サポートを同格の2枚カードとして表示。各カードにアイコン付きの小ラベル(「単発でじっくり相談したい方に」「継続して伴走してほしい方に」)を追加し、料金はチェックリストと並ぶ一要素として控えめなサイズにした(過度に大きくしていない)。月額側カードのみ背景をごく薄いクリーム色にして、同格のまま視覚的な違いをつけた。ボタンはカード下部に配置し、カード全体はリンク化していない。1日WEB担当者を先に表示している。

## 11. プロフィールの扱い

架空人物の写真は使用せず、写真領域を設けずに経歴ラベル(銀行勤務／印刷・DTP／Web制作・運用／現在のK-SNAPSTEP)で構成する方式を採用した。このラベルの語自体は`src/pages/profile/index.astro`の経歴チェーンで既に使われている確定済みの短縮ラベルをそのまま再利用しており、新しい文言は追加していない。セクション全体に暖色の背景(`--home-bg-warm`)と広めの余白を敷き、他セクションと区別できるようにした。

## 12. レスポンシブ対応

1440px・1024px・768px・390px・320pxの5幅をPlaywrightで確認。全幅で横スクロールなし(`scrollWidth === clientWidth`)、h1は1つ、見出し階層は`H1 > H2 ... H3(サービスカード見出し) ... H2`の順で崩れなし。困りごと・相談テーマのグリッドは900px未満で2列、560px未満で1列に、K-SNAPSTEPが行うことのグリッドは900px未満で2列に切り替わる。ファーストビュー・幅広く確認できる理由・必要な実作業・プロフィールの2カラム構成は900px未満で1カラムへ切り替わり、モバイルでは「文章→ビジュアル」の順(プロフィールのみ元が「写真位置→文章」のためCSSの`order`で文章を先に表示する処理を追加)になるようにした。単純な総当たり縦積みではなく、カード・アイコン・グリッドの形はモバイルでも維持している。

## 13. ビルド・チェック結果

- `npm run check`: 0 errors / 0 warnings / 15 hints(既存の`content.config.ts`の`zod`非推奨警告のみで、今回の作業と無関係)
- `npm run build`: 13ページ生成(既存11ページ+比較用2ページ)、エラーなし
- WCAG AAコントラスト確認(すべて基準4.5:1以上): 本文色/白 14.34:1、本文色/暖色背景 12.31〜13.43:1、補助文字/白 5.00:1、バッジ文字/暖色背景 7.06:1、ボタン白文字/えんじ色背景 8.23:1、最終CTA帯の白文字/濃いえんじ 11.54:1

## 14. 既存下層ページへの影響

- 共通ヘッダー(`SiteHeader.astro`): お問い合わせボタンにメールアイコンを追加。ナビ項目・文言・構造は変更なし。全ページに影響するため、1日WEB担当者ページで表示確認済み(問題なし)
- 共通トークン(`tokens.css`): `.btn-primary`/`.btn-ghost`の角丸を2px→8pxに統一(色・配置・使用箇所は変更なし)。全ページのボタンが同じ丸みになるが、表示確認済みで崩れなし
- 共通フッター: 変更なし
- 各下層ページの本文・構造・専用CSS: 変更なし
- `/__review/home-design-a/`・`/__review/home-design-b/`: 変更なし、参照用としてそのまま残置。確認の過程で、両ページのファーストビュー主CTAボタンの文字が背景色と同化して読めない状態(赤背景に赤文字)になっている既存の見た目上の問題を発見したが、これは今回の変更以前から存在していたもの(作業前に保存済みのスクリーンショットで確認済み)であり、指示により両ページ自体には手を加えていない

## 15. 現在のGit差分

```
$ git status --short
 M site/.gitignore
 M site/README.md
 M site/src/components/global/SiteHeader.astro
 M site/src/components/home/ConcernsSection.astro
 M site/src/components/home/ExperienceSection.astro
 M site/src/components/home/HeroSection.astro
 M site/src/components/home/ProfileSummary.astro
 M site/src/components/home/RoleSection.astro
 M site/src/components/home/ServiceComparison.astro
 M site/src/components/home/TopicsSection.astro
 M site/src/components/home/WorkSupportSection.astro
 M site/src/pages/index.astro
 M site/src/styles/home.css
 M site/src/styles/tokens.css
?? site/public/images/home/            (実イラスト・アイコン素材、WebP計19点)
?? site/src/components/home/HeroIllustration.astro
?? site/src/components/icons/
?? site/src/components/review/       (前回作業分、参照用として残置)
?? site/src/data/                    (前回作業分、参照用として残置)
?? site/src/pages/[...reviewSlug].astro  (前回作業分、参照用として残置)

$ git diff --stat (変更ファイルのみ)
14 files changed, 773 insertions(+), 167 deletions(-)
```

リポジトリルート(`site/`以外)への差分なし。コミットは行っていない。基準コミット`5c991d8`へいつでも戻れる状態。

## 16. 正式採用後に必要な作業

1. 承認デザイン画像そのもの(元ファイル)を`docs/`配下へ保存し、今回インラインSVGで代替したヒーローイラストを、可能であれば元画像を切り出した本物の画像・イラスト素材へ差し替える
2. プロフィール写真が確定した際に、`ProfileSummary.astro`の`.profile-summary__visual`を経歴ラベルから実際の写真へ差し替える
3. `/__review/home-design-a/`・`/__review/home-design-b/`・`src/pages/[...reviewSlug].astro`・`src/data/homeContent.ts`・比較用スクリーンショットは、今回の正式デザイン採用をもって不要になるため削除する
4. OGP画像が未作成のため、正式ロゴ確定後にあわせて作成する(`README.md`記載のとおり、今回作業でも未着手)
