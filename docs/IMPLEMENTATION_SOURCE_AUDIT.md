# K-SNAPSTEP・MARORIRI 正式実装元調査

`docs/DUAL_SITE_TECH_PLAN.md`・`docs/BRAND_RESTRUCTURE_PLAN.md`・`docs/KSNAPSTEP_SITE_SPEC.md`・`docs/KSNAPSTEP_WIREFRAME.md`・`docs/KSNAPSTEP_DESIGN_GUIDE.md`・`docs/MARORIRI_CODING_SPEC.md`・`docs/MARORIRI_CODING_WIREFRAME.md`・`docs/MARORIRI_CODING_DESIGN_GUIDE.md`・`docs/MARORIRI_TECH_ARCHITECTURE.md`・`docs/MARORIRI_WORK_LOG.md`(全10件、いずれも存在を確認済み)の内容と矛盾しないよう作成しています。`docs/IMPLEMENTATION_SOURCE_AUDIT.md`は今回新規作成です。

コード・設定・Git操作・本番サイトへの変更・送信は行っていません。本番サイト(`k-snapstep.com`・`maroriri.com`)へは読み取り目的でのアクセスのみ行い、変更・送信は一切行っていません。

---

## 1. 調査の目的

実際の構築作業(Astroプロジェクトの作成等)へ進む前に、K-SNAPSTEPとMARORIRIそれぞれについて「正式な実装元」をどこにするかを判断するための事実関係を確定する。

---

## 2. 調査対象フォルダー

指示にあった`../maroriri/`・`../maroriri-site/`というパスは、実際には存在しなかった。親ディレクトリを確認した結果、正確なパスは次のとおりだった。

| 候補 | 指示にあったパス | 実際の絶対パス |
|---|---|---|
| K-SNAPSTEP実装1 | 現在作業中の「本来面目」フォルダー | `/Users/macbook/Desktop/本来面目/` |
| K-SNAPSTEP実装2 | `../kーsnapstep/ksnapstep/` | `/Users/macbook/Desktop/kーsnapstep/ksnapstep/`(指示のパス通り。フォルダー名は通常のハイフンではなく長音記号「ー」) |
| MARORIRI PHP版 | `../maroriri/` | `/Users/macbook/Desktop/kーsnapstep/maroriri/` |
| MARORIRI Vite・React版 | `../maroriri-site/` | `/Users/macbook/Desktop/kーsnapstep/maroriri-site/` |

MARORIRIの2実装は、親ディレクトリ直下ではなく、K-SNAPSTEP実装2と同じ`kーsnapstep/`フォルダーの中に存在していた。

---

## 3. K-SNAPSTEP実装1の調査結果(本来面目フォルダー)

| 項目 | 結果 |
|---|---|
| 絶対パス | `/Users/macbook/Desktop/本来面目/` |
| Git管理 | なし(`.git`が存在しない) |
| Gitリモート | 該当なし |
| 現在のブランチ | 該当なし |
| 最新コミット日時 | 該当なし |
| 最新コミットの概要 | 該当なし |
| 未コミット変更 | 該当なし(Git管理外) |
| 技術構成 | 静的HTML・CSS・JavaScript |
| `package.json` | 確認できない |
| ビルド方法 | 確認できない(ビルド工程がない静的サイト) |
| 出力先 | 該当なし |
| README | 確認できない |
| デプロイ関連設定 | 確認できない |
| ドメイン記載 | HTML内にドメイン名の直接記載は確認できない |
| GTM | `GTM-TXFRNQ3`(`index.html`・`labo/index.html`・`privacy.html`) |
| GA4 | 確認できない(GTMコンテナ内で設定されている可能性はあるが、ローカルファイルからは分からない) |
| フォーム | formrun(`labo/index.html`に埋め込み) |
| OGP | `og:title`・`og:description`・`og:type`のみ(画像・URL・site_name等は確認できない) |
| JSON-LD | 確認できない |
| `sitemap.xml` | 確認できない |
| `robots.txt` | 確認できない |
| `.htaccess` | 確認できない |
| 404ページ | 確認できない |
| プライバシーポリシー | `privacy.html`が存在する |
| ロゴ | `images/logo-dark.png`・`logo-light.png`・`logo-symbol.png`(旧ブランド「本来面目らぼ」名義) |
| プロフィール写真 | `images/profile.jpg`が存在する |
| 公開済みと思われる根拠 | 単体では判断できないが、5番の本番サイト照合により、`note.com/unki_guide`という現在のリンク先が、実際の公開サイトと一致することを確認した |

---

## 4. K-SNAPSTEP実装2の調査結果(kーsnapstep/ksnapstep)

