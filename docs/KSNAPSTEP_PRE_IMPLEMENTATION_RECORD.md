# K-SNAPSTEP 実装開始前記録

`docs/IMPLEMENTATION_DECISIONS.md`・`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`・`docs/KSNAPSTEP_SITE_SPEC.md`・`docs/KSNAPSTEP_WIREFRAME.md`・`docs/KSNAPSTEP_DESIGN_GUIDE.md`・`docs/DUAL_SITE_TECH_PLAN.md`・`docs/MARORIRI_WORK_LOG.md`を確認したうえで作成しています。

本資料は、正式実装元(`/Users/macbook/Desktop/kーsnapstep/ksnapstep/`)へAstro作業環境(`site/`)を作成する直前の状態を記録するものです。認証情報・フォーム送信先の具体的な値は記載していません(ファイル名のみ記載)。

---

## 1. 記録日時

2026年7月23日

---

## 2. 正式実装元の絶対パス

`/Users/macbook/Desktop/kーsnapstep/ksnapstep/`

---

## 3. 現在のブランチ

`main`

---

## 4. 最新コミットID

`6991d30fc485801338ea017e694310d4522ad165`

---

## 5. 最新コミット日時

2026-05-24 15:32:27 +0900

---

## 6. 最新コミット概要

「feat: PHASE1-3 OGP/JSON-LD/testimonials/相互リンク/sitemap対応」

---

## 7. Gitリモート

`origin` → `https://github.com/mk-kata/k-snapstep.git`(fetch/push とも同一URL)

---

## 8. 作業ツリーの状態

`git status`はクリーン。「On branch main」「Your branch is up to date with 'origin/main'.」「nothing to commit, working tree clean」を確認済み。未コミット変更なし。**リモートからのpull・fetchは行っていない**(ローカルの参照情報のみで確認)。

---

## 9. Node.js・npmのバージョン

- Node.js: `v26.0.0`
- npm: `11.12.1`

---

## 10. ルートファイル一覧

```text
.git/
css/
images/
index.html
js/
labo/
privacy.html
sitemap.xml
test0627/       ← K-SNAPSTEP・MARORIRIと無関係な検証用フォルダー(カレー店デモ)
test_lp2507/    ← K-SNAPSTEP・MARORIRIと無関係な検証用フォルダー(「3res」アーティスト紹介サイト検証用)
```

`package.json`・`.gitignore`は、リポジトリルートに**存在しない**ことを確認した(`ls`で「No such file or directory」)。`site/`ディレクトリも作業開始前の時点では存在しなかった。

---

## 11. 既存HTMLページ一覧(サイト本体)

| ファイル | 想定URL |
|---|---|
| `index.html` | `/` |
| `labo/index.html` | `/labo/` |
| `privacy.html` | `/privacy.html` |

(`test0627/`・`test_lp2507/`内のHTMLは無関係な検証用ファイルのため除外)

---

## 12. 既存CSS・JavaScript一覧

**CSS**: `css/common.css`・`css/style.css`・`css/labo.css`・`css/privacy.css`

**JavaScript**: `js/script.js`・`js/labo.js`

**画像**: `images/`配下22ファイル(ロゴ3種、プロフィール写真、旧活動紹介画像、経歴年表画像、flow-step1〜5、hero-bg、lp-hero-bg、philosophy等)

---

## 13. GTM・formrunが存在するファイル

| 項目 | 設置ファイル | 備考 |
|---|---|---|
| GTM(`GTM-TXFRNQ3`) | `index.html`・`privacy.html` | `grep`で個別確認 |
| GTM | **`labo/index.html`には設置されていない** | `grep -c "GTM-TXFRNQ3" labo/index.html`が`0`件、`GTM`・`googletagmanager`の文字列自体が同ファイルに存在しないことを確認した。**既存の`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`3番・`IMPLEMENTATION_SOURCE_AUDIT.md`の「index.html・labo/index.html・privacy.htmlのいずれにも設置」という記載は誤りであり、本記録で訂正する** |
| formrun | `labo/index.html`・`privacy.html`(記載のみ) | 埋め込みタグは`labo/index.html`、利用に関する説明文は`privacy.html`。埋め込みIDの値そのものはここに複製しない |

---

## 14. 本番との差分があること

`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`5番のとおり、正式実装元と本番公開中サイト(`https://k-snapstep.com/`)の間には、次の差分が確認されている。

- 正式実装元のみに存在: OGP拡張項目(og:image・og:site_name・og:url等)・Twitter Card・canonical・JSON-LD
- 本番のみに存在する可能性がある差異: meta description・ナビゲーションラベル(日本語表記)・トップページ本文の言い回し・noteリンク先の一部(`unki_guide`)
- 一致: title・formrun埋め込みID・GTMコンテナID・`sitemap.xml`の内容・`robots.txt`(どちらも不在)

本番の`index.html`の`last-modified`(2026-07-09)が正式実装元の最新コミット日(2026-05-24)より後であり、本番側が独自に更新されてきた可能性がある(詳細は`docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`5-3番)。

---

## 15. 本番公開方法が未確認であること

- `.github/workflows`・`netlify.toml`・`vercel.json`・`CNAME`等のデプロイ設定ファイルは、正式実装元のリポジトリ内に見つかっていない
- `docs/KSNAPSTEP_IMPLEMENTATION_GAP.md`5-3番の追加調査で、本番の404ページの意匠・レスポンスヘッダーから、**ロリポップ！レンタルサーバー(GMOペパボ株式会社)の可能性が高いという状況証拠**が得られているが、契約情報そのものは未確認
- 正式実装元のコミットが、どのような経路で本番へ反映されるか(自動デプロイか手動アップロードか)は、今回の読み取り調査だけでは確定できない

---

## 16. 復旧時に参照する情報

| 項目 | 内容 |
|---|---|
| 正式実装元のGitリモート | `https://github.com/mk-kata/k-snapstep.git` |
| 復旧用コミット | `6991d30`(本記録作成時点のHEAD) |
| 作業前バックアップ | `docs/KSNAPSTEP_ASTRO_BASE_SETUP.md`に記載するバックアップ先を参照 |
| 作業用ブランチ | `feature/ksnapstep-astro-rebuild`(本記録作成後に作成) |
| 既存ルートファイルの扱い | 今回の作業では移動・削除・書き換えを行わない。変更が疑われる場合は`git diff`・`git status`で正式実装元のルートファイルの無変更を確認する |
| 認証情報を含む可能性のあるファイル | `test0627/.htpasswd`・`test_lp2507/3res/.htpasswd`(いずれも無関係な検証用フォルダー内。内容は確認・複製していない) |

---

## 17. 次の作業

1. 正式実装元をリポジトリ外へバックアップする
2. 作業用ブランチ`feature/ksnapstep-astro-rebuild`を作成する
3. `site/`にAstro初期構成を作成する
4. 作業前後で既存ルートファイルに変更がないことを確認する
5. `docs/KSNAPSTEP_ASTRO_BASE_SETUP.md`として実装報告書を作成する

いずれも本記録作成時点ではまだ着手していない。
