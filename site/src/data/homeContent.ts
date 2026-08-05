// トップページ デザイン比較用｜共通コンテンツデータ
//
// 参照元: docs/KSNAPSTEP_HOME_DESIGN_OPTIONS.md。
// 既存トップページ(`src/pages/index.astro`・`src/components/home/*.astro`)の確定本文を
// 一字一句そのまま書き写したデータで、デザイン比較用ページ(`/__review/home-design-a/`・
// `/__review/home-design-b/`)からのみ使用する。
//
// 【重要】既存の各ホームコンポーネント(HeroSection.astro等)は変更・参照しておらず、
// 本ファイルはコピーの複製ではなく「デザイン比較専用の読み取り元」として新規に作成した。
// 本文を2箇所に手で複製すると内容がずれる恐れがあるため、比較用の2ページは両方とも
// このファイルだけを参照する(本文の一次情報源は既存トップページのまま)。
//
// 見出し・本文・CTA文言・料金・URLはいずれも既存確定本文と完全に一致させており、
// 今回の作業では変更していない。

export const hero = {
  eyebrow: "K-SNAPSTEP",
  heading: "Webの判断を、社内だけで抱えないために。",
  body: "K-SNAPSTEPは、専任のWeb担当者がいない会社や事業者のための、外部Web担当者です。制作会社に何を頼めばよいか分からない、今のサイトをどうするか決められない。そんなとき、発注する側に立って状況を確認し、次に誰が何をするかを整理します。単発の「1日WEB担当者」と、継続して確認する「月額Web担当サポート」があります。",
  ctaLabel: "今の状況を相談する",
  ctaHref: "/contact/",
  secondaryLabel: "1日WEB担当者を見る",
  secondaryHref: "/one-day-web-manager/",
  aside: [
    { label: "単発", value: "1日WEB担当者" },
    { label: "継続", value: "月額Web担当サポート" },
  ],
};

export const concerns = {
  heading: "このような状態になっていませんか。",
  items: [
    "制作会社に何を頼めばよいか、提案や見積もりが妥当かどうか、判断できない",
    "サイトを直したいが、どこから手をつけるか決められない",
    "古いCMSやECサイトを、このまま使うか移行するか迷っている",
    "サーバー、ドメイン、メールの管理状況が分からない",
    "修正を依頼したが、意図どおりになっているか確認できない",
    "経営者や担当者が、Webの判断まで一人で抱えている",
  ],
};

export const role = {
  heading: "状況を確認し、次にすることを整理します。",
  intro: "K-SNAPSTEPが行うのは、次の整理です。",
  labels: ["現状確認", "問題を分ける", "情報確認", "今/今しない", "担当整理", "次を決める"],
};

export const serviceComparison = {
  heading: "単発と継続、2つの関わり方",
  note: "上位・下位の関係ではありません",
  cards: [
    {
      label: "単発",
      title: "1日WEB担当者",
      priceAmount: "55,000円（税込）",
      priceUnit: "/ 1回",
      facts: ["1テーマ・1サイト", "全国オンライン対応", "WEB担当者メモ + テーマに応じた資料1点", "実施後のフォロー"],
      linkLabel: "1日WEB担当者を見る",
      linkHref: "/one-day-web-manager/",
    },
    {
      label: "継続",
      title: "月額Web担当サポート",
      priceAmount: "月額55,000円（税込）",
      priceUnit: "/ 月",
      facts: ["月2回・各60分のオンライン面談", "判断と進行を継続的に確認", "実作業は別途見積もり"],
      linkLabel: "月額サポートを見る",
      linkHref: "/monthly-support/",
    },
  ],
};

export const topics = {
  heading: "このようなテーマを扱います。",
  items: [
    "サイトの問題点と、改修する順番",
    "制作会社の選定、相見積もりや提案内容の比較",
    "WordPressやMovable Typeをそのまま使い続けるのか、改修するのか、別の仕組みへ移行するのか",
    "ECサイトや複数の販売環境の整理",
    "サーバー、ドメイン、メールの管理状況確認",
    "SEOやアクセス解析をもとにした改善箇所の整理",
  ],
  linkLabel: "1日WEB担当者で相談できることを見る",
  linkHref: "/one-day-web-manager/",
};

export const experience = {
  heading: "Webサイトだけでなく、その周辺まで確認します。",
  body: [
    "Web制作には35年以上関わってきました。制作だけでなく、発注、指示、進行、確認にも携わり、CMS、EC、サーバー、SEO、アクセス解析まで、Webに関わる領域を横断して経験してきました。",
    "一つのツールの知識だけで判断するのではなく、今の環境と運用方法を確認したうえで、必要であれば専門家や制作会社へ何を依頼すればよいかも整理します。",
  ],
  examples: ["WordPress", "Movable Type", "楽天市場やMakeShopなどのEC環境", "サーバー・ドメイン・DNS", "GA4・Search Console"],
  linkLabel: "対応できることを見る",
  linkHref: "/services/",
};

export const workSupport = {
  heading: "必要に応じて、実作業にも対応します。",
  body: "基本は、状況の確認、判断、制作会社や担当者への指示整理です。実作業が必要な場合は、内容と予算を確認したうえで、個別にお見積もりします。CMSの修正、サーバーやドメインの設定、不具合対応など、内容により対応します。",
  linkLabel: "対応できることを見る",
  linkHref: "/services/",
};

export const profileSummary = {
  heading: "片山まゆみについて。",
  body: "銀行や印刷会社での実務を経て、Web制作の仕事に入りました。以来35年以上、制作する側だけでなく、発注や進行を担う側にも関わってきました。現在はその経験を活かし、状況を整理して判断材料をそろえ、制作側へ伝わる形に整える役割を中心にしています。",
  linkLabel: "片山まゆみについて見る",
  linkHref: "/profile/",
};

export const contactCta = {
  heading: "何を頼めばよいか分からない段階でも、ご相談ください。",
  body: "まだ依頼する内容が決まっていなくても構いません。今困っていることをお送りください。内容を確認したうえで、1日WEB担当者と月額サポート、どちらが合うかも含めてご案内します。基本はオンラインでの相談です。内容や地域によっては、訪問での対応も可能です。",
  buttonLabel: "今の状況を相談する",
  url: "/contact/",
};
