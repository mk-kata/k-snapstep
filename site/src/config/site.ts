// K-SNAPSTEP サイト共通設定
//
// 参照元: docs/KSNAPSTEP_SITE_SPEC.md・docs/KSNAPSTEP_WIREFRAME.md
//
// 【重要】本番URL・MARORIRIのURL・各ページの仮URLはいずれも仕様書上の候補・暫定値であり、
// 最終確定ではない(docs/KSNAPSTEP_SITE_SPEC.md 24番・docs/KSNAPSTEP_WIREFRAME.md 25番参照)。
//
// note・ココナラ・本来面目noteへのリンクは、今回この共通設定に含めない
// (docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 6番の方針どおり、占い・本来面目noteはK-SNAPSTEPの主要導線にしない)。

export const site = {
  name: "K-SNAPSTEP",
  tagline: "小さな会社の外部Web担当者",
  owner: "片山まゆみ",
  /** 本番URL(候補)。公開方法・ドメイン運用は未確定(docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 未確定事項参照) */
  url: "https://k-snapstep.com",
  lang: "ja",
  defaultTitle: "K-SNAPSTEP ｜ 小さな会社の外部Web担当者",
  defaultDescription:
    "K-SNAPSTEPは、専任のWeb担当者がいない小さな会社や事業者のための外部Web担当者です。今の状況を確認し、次にすることを整理します。",
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