| 項目 | 結果 |
|---|---|
| 絶対パス | `/Users/macbook/Desktop/kーsnapstep/ksnapstep/` |
| Git管理 | あり |
| Gitリモート | `https://github.com/mk-kata/k-snapstep.git` |
| 現在のブランチ | `main` |
| 最新コミット日時 | 2026-05-24 15:32:27 +0900 |
| 最新コミットの概要 | 「feat: PHASE1-3 OGP/JSON-LD/testimonials/相互リンク/sitemap対応」 |
| 未コミット変更 | なし(`git status`でクリーン、`origin/main`と同期済み) |
| 技術構成 | 静的HTML・CSS・JavaScript |
| `package.json` | 確認できない |
| ビルド方法 | 確認できない(ビルド工程がない静的サイト) |
| 出力先 | 該当なし |
| README | 確認できない |
| デプロイ関連設定 | `.github/workflows`・`netlify.toml`・`vercel.json`・`CNAME`いずれも確認できない |
| ドメイン記載 | 確認できない(設定ファイルとしては) |
| GTM | `GTM-TXFRNQ3`(実装1と同一) |
| GA4 | 確認できない |
| フォーム | formrun(実装1と同様の埋め込み) |
| OGP | `og:title`・`og:description`・`og:type`・`og:image`(幅・高さ含む)・`og:locale`・`og:site_name`・`og:url`。実装1より充実 |
| JSON-LD | あり(`application/ld+json`を1件確認) |
| `sitemap.xml` | あり(`https://k-snapstep.com/`・`/labo/`・`/privacy.html`の3件) |
| `robots.txt` | 確認できない |
| `.htaccess` | サイトルートにはなし。`test0627/`・`test_lp2507/`という検証用サブフォルダー内にのみ存在 |
| 404ページ | 確認できない |
| プライバシーポリシー | `privacy.html`が存在する |
| ロゴ | 実装1と同一のファイル一式 |
| プロフィール写真 | `images/profile.jpg`が存在する |
| 公開済みと思われる根拠 | Gitリモートあり・コミット履歴あり・OGP/JSON-LD/sitemapまで作り込まれている点から、本番公開を前提に作業されたリポジトリと考えられる。ただし5番の照合で、一部の内容(note.comのリンク先)が現在の公開サイトとは異なることが判明した |

---

## 5. K-SNAPSTEPの比較

| 比較項目 | 実装1(本来面目) | 実装2(kーsnapstep/ksnapstep) |
|---|---|---|
| ページ数 | 3(トップ・`/labo/`・プライバシー) | 3(同じ)。ほかに`test0627`・`test_lp2507`という検証用ページ群がある |
| 本文の新しさ | note.comのリンク先が`unki_guide`(占いナビ) | note.comのリンク先が`uranai_blender`(占いブレンダー)に変更されている。画像位置修正のコミットも実装2のみに存在する |
| デザイン | 同一(共通CSS) | 同一 |
| OGP | 最小限(3項目) | 充実(9項目、画像・URL・site_name等を含む) |
| メタ情報 | 最小限 | 充実 |
| JSON-LD | なし | あり |
| testimonials | 確認できない(コミットメッセージに記載はあるが、`index.html`本文からは「お客様の声」に相当する記述を特定できなかった) | 同上。実装2にもコミットメッセージ上は言及があるが、本文からの特定はできなかった |
| formrun | あり | あり(同一) |
| GTM | `GTM-TXFRNQ3` | 同一 |
| `sitemap.xml` | なし | あり |
| `robots.txt` | なし | なし(両方とも) |
| プライバシーポリシー | あり | あり(内容は同一系統) |
| 画像 | ロゴ・プロフィール等一式 | 同一 |
| モバイル対応 | メディアクエリで対応済み | 同一 |
| Git履歴 | なし | あり(5コミット) |
| 公開設定 | 判断材料なし | Gitリモート・コミット履歴から本番想定と考えられる |
| 今回の仕様書との一致 | K-SNAPSTEP新仕様はまだどちらにも未反映(想定通り) | 同左 |
| 再利用できるもの | CSS変数・レイアウト構造・画像素材 | 同左に加え、OGP・JSON-LD・sitemapの実装パターン |
| 廃止候補 | 旧ブランド本文・旧ロゴ(いずれの実装でも共通) | 同左 |
| 片方にしか存在しない重要な内容 | `note.com/unki_guide`という、**現在の公開サイトと一致するリンク先** | OGP充実・JSON-LD・sitemap.xml・note.comのリンク先変更(`uranai_blender`)・画像位置修正 |

### どちらが本番公開内容に近いか

`https://k-snapstep.com/`への読み取りアクセスにより、次を確認した。

- `<title>`: 「片山まゆみ ｜ 本来面目らぼ ─ 絡まった考えを、ほどく。」→ 両実装と一致
- `og:site_name`: 「本来面目らぼ ｜ 片山まゆみ」→ 実装2にのみ存在する項目だが、値としては実装2の内容と一致
- note.comのリンク先: 公開サイトは`note.com/web_tanto`と`note.com/unki_guide`の2件 → **これは実装1(本来面目)と一致し、実装2(`uranai_blender`への変更後)とは一致しない**

このことから、**公開中の本番サイトは、実装2で行われた一部の変更(note.comのリンク先変更、OGP/JSON-LD/sitemapの追加)を含む前の状態**であると考えられる。つまり、実装2は「本番より内容が古い」のではなく、「本番の次に反映される予定の変更を含む、本番より新しい作業内容」である可能性が高い。ただし、OGP・JSON-LD・sitemapという変更が本番へ反映されているかどうかは、ページのソースを直接確認した範囲では判断がつかない項目(WebFetchツールはJavaScriptを実行しないHTML変換のため、head内の詳細を完全には取得できていない)があり、**確定には本番ページのソース(view-source)を直接確認する追加照合が必要**である。

