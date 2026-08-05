# K-SNAPSTEP・MARORIRI 実装方針決定書

`docs/IMPLEMENTATION_SOURCE_AUDIT.md`・`docs/DUAL_SITE_TECH_PLAN.md`・`docs/BRAND_RESTRUCTURE_PLAN.md`・`docs/KSNAPSTEP_SITE_SPEC.md`・`docs/KSNAPSTEP_WIREFRAME.md`・`docs/KSNAPSTEP_DESIGN_GUIDE.md`・`docs/MARORIRI_CODING_SPEC.md`・`docs/MARORIRI_CODING_WIREFRAME.md`・`docs/MARORIRI_CODING_DESIGN_GUIDE.md`・`docs/MARORIRI_WORK_LOG.md`(全10件、いずれも存在を確認済み)を読んだうえで作成しています。`docs/IMPLEMENTATION_DECISIONS.md`は今回新規作成です。

本資料は、`docs/IMPLEMENTATION_SOURCE_AUDIT.md`の調査結果を比較・検討する段階から、正式方針を確定する段階へ進めるためのものです。今回はコード・Git・ファイル・設定・本番サイトのいずれも変更していません。

---

## 1. 決定資料の目的

`docs/IMPLEMENTATION_SOURCE_AUDIT.md`で行った調査(K-SNAPSTEP・MARORIRIそれぞれの実装候補の比較)を踏まえ、以後の作業の土台となる次の3点を正式に確定する。

1. K-SNAPSTEPの正式実装元
2. MARORIRIの新規実装方針(既存実装の扱いを含む)
3. 実装開始前に守るべき保護の原則

以後の資料(`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`等)は、本資料の決定を前提として作成する。

---

## 2. K-SNAPSTEPの正式実装元

**正式実装元は次のフォルダーとする。**

`/Users/macbook/Desktop/kーsnapstep/ksnapstep/`(指示にあったパス`../kーsnapstep/ksnapstep/`と一致することを確認済み)

### 理由

- Git管理されている
- GitHubリポジトリ(`https://github.com/mk-kata/k-snapstep.git`)と連携している
- 未コミット変更がない(`git status`クリーン、`origin/main`と同期済み)
- OGPが実装されている
- JSON-LDが実装されている
- `sitemap.xml`が存在する
- testimonials等、現在の作業フォルダー(`本来面目`)より内容が進んでいる
- 今後の変更履歴を残せる
- 復旧や比較が行いやすい

現在の「本来面目」フォルダー内のK-SNAPSTEP相当ファイルは、正式実装元にはしない。ただし、既存資料や現在の本番内容を比較するための参照元として、**削除せず残す**。

---

## 3. K-SNAPSTEP本番との差分

現在公開中のK-SNAPSTEPと、正式実装元候補には一部差がある(`docs/IMPLEMENTATION_SOURCE_AUDIT.md`5・6番で確認済み)。

確認されている例:

| 項目 | 本番または実装1(本来面目) | 正式実装元候補 |
|---|---|---|
| note.comへのリンク先 | `unki_guide` | `uranai_blender` |

### この差の扱いに関する原則

- Git側の内容を、そのまま現在の本番へ上書きしない
- 現在の公開内容とGit側を、ページ・機能ごとに比較する
- 今回確定したK-SNAPSTEP仕様書(`docs/KSNAPSTEP_SITE_SPEC.md`等)を最優先にする
- 占いはココナラへ移す方針のため、旧noteリンク(`unki_guide`・`uranai_blender`のいずれも)を新サイトに残すかは別途確認する
- 旧「本来面目らぼ」の本文・ロゴ・リンクは、新仕様へ合わせて整理する
- 本番未反映の変更がある可能性を前提にする

---

## 4. K-SNAPSTEPの技術方針

Astroへ移行する方針は、有力候補として維持する。ただし、次の順序で進める。

1. 正式実装元をバックアップする
2. Gitの状態を記録する
3. 現在のmainまたは既定ブランチを保護する
4. 作業用ブランチを作成する
5. 既存静的サイトと新仕様の差分を整理する
6. Astroを同一リポジトリ内に作るか、新規リポジトリにするか最終判断する
7. 新サイトを別の作業領域で構築する
8. 現在の本番サイトへは公開時まで触れない

Astroの実際の作成は、今回は行わない。

---

## 5. MARORIRIの既存実装

現在公開中のMARORIRIに最も近い実装は、次のフォルダーである(`docs/IMPLEMENTATION_SOURCE_AUDIT.md`10番の照合結果より)。

