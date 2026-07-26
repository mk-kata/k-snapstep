// K-SNAPSTEP サイト共通設定
//
// 参照元: docs/KSNAPSTEP_SITE_SPEC.md・docs/KSNAPSTEP_WIREFRAME.md・docs/KSNAPSTEP_LAUNCH_FOUNDATION.md
//
// 【重要】本番URL・MARORIRIのURL・各ページの仮URLはいずれも仕様書上の候補・暫定値であり、
// 最終確定ではない(docs/KSNAPSTEP_SITE_SPEC.md 24番・docs/KSNAPSTEP_WIREFRAME.md 25番参照)。
//
// note・ココナラ・本来面目noteへのリンクは、今回この共通設定に含めない
// (docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 6番の方針どおり、占い・本来面目noteはK-SNAPSTEPの主要導線にしない)。
//
// 環境変数(すべて PUBLIC_ 接頭辞、.env.example参照。秘密情報は含まない):
// - PUBLIC_SITE_URL    本番/ステージングのURL。未設定時は本番候補URLを既定値とする
// - PUBLIC_SITE_ENV    "production" | "staging" | 未設定(開発)。production以外は既定でnoindex
// - PUBLIC_GTM_ID      GTMコンテナID。未設定時は既存の GTM-TXFRNQ3 を既定値とする
// - PUBLIC_ENABLE_GTM  "true" のときのみGTMを出力する(既定は無効。二重計測・開発環境での誤計測を避ける)
// - PUBLIC_ENABLE_FORM "false" のときのみformrunの実埋め込みを無効化し、代替表示にする(既定は有効)

const rawSiteEnv = import.meta.env.PUBLIC_SITE_ENV;
export const siteEnv: "production" | "staging" | "development" =
  rawSiteEnv === "production" ? "production" : rawSiteEnv === "staging" ? "staging" : "development";
export const isProduction = siteEnv === "production";

/** production以外(staging・development)は既定でnoindex・robots拒否とする(公開事故防止) */
export const shouldIndex = isProduction;

export const site = {
  name: "K-SNAPSTEP",
  tagline: "小さな会社の外部Web担当者",
  owner: "片山まゆみ",
  /** 本番/ステージングURL。PUBLIC_SITE_URLが未設定の場合は本番候補URLを既定値とする(候補のまま、最終確定ではない) */
  url: (import.meta.env.PUBLIC_SITE_URL as string | undefined) || "https://k-snapstep.com",
  lang: "ja",
  defaultTitle: "K-SNAPSTEP ｜ 小さな会社の外部Web担当者",
  defaultDescription:
    "K-SNAPSTEPは、専任のWeb担当者がいない小さな会社や事業者のための外部Web担当者です。今の状況を確認し、次にすることを整理します。",
} as const;

/** GTM(Googleタグマネージャー)設定。ID自体は秘密情報ではないが、直書き箇所を1箇所にまとめる */
export const gtm = {
  id: (import.meta.env.PUBLIC_GTM_ID as string | undefined) || "GTM-TXFRNQ3",
  /** 既定は無効。本番ビルド時にPUBLIC_ENABLE_GTM=trueを明示した場合のみ出力する */
  enabled: import.meta.env.PUBLIC_ENABLE_GTM === "true",
} as const;

/**
 * formrun(既存お問い合わせフォーム、正式実装元 labo/index.html から確認した値をそのまま使用)。
 * フォーム識別情報・送信先は変更していない(docs/KSNAPSTEP_LAUNCH_FOUNDATION.md 6・7番参照)。
 */
export const formrun = {
  formId: "@katakatakatta-mqyYhpSlQDdonbwMtxia",
  embedScriptUrl: "https://sdk.form.run/js/v2/embed.js",
  redirect: true,
  /** 既定は有効。PUBLIC_ENABLE_FORM=falseの場合のみ実埋め込みを無効化し、代替表示にする */
  enabled: import.meta.env.PUBLIC_ENABLE_FORM !== "false",
} as const;

/** 固定ページの仮URL(docs/KSNAPSTEP_SITE_SPEC.md 21番の候補) */
export const urls = {
  home: "/",
  oneDayWebManager: "/one-day-web-manager/",
  monthlySupport: "/monthly-support/",
  services: "/services/",
  profile: "/profile/",
  reading: "/reading/",
  contact: "/contact/",
  privacy: "/privacy.html",
} as const;

/** グローバルナビ通常5項目(docs/KSNAPSTEP_SITE_SPEC.md 9番・docs/KSNAPSTEP_WIREFRAME.md 4番) */
export const mainNav = [
  { label: "1日WEB担当者", href: urls.oneDayWebManager },
  { label: "月額Web担当サポート", href: urls.monthlySupport },
  { label: "対応できること", href: urls.services },
  { label: "読みもの", href: urls.reading },
  { label: "片山まゆみについて", href: urls.profile },
] as const;

/** 独立CTA(通常ナビと区別する。docs/KSNAPSTEP_SITE_SPEC.md 9番) */
export const contactCta = { label: "お問い合わせ", href: urls.contact } as const;

/**
 * MARORIRIへの外部リンク(候補)。
 * K-SNAPSTEPサイト内では主要サービスの一つとして大きく扱わず、
 * フッター・プロフィールページの補助導線にとどめる
 * (docs/KSNAPSTEP_SITE_SPEC.md 20番・docs/KSNAPSTEP_WIREFRAME.md 22番)。
 * URLが確定している場合の候補として https://maroriri.com/ を使用する。
 */
export const maroriri = {
  url: "https://maroriri.com/",
  isExternal: true,
} as const;

/** コピーライト表記 */
export const copyright = `© ${site.name}` as const;