---

## 6. K-SNAPSTEPの推奨実装元

**実装2(`/Users/macbook/Desktop/kーsnapstep/ksnapstep/`)を正式な実装元として推奨する。**

確認した判断材料:

| 確認項目 | 結果 |
|---|---|
| GitHub連携が正常か | 正常。`origin/main`と同期済み、`git fetch`でも追加の変更なし |
| 未コミット変更がないか | ない(working tree clean) |
| 公開内容と一致するか | 完全一致ではない。5番のとおり、note.comのリンク先など一部は公開サイトより新しい内容を含んでいる可能性が高い。矛盾ではなく「反映待ちの差分」と考えられる |
| 既存の重要機能がそろっているか | 実装1より充実(OGP・JSON-LD・sitemap.xml) |
| Astroへ移行する場合の土台として使えるか | 使える。Git管理下にあり、変更履歴が追える点で実装1より土台として適している |

実装1(本来面目)は、note.comのリンク先という1点で現在の公開内容と一致しているが、Git管理がなく、変更履歴も追えない。実装2を正式な実装元としつつ、**実装1にのみ存在する`note.com/unki_guide`という現在のリンク先情報を、実装2側に反映すべきかどうかは、ユーザーへの確認事項とする**(19番)。

---

## 7. MARORIRI PHP版の調査結果

| 項目 | 結果 |
|---|---|
| 絶対パス | `/Users/macbook/Desktop/kーsnapstep/maroriri/` |
| Git管理 | あり |
| Gitリモート | `https://github.com/mk-kata/maroriri.git` |
| 現在のブランチ | `main` |
| 最新コミット日時 | 2026-05-24 13:37:43 +0900 |
| 最新コミットの概要 | 「Initial commit」の1件のみ |
| 未コミット変更 | なし |
| 技術構成 | 静的HTML+PHP(フォーム送信部分のみ) |
| `package.json` | 確認できない |
| ビルド方法 | 該当なし(ビルド工程を持たない) |
| 出力先 | 該当なし |
| README | 確認できない |
| デプロイ関連設定 | 確認できない |
| ドメイン記載 | 確認できない(設定ファイルとしては) |
| GTM | `GTM-PHZPSBCR` |
| GA4 | `G-RP0WMKED0F` |
| フォーム | `contact.html`から`mail.php`へPOST送信するネイティブHTMLフォーム |
| OGP | `og:title`・`og:type`・`og:url`・`og:image`・`og:site_name`・`og:description`あり |
| JSON-LD | 確認できない |
| `sitemap.xml` | 確認できない |
| `robots.txt` | 確認できない |
| `.htaccess` | 確認できない |
| 404ページ | 確認できない |
| プライバシーポリシー | `privacy.html`が存在する |
| ロゴ | `assets/img/mv__logo.png`(650×656、小さめの正方形寄りサイズ)ほか |
| プロフィール写真 | 個別に確認できていない(`assets/img`配下に多数の画像があるが、プロフィール専用と断定できるファイル名は未特定) |
| 公開済みと思われる根拠 | コミットが1件のみで、以降の更新がない。`<title>`・meta descriptionの文言(「一日助っ人」「20年以上のweb制作経験」)が、MARORIRI Vite・React版やK-SNAPSTEPの現行本文とも異なり、他の実装より前の段階の構想と見られる |

---

## 8. MARORIRI Vite・React版の調査結果

| 項目 | 結果 |
|---|---|
| 絶対パス | `/Users/macbook/Desktop/kーsnapstep/maroriri-site/` |
| Git管理 | あり |
| Gitリモート | `https://github.com/mk-kata/maroriri-site.git` |
| 現在のブランチ | `main` |
| 最新コミット日時 | 2026-05-24(複数コミットが同日に集中) |
| 最新コミットの概要 | 「feat: GA4・GTM追加(GTM-PHZPSBCR / G-RP0WMKED0F)」 |
| 未コミット変更 | なし(`origin/main`と同期済み) |
| 技術構成 | Vite 7 + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui(Radix UI)。Astroではない |
| `package.json` | あり(`name: "maroriri"`) |
| ビルド方法 | `vite build`+`esbuild`によるサーバーfiles生成(`package.json`の`build`スクリプト) |
| 出力先 | `dist/`(`dist/public`に静的アセットを確認) |
| README | あり。「Manus」と見られるAIサイト構築ツールのテンプレート(`web-static`)由来の内容 |
| デプロイ関連設定 | `.github/workflows`・`netlify.toml`・`vercel.json`・`CNAME`いずれも確認できない |
| ドメイン記載 | `client/index.html`に`canonical`・`og:url`として`https://maroriri.com/`が明記されている |
| GTM | `GTM-PHZPSBCR`(PHP版と同一) |
| GA4 | `G-RP0WMKED0F`(PHP版と同一) |
| フォーム | Formspree(フォームIDが設定済み。コミットメッセージから存在を確認。IDそのものはここに複製しない) |
| OGP | `og:title`・`og:description`・`og:type`・`og:url`・`og:image`(幅高さ含む)・`og:locale`・`og:site_name`。`twitter:card`系も含め充実 |
| JSON-LD | 確認できない |
| `sitemap.xml` | 確認できない |
| `robots.txt` | 確認できない |
| `.htaccess` | 確認できない(Viteベースのため通常不要) |
| 404ページ | あり(`client/src/pages/NotFound.tsx`) |
| プライバシーポリシー | あり(`client/src/pages/PrivacyPolicy.tsx`。「MARORIRI（マロリリ）/ 片山まゆみ」名義) |
| ロゴ | `client/public/assets/img/logo.png`(1835×349、PNG)。詳細は14番 |
| プロフィール写真 | 個別のプロフィール写真ファイルは特定できていない(`assets/img`内に複数の人物写真・イラストがあるが、K-SNAPSTEP側`profile.jpg`のような単独ファイルは確認できない) |
| 公開済みと思われる根拠 | 19件のコミットにわたる継続的な調整(ファビコン修正、ロゴサイズ調整、CASEイラスト差し替え、フッターのマーキー削除等)があり、下書きではなく仕上げ作業の履歴と考えられる。加えて10番のとおり、本番ドメインとの照合で複数の一致点が見つかっている |