`/Users/macbook/Desktop/kーsnapstep/maroriri-site/`(指示にあったパス`../kーsnapstep/maroriri-site/`と一致することを確認済み)

この実装の特徴:

- Vite・React
- Git管理
- 19コミット
- Manusによる構築の形跡
- 既存GTM・GA4
- 既存フォーム(Formspree)
- 現在公開中のtitleと一致
- MARORIRIロゴが存在

ただし、現在の内容は「Webまわりの困りごとを一緒にほどく」という旧事業構想であり、今回確定した「コーディングを入口に、Webの現場を見渡せる人を育てる」コーダー育成事業とは一致しない。

---

## 6. MARORIRIの新規実装方針

新しいMARORIRIは、既存Vite・React版の本文やデザインを改修して作るのではなく、**新規Astroプロジェクトとして構築する。**

### 正式方針

- 既存`maroriri-site`は旧サイト・本番復旧用として保存する
- 既存リポジトリを直接全面改修しない
- 新しいAstroプロジェクトを別フォルダーで作る
- 新しいMARORIRIは新しいGitリポジトリで管理する
- 新サイト完成後に`maroriri.com`の公開先を切り替える
- 公開切り替え方法が確認できるまでは、現在の本番サイトを変更しない

### 新規Astroプロジェクトの仮フォルダー名候補

`maroriri-coding-site`

実際のフォルダーは、今回は作成しない。

---

## 7. MARORIRIで引き継ぐもの

次を引き継ぎ候補とする。

- `maroriri.com`のドメイン
- 既存GTM
- 既存GA4
- 既存フォームサービスの契約・識別情報
- 現在のデプロイ方法に関する情報
- 必要に応じてfavicon・OGP設定
- 利用できるレスポンシブやアクセシビリティの考え方

### 実際に引き継ぐ前に確認すること

- GTM・GA4の管理権限
- 現在の計測対象
- フォームの通知先
- フォームの送信先
- 現在の利用規約やプライバシーポリシー
- 現在のホスティング
- デプロイ経路

---

## 8. MARORIRIで引き継がないもの

次は原則として新サイトへ引き継がない。

- 旧トップページ本文
- 「Webまわりの困りごと」という旧コンセプト
- 旧サービス構成
- 法人・事業者向けの表現
- オレンジ・グリーンの配色
- 旧CASE事例
- 旧ページ構成
- 育成事業と関係しない画像
- 現在のVite・Reactコンポーネントを前提とした全面改修

汎用コンポーネントを再利用する場合も、新しいAstro設計へ無理に持ち込まない。

---

## 9. MARORIRIロゴの扱い

既存ロゴの構成(`docs/IMPLEMENTATION_SOURCE_AUDIT.md`14番で確認済み):

- 「MARORIRI」のワードマーク
- 対話する2人を思わせる吹き出しシンボル
- マルーン・コーラル系
- PNG・WebP
- SVGなし

このロゴは、旧「困りごと相談」の意味が強いため、今回の育成事業用としてそのまま正式採用しない。

### 現段階の方針

- 新サイト構築時は文字だけの仮ワードマークを使用する
- 既存ロゴは参考資料として保存する
- 正式ロゴはトップページデザイン確認後に判断する
- 既存ロゴの色変更だけで対応するか、新規作成するかは未確定
- 既存画像ファイルは削除・変更しない

---

## 10. 2サイトのGit管理

### K-SNAPSTEP

既存Gitリポジトリを継続して使用する。

正式実装元: `/Users/macbook/Desktop/kーsnapstep/ksnapstep/`

### MARORIRI

新しい育成事業サイトは、新規Gitリポジトリで管理する。既存`maroriri-site`のGitリポジトリは、旧サイトの履歴として保存する。

### 共通原則

- 2サイトを同じGitリポジトリに入れない
- 親フォルダー全体も、無理に1つのGitリポジトリにしない

---

## 11. 正式な作業場所

### K-SNAPSTEP

正式実装元: `/Users/macbook/Desktop/kーsnapstep/ksnapstep/`

実際の実装時は、このリポジトリを保護したうえで作業ブランチを作成する。Astroを既存リポジトリ内に作るか、新しい並列フォルダーに作るかは、次の工程で決定する。

### MARORIRI

旧サイト保存元: `/Users/macbook/Desktop/kーsnapstep/maroriri-site/`

新サイト作業場所の仮案: `../kーsnapstep/maroriri-coding-site/`

または、2サイトをまとめる親フォルダーを新設する場合は、その配下に独立プロジェクトとして置く。

まだフォルダーは作成しない。