---

## 9. MARORIRIの比較

| 比較項目 | PHP版(`maroriri/`) | Vite・React版(`maroriri-site/`) |
|---|---|---|
| 技術 | 静的HTML+PHP | Vite+React+TypeScript |
| Git履歴 | 1コミットのみ | 19コミット、継続的な調整履歴 |
| ページ構成 | `index.html`・`contact.html`・`thanks.html`・`archive.html`・`privacy.html`の複数ページ | `App.tsx`のルーティングは`/`・`/404`のみを確認(単一ページ+セクション内リンク構成の可能性。プライバシーポリシーページも別途存在) |
| 現在の事業内容 | 「ホームページのお困りごとを一緒に解決」「一日助っ人」「20年以上のweb制作経験」 | 「Webの困りごとを一緒にほどく」「Web業界35年の経験」。PHP版より新しい言い回しに更新されている |
| ロゴ | `mv__logo.png`(650×656) | `logo.png`(1835×349)。同一デザインのワイド版と見られる |
| 配色 | 個別確認していないが、ロゴの配色(マルーン・コーラル)は共通と見られる | マルーン(暗い赤茶)+コーラル(サーモンピンク寄りの赤)の2色。`Home.tsx`のコメントには「オレンジ・グリーン・オフホワイトの現行カラー継承」と記載があり、ロゴ以外の本文デザインでは追加の配色が使われている可能性がある |
| フォント | 確認していない | `Noto Serif JP`・`Noto Sans JP`・`EB Garamond`(Google Fonts) |
| GTM | `GTM-PHZPSBCR` | 同一 |
| GA4 | `G-RP0WMKED0F` | 同一 |
| フォーム | `mail.php`(PHP、サーバー側処理が必要) | Formspree(外部サービス) |
| OGP | あり | より充実(twitter:card等も含む) |
| sitemap | なし | なし |
| robots.txt | なし | なし |
| デプロイ設定 | 確認できない | 確認できない |
| ドメイン記載 | 確認できない | `canonical`・`og:url`に`https://maroriri.com/`が明記されている |
| 今回の育成事業仕様との一致 | 一致しない(「一日助っ人」という別事業の構想) | 一致しない(「困りごとを一緒にほどく」という相談業の構想) |
| 再利用できるもの | ロゴ画像(Vite版と共通) | ロゴ、GTM/GA4、OGP実装パターン、404ページの枠組み |
| 再利用しないもの | 事業内容の本文、PHPというサーバー依存の仕組み | 「困りごと解決」を中心とした本文、配色(オレンジ・グリーン)、CASE事例、旧トップページ構成 |
| 公開中と思われる根拠 | 単一コミットで更新が止まっており、後発のVite版に置き換えられたと見られる | GTM/GA4・ドメイン記載・継続的な調整履歴があり、10番の本番照合結果とも整合する |

---

## 10. 公開中maroriri.comとの照合

`https://maroriri.com/`への読み取りアクセスを行い、次を確認した(本番サイトへの変更・送信は行っていない)。

| 比較項目 | 結果 |
|---|---|
| `<title>` | 「MARORIRI（マロリリ）｜片山まゆみ ─ Webの困りごとを一緒にほどく」→ **Vite・React版の`client/index.html`と完全一致** |
| meta description | WebFetchツールがHTMLをMarkdown変換して処理するため、head内の詳細(meta description等)は取得できなかった |
| 見出し・本文 | 取得できなかった。ページの主要な内容はJavaScriptで描画される構造と見られ(下記)、初期HTMLの時点では本文が展開されていない |
| ロゴ・配色 | 取得できなかった(画像・スタイル情報はこの方法では確認できない) |
| HTML構造 | ページの初期HTMLは`<div id="root">`程度の最小限の構造と推定され、Vite・React版の`client/index.html`(`<div id="root"></div>`+`<script type="module" src="/src/main.tsx">`)と一致する特徴を示している。PHP版はサーバー側で本文まで描画される構造のため、この挙動とは一致しない |
| JavaScript・CSSのファイル名 | 取得できなかった(WebFetchはスクリプトを実行せず、ビルド後のハッシュ付きファイル名を確認する手段が今回はない) |
| GTM・GA4 | 取得できなかった(スクリプトタグの内容はMarkdown変換で失われる) |
| フォーム送信先 | 取得できなかった |
| favicon・OGP画像 | 取得できなかった |
| note.comのリンク | 該当なし(MARORIRIのページ) |

**判断**: `<title>`の完全一致、および初期HTMLがReactのマウント先(`#root`)のみで本文がJavaScript側にあると見られる構造から、**現在公開中の`maroriri.com`は、PHP版ではなくVite・React版(`maroriri-site/`)に基づいている可能性が高い**。ただし、GTM・GA4・実際のJS/CSSファイル名など、ネットワークアクセスの制限(スクリプト非実行)により確認できなかった項目も残るため、**完全な確定には、ブラウザで実際にページを開いての目視確認、またはページソースの直接取得(view-source)による追加照合を推奨する**。

---

## 11. MARORIRIで再利用するもの

| 項目 | 再利用可否 | 理由 |
|---|---|---|
| 正式ロゴ | 条件付きで再利用候補 | デザインは存在するが、14番のとおり「困りごと相談」を象徴する意匠であり、育成事業への意味づけは要再検討 |
| ドメイン設定に関する情報 | 再利用する | `maroriri.com`というドメイン自体は事業の同一性を保つ上で引き継ぐべき情報であり、`client/index.html`に記載のURL構造は参考になる |
| Git履歴 | 再利用する(リポジトリとして) | 7番の案の判断次第だが、少なくとも履歴を破棄せず参照可能な状態は保つ |
| GTM | 再利用候補 | `GTM-PHZPSBCR`は既存のタグ設定の土台として使える可能性がある。ただし今回の育成事業向けにタグ内容の見直しが必要 |
| GA4 | 再利用候補 | `G-RP0WMKED0F`は同一プロパティを継続すればこれまでの計測データと連続性を保てる |
| フォーム設定 | 要検討のうえ再利用候補 | Formspreeの導入実績はあるが、`docs/MARORIRI_CODING_DESIGN_GUIDE.md`25番の項目(現在の仕事内容・使用技術等)に合わせてフォーム項目自体は作り直しが必要 |
| OGP・favicon | 部分的に再利用候補 | 実装パターン(タグの構成)は参考になるが、内容(タイトル・説明文・画像)は育成事業向けに全面的に書き換えが必要 |
| デプロイ設定 | 確認できず判断保留 | デプロイ関連設定ファイルが見つかっていないため、再利用の可否を判断する材料がない(16番) |
| 一部の汎用コンポーネント | 再利用候補 | `ErrorBoundary`・`ThemeProvider`・shadcn/ui部品等、事業内容に依存しない技術的な部品は流用できる可能性がある |
| アクセシビリティ対応 | 個別確認が必要 | 既存実装のアクセシビリティ対応状況は今回未調査(コードレビューが必要) |
| レスポンシブ処理 | 再利用候補 | Tailwind CSSによるレスポンシブ実装は、技術的な仕組みとしては流用しやすい |

---

## 12. MARORIRIで再利用しないもの

| 項目 | 理由 |
|---|---|
| 「Webまわりの困りごと」を中心とした旧本文 | 今回確定した「コーディングを入口に、Webの現場を見渡せる人を育てる」という育成事業とは事業内容が異なる |
| 旧サービス構成(CASE6件・お客様の声等) | 育成事業のサービス構成(月額活動・勉強会・個別相談・コーディングチェック・案件全体相談)とは対応しない |
| オレンジ・グリーンの配色 | `docs/MARORIRI_CODING_DESIGN_GUIDE.md`14番で緑を不使用と方針決定済み、オレンジも検討対象外 |
| 旧トップページ構成 | `docs/MARORIRI_CODING_WIREFRAME.md`で設計したページ構成と異なる |
| 法人・事業者向けの表現(「35年の経験」を相談業として押し出す表現等) | 育成事業は「一緒に考える場」「経験の浅い人でも話しやすい」という印象を重視しており、旧実装の「経験豊富な相談相手」という一方向的な打ち出し方とは異なる |
| 今回の育成事業と一致しない画像(トラブルカード画像、CASE挿絵等) | 内容が育成事業のページ構成・具体例と対応しない |

---

## 13. MARORIRIの正式実装元候補

| 案 | 内容 | 評価 |
|---|---|---|
| 案A | 既存`maroriri-site`のGitリポジトリを正式な実装元とし、中身を全面的に作り替える | 既存のドメイン接続・GTM/GA4・デプロイの仕組み(存在する場合)を維持できる可能性がある一方、Vite+React+shadcn/uiという技術構成を今後も使い続けることになり、Astro採用というK-SNAPSTEP側との技術的な統一が崩れる |
| 案B | 新しいAstroプロジェクトを作り、既存`maroriri-site`からロゴ・計測・フォーム・デプロイ情報だけを移す | K-SNAPSTEPとの技術構成(Astro)を統一でき、記事管理(Content Collections)も設計しやすい。ただし、既存のデプロイ経路(10番で存在が示唆されているが詳細未確認)を作り直す必要が生じる可能性がある |
| 案C | PHP版`maroriri`を正式な実装元にする | 10番の照合結果から、現在の公開内容はPHP版ではなくVite・React版に近いと考えられるため、古い内容を土台にすることになり不利 |