---

## 12. 構築順序

次の順序を正式方針とする。

1. K-SNAPSTEP正式実装元の保護
2. K-SNAPSTEPの本番との差分確認
3. K-SNAPSTEPのAstro移行方法決定
4. K-SNAPSTEPの新サイト構築
5. K-SNAPSTEPの確認環境作成
6. K-SNAPSTEP公開
7. MARORIRI既存本番とデプロイ経路の確認
8. MARORIRI新規Astroプロジェクト作成
9. MARORIRIの新サイト構築
10. MARORIRIの確認環境作成
11. MARORIRI公開

K-SNAPSTEPを先に進める。2サイトを同時に公開する必要はない。

---

## 13. 実装開始前の保護

正式実装元が決まった後、実装に着手する前に行うこと(今回は未実施)。

### K-SNAPSTEP

- フォルダー全体のバックアップ
- `git status`
- 現在のブランチ
- 最新コミット
- リモートとの差分
- タグまたは保護用ブランチ
- 作業用ブランチ
- 本番公開内容の記録
- formrunの送信確認
- GTMの計測確認
- 復旧用ファイルの保存

### MARORIRI

- 既存PHP版のバックアップ
- 既存Vite・React版のバックアップ
- 各Git状態の記録
- 現在公開中のページ記録
- 現在のロゴ・favicon・OGP保存
- GTM・GA4の確認
- フォーム送信先・通知先確認
- 公開・デプロイ経路確認
- 復旧方法の記録

今回は、これらを実行しない。

---

## 14. デプロイ方法が不明な場合

現在、K-SNAPSTEPとMARORIRIのデプロイ方法は確認できていない(`docs/IMPLEMENTATION_SOURCE_AUDIT.md`16番)。

### この状態でも進められること

- ローカルでの新サイト構築
- Git管理
- デザイン確認
- ローカルビルド
- プレビュー環境への配置
- ページ・フォーム以外の表示確認

### 公開前までに必ず確認すること

- ホスティング会社
- 公開ディレクトリ
- FTP・SFTP
- Git連携
- Manusによる自動公開の有無
- DNS
- SSL
- リダイレクト
- フォーム
- GTM・GA4

デプロイ方法が不明なことを理由に、新サイトの設計・ローカル構築を止める必要はない。ただし、本番公開や既存リポジトリの上書きは行わない。

---

## 15. 現時点で確定したこと

- K-SNAPSTEPの正式実装元は`../kーsnapstep/ksnapstep/`
- K-SNAPSTEPは既存Gitリポジトリを継続使用する
- MARORIRIは新規Astroプロジェクトとして作り直す(既存Vite・React版の改修ではない)
- 既存`maroriri-site`は旧サイト・復旧用として保存し、履歴として維持する
- MARORIRIは新規Gitリポジトリで管理し、既存リポジトリとは分離する
- 2サイトを同じGitリポジトリ・同じ親リポジトリにしない
- 新サイト構築時のMARORIRIロゴは文字だけの仮ワードマークとする
- 既存MARORIRIロゴ・既存ファイルは削除・変更せず保存する
- 構築順序はK-SNAPSTEPを先行させる
- デプロイ方法が不明でも、ローカル構築・デザイン確認は進めてよい

---

## 16. 引き続き未確定のこと

- K-SNAPSTEP実装元の変更が本番へ反映済みかどうか
- 旧noteリンク(`unki_guide`・`uranai_blender`)を新サイトに残すか
- K-SNAPSTEP・MARORIRIそれぞれの実際のホスティング・デプロイ方法
- MARORIRIの既存GTM・GA4・フォームサービスを実際に引き継ぐかどうか(引き継ぐ前の確認事項が残っている)
- MARORIRIの正式ロゴ(色変更か新規作成か)
- Astroを既存K-SNAPSTEPリポジトリ内に作るか、新しい並列フォルダーに作るか
- MARORIRI新サイトの実際の作業フォルダー名・場所
- 会員管理・決済・予約機能(MARORIRI)
- MARORIRIの正式なキャッチコピー・月額活動の正式名称

---

## 17. 次に行う作業

次は、K-SNAPSTEP正式実装元について、実装開始前の状態確認と、新仕様との差分一覧を作成する。

資料案: `docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`

内容:

- 現在の正式実装元のページ
- 現在本番との差分
- 新仕様との差分
- 再利用するコード・機能
- 削除・廃止する旧内容
- 新規に作るページ
- Astro移行案
- 実装順序

まだバックアップ・Git操作・コード変更は行わない。