**推奨**: 案B(新しいAstroプロジェクトを作り、既存`maroriri-site`からロゴ・計測・フォーム・デプロイ情報だけを移す)を推奨する。

理由:
- 技術構成: K-SNAPSTEP側でAstro採用を検討している(`docs/DUAL_SITE_TECH_PLAN.md`)ため、MARORIRIも同じ技術構成にそろえる方が、13番(共有するもの・共有しないもの)の方針や保守負担の観点で有利
- デプロイ: 既存の自動デプロイ設定は今回のローカル調査では見つからなかった(16番)ため、「既存の自動デプロイを維持する」という案Aの利点は、現時点では確認できていない
- Git履歴: 既存の`maroriri-site`は19コミットの調整履歴を持つが、その大半は今回再利用しない旧本文・旧配色に関するものであり、履歴を維持する価値は限定的
- 将来の記事管理: `docs/MARORIRI_CODING_SPEC.md`・`MARORIRI_CODING_WIREFRAME.md`で設計した読みもの機能は、AstroのContent Collectionsを前提に検討してきた経緯があり、Vite+React側でこれを実現するには追加の設計が必要になる

ただし、既存のドメイン接続・GTM/GA4・フォームサービスとの連携が、実は自動化されたデプロイの仕組み(例: 特定のホスティングとGitHubリポジトリが直結している等)に依存している場合、案Bへの切り替えでその自動化が失われる可能性がある。この点は16番・19番のとおり、ユーザーへの確認が必要である。

まだプロジェクトの新規作成・上書きは行っていない。

---

## 14. 既存MARORIRIロゴの確認

`maroriri-site/client/public/assets/img/logo.png`を確認した(読み取りのみ)。

| 項目 | 結果 |
|---|---|
| ファイル名 | `logo.png`(横長版)、`mv__logo.webp`・`mv__logo-sp.webp`(WebP版、PC・スマホ用) |
| 形式 | PNG(1835×349)、WebP(サイズ別) |
| サイズ | 横長のワードマーク版が1835×349。PHP版には650×656という正方形に近いサイズの別バージョンも存在する(シンボルマークのみの版と見られる) |
| 色 | 暗いマルーン(えんじに近い赤茶)と、コーラル寄りの赤(サーモンピンク系)の2色。背景はオフホワイト |
| ロゴ内の文字 | 「MARORIRI」の欧文ワードマーク。丸みのあるジオメトリック・サンセリフ体 |
| マーク | 2つの吹き出し(会話バブル)状の輪郭の中に、向き合う2人の人物シルエットが描かれ、抱き合う・向き合うような構図になっている。「対話」「伴走」を象徴する意匠と見られる |
| 今回の育成事業にも意味が通るか | 部分的に通る。「対話・伴走」という要素は、育成事業の「一緒に考える場」という印象目標(`docs/MARORIRI_CODING_DESIGN_GUIDE.md`2番)と重なる面がある。一方で、輪郭全体が「困りごとを相談する・寄り添う」という relational・カウンセリング的な印象を強く出しており、「コーディングを入口に視野が広がる」という技術的な要素は意匠から読み取れない |
| 墨紫・濃い青紫系へ色変更できるか | 技術的には可能と見られる(2色の単純な塗りのため)。ただし編集可能なベクター形式が見つかっていないため、色置換には画像編集(ラスター上での色域選択等)が必要になる |
| 単色化できるか | 技術的には可能と見られる(同上) |
| SVG等の編集可能な形式 | 確認できない。PNG・WebPのみが見つかった |
| favicon・OGPにも使われているか | favicon(`favicon.png`)は別ファイルとして存在し、ロゴと同一のシンボルマークを使用しているかは個別確認していない。OGP画像(`ogp.jpg`)は`og:image`のURLとして指定されているが、ファイル自体はローカルに見当たらなかった(ビルド前のため、または外部生成のためと考えられる) |

### 3案の比較

| 案 | 評価 |
|---|---|
| 1. そのまま使用する | 色・意匠を変更する手間がないが、「困りごと相談」の relational な印象が残り、`docs/MARORIRI_CODING_DESIGN_GUIDE.md`3番で避けたい印象(スクール的ではないが、技術と無関係な印象)との整合を再検討する必要がある |
| 2. 色や補助文言を変更して使用する | ワードマーク・シンボルの構図自体は流用しつつ、色を墨紫・藍系に変更し、「MARORIRI」の下に育成事業を示す補助文言を添える案。ベクター形式がないため、色変更の作業はやや手間がかかる |
| 3. ワードマークから作り直す | `docs/MARORIRI_CODING_DESIGN_GUIDE.md`8番で検討した案A(文字だけのワードマーク)の考え方に近い。既存デザインへの依存がなくなる分、事業内容との整合は取りやすいが、後述のドメイン・ブランド認知の連続性という点では、既存ロゴをゼロから作り直すことの是非をユーザーに確認する必要がある |

ロゴをそのまま採用するかどうかは、今回決定しない。

---

## 15. 計測・フォーム

### K-SNAPSTEP

| 項目 | 設置箇所 |
|---|---|
| GTM `GTM-TXFRNQ3` | 実装1(本来面目)・実装2(`kーsnapstep/ksnapstep`)の両方に、`index.html`・`labo/index.html`・`privacy.html`で確認 |
| formrun | 両実装の`labo/index.html`に埋め込み |

### MARORIRI

| 項目 | 確認結果 |
|---|---|
| GTM | PHP版・Vite版の両方に同一のコンテナIDが設置されている(識別情報の存在のみ確認。値はここでは複製しない) |
| GA4 | PHP版・Vite版の両方に同一のプロパティIDが設置されている(同上) |
| フォーム | PHP版は`mail.php`によるサーバー処理、Vite版はFormspree(外部サービス)。両者は異なる仕組みを使っている |

### 整理

| 論点 | 内容 |
|---|---|
| 今回の新サイトで引き継げるか | GTM・GA4は技術的には引き継げる(同一IDをAstroサイトにも設置するだけ)。フォームはFormspreeを継続するかformrunへ統一するかの判断が必要(`docs/DUAL_SITE_TECH_PLAN.md`17番と同じ論点) |
| 新しい事業内容に合わせてフォーム項目変更が必要か | 必要。現行のFormspreeフォームは旧・相談業向けの項目と見られ、`docs/MARORIRI_CODING_DESIGN_GUIDE.md`25番の項目(現在の仕事内容・使用技術等)への作り替えが要る |
| K-SNAPSTEPと分離して計測できるか | できる。MARORIRIはすでにK-SNAPSTEPとは別のGTM・GA4を持っており、分離自体は達成済みの状態にある |
| 現在の送信先や通知先をユーザーが確認する必要があるか | 必要。Formspreeの通知先メールアドレス、`mail.php`の送信先等は、いずれもローカルファイルの調査だけでは安全に確認できないため、ユーザー自身による確認を推奨する |

---

## 16. デプロイ方法の手掛かり

| 確認項目 | K-SNAPSTEP(両実装) | MARORIRI PHP版 | MARORIRI Vite版 |
|---|---|---|---|
| GitHub Actions | 確認できない | 確認できない | 確認できない |
| Cloudflare Pages | 確認できない | 確認できない | 確認できない |
| Netlify | 確認できない | 確認できない | 確認できない |
| Vercel | 確認できない | 確認できない | 確認できない |
| GitHub Pages(CNAME等) | 確認できない | 確認できない | 確認できない |
| FTP・SFTP | 確認できない | 確認できない | 確認できない |
| レンタルサーバーの手掛かり | 確認できない | 確認できない | 確認できない |
| Manus | 該当なし | 該当なし | READMEの記述・専用Viteプラグイン(`vite-plugin-manus-runtime`)・`manus-upload-file`等の記述から、Manusというツールを使って構築されたことは確認できるが、Manus自体がホスティング・デプロイまで担っているかは確認できない |
| その他の自動デプロイ | 確認できない | 確認できない | 確認できない |
| ビルドコマンド | 該当なし(静的サイト) | 該当なし | `vite build`+`esbuild`(`package.json`で確認済み) |
| 公開ディレクトリ | 確認できない | 確認できない | `dist/public`と推定されるが、実際の公開設定は確認できない |
| 環境変数 | 確認できない | 確認できない | `.env`ファイルは見つからなかった |

**確認方法の提示**: いずれの実装についても、デプロイ方法を示すファイルはローカルには見つからなかった。確定するには、次のいずれかの方法でユーザーに確認する必要がある。

- 各ドメインの管理画面(レジストラ・DNS設定)を確認する
- GitHubリポジトリの設定(Webhooks・連携サービス)を確認する
- 実際にホスティング事業者の管理画面へログインして確認する
- Manusのアカウント・プロジェクト管理画面を確認する(Vite版がManus経由で公開されている場合)

---

## 17. 推奨する正式構成

### K-SNAPSTEP

| 項目 | 内容 |
|---|---|
| 正式なソース候補 | `/Users/macbook/Desktop/kーsnapstep/ksnapstep/` |
| Gitリポジトリ | `https://github.com/mk-kata/k-snapstep.git` |
| 今後の作業場所 | このリポジトリを起点に、`docs/DUAL_SITE_TECH_PLAN.md`10番の案B(親フォルダー内に独立したAstroプロジェクト)を検討する |
| 既存本番ファイルとの関係 | 6番のとおり、実装2は本番より新しい可能性のある変更(note.comのリンク先変更等)を含むため、実装2をそのまま「現在の本番」と同一視せず、反映状況をユーザーに確認したうえで扱う |
| Astroへ移行するかを次に判断するための条件 | (1)実装2の内容が実際に本番へ反映されているかの確認、(2)デプロイ方法(16番)の確認、(3)`docs/KSNAPSTEP_SITE_SPEC.md`等の新仕様との統合方針の確定 |

### MARORIRI

| 項目 | 内容 |
|---|---|
| 正式なソース候補 | 判断保留。10番の照合結果から、現在の公開内容は`maroriri-site`(Vite・React版)に近いと考えられるが、13番のとおり技術構成自体は新しいAstroプロジェクトへ移行する案(案B)を推奨する |
| Gitリポジトリ | 参照元としては`https://github.com/mk-kata/maroriri-site.git`(ロゴ・計測・フォーム情報の移行元) |
| 今後の作業場所 | 新規Astroプロジェクトを、K-SNAPSTEPと同じ親フォルダー配下に作ることを検討する(`docs/DUAL_SITE_TECH_PLAN.md`10番) |
| 既存公開サイトとの関係 | 新サイト公開までは、既存の`maroriri-site`ベースの内容が公開され続ける前提で計画する |
| 新規Astroか既存Vite・React改修かを次に判断するための条件 | (1)既存のドメイン接続・デプロイの仕組みが自動化されているかの確認(16番)、(2)既存ロゴ・GTM/GA4・フォームの移行方針の確定(11・14・15番)、(3)公開停止・切り替えのタイミングの調整 |

---

## 18. 実装前の保護

正式実装元が決まった後、実装に着手する前に行うべきこと(今回は未実施)。

- 各フォルダー(実装1〜4すべて)のバックアップ(ローカルコピー、または追加のGitタグ付け)
- 各リポジトリの`git status`の確認(未コミット変更がないことの再確認)
- 各リポジトリの最新コミットの確認(作業開始時点の状態を記録)
- リモートとの同期状態確認(`git fetch`で最新化してから作業を始める)
- 作業用ブランチの作成(`main`を直接編集しない)
- 秘密情報の除外確認(`.gitignore`の整備、既存ファイルに認証情報が含まれていないかの確認)
- 現在の公開内容のスクリーンショットまたは記録(K-SNAPSTEP・MARORIRIとも、切り替え前の状態を残す)
- フォーム送信先の確認(formrun・Formspree・`mail.php`のいずれも、通知先が現在も有効かをユーザーが確認する)
- GTM・GA4の確認(コンテナ・プロパティへのアクセス権限がある状態かを確認する)
- 復旧手順の確認(問題が発生した場合、どの時点のバックアップに戻すかをあらかじめ決めておく)

今回はこれらを実行していない。

---

## 19. ユーザーへ確認が必要な事項

優先順位順に整理する。

1. `maroriri.com`の運営に、`maroriri-site`(Vite・React版、Manus経由)を継続して使う前提でよいか。既存のデプロイ経路(自動化されているか)を確認できるか
2. K-SNAPSTEP実装2(`kーsnapstep/ksnapstep`)に含まれる、note.comのリンク先変更(`uranai_blender`)・OGP/JSON-LD/sitemap追加は、まだ本番へ反映されていない「準備中の変更」なのか、それとも別の理由で本番と差異があるのか
3. MARORIRIの既存ロゴ(14番)を、色変更のうえ継続利用するか、作り直すか
4. MARORIRIの既存GTM(`GTM-PHZPSBCR`)・GA4(`G-RP0WMKED0F`)・Formspreeを継続利用するか
5. `mail.php`(PHP版)・Formspree(Vite版)双方の現在の送信先・通知先を、ユーザー自身で確認できるか
6. K-SNAPSTEP・MARORIRIの各ドメインについて、実際のホスティング事業者・デプロイ方法(16番)
7. `maroriri`(PHP版)は完全に廃止してよいか、それとも一部の内容(フォーム構造等)を参考として残す必要があるか
8. Manusというツールを今後も使い続けるか、Astroへ完全移行するか

---

## 20. 未確定事項

- 本番の`k-snapstep.com`・`maroriri.com`それぞれの実際のホスティング事業者
- 両ドメインの実際のデプロイ方法(自動か手動か)
- K-SNAPSTEP実装2の変更が本番へ反映済みかどうか
- MARORIRIの既存ロゴを採用するか、色変更するか、作り直すか
- MARORIRIのフォームサービス(Formspree継続かformrun統一か)
- MARORIRIのGTM・GA4を継続利用するか新規発行するか
- MARORIRI PHP版を廃止するか、一部参考にするか
- Astroの正式採用(K-SNAPSTEP・MARORIRIとも)
- 実際の新規プロジェクト作成場所
- 会員管理・決済・予約機能(MARORIRI)
- MARORIRIの正式なキャッチコピー・月額活動の正式名称

---

## 21. 次の作業

1. 19番のユーザー確認事項への回答取得
2. K-SNAPSTEP・MARORIRIそれぞれのデプロイ方法の確定
3. 正式実装元をもとにした、2つのAstro作業環境の作成(`docs/DUAL_SITE_TECH_PLAN.md`10番)
4. K-SNAPSTEPトップページのデザイン作成
5. MARORIRIトップページのデザイン作成(既存ロゴ・配色の扱いが確定してから着手)
6. 実装

いずれも今回はまだ着手していない。
