// K-SNAPSTEP 読みもの機能 Content Collections
//
// docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 14番の初期項目案(title・description・publishedDate・
// updatedDate・draft・relatedArticles・serviceLink・serviceLinkText)を初期必須項目として維持する。
// 今回の読みもの基盤実装にあわせ、slug・introduction・seriesを追加した
// (docs/KSNAPSTEP_PAGES_IMPLEMENTATION.md「Content Collections」参照)。
// 今回さらに、表示確認用サンプル記事をArticle構造化データ・indexの対象から外すための
// sampleフラグを追加した(docs/KSNAPSTEP_LAUNCH_FOUNDATION.md 12・13番参照)。
// 初期必須にしない項目(thumbnail・category・tag・読了時間・複雑な著者情報)は、今回も定義しない。
//
// Astroの現在の推奨方法(Content Layer API、`glob`ローダー)に沿って
// プロジェクト直下の `src/content.config.ts` に定義する(`src/content/config.ts` は使用しない)。

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** シリーズ。公開初期は「小さな会社のホームページ見直しノート」1本のみ(docs/KSNAPSTEP_SITE_SPEC.md 8番) */
    series: z.enum(["website-review"]).default("website-review"),
    /** 記事URLのslug。省略時はファイル名(Content Layer APIのid)を使用する */
    slug: z.string().optional(),
    /** 導入文。省略時はdescriptionを導入文としても使用する */
    introduction: z.string().optional(),
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(false),
    /** 表示確認用のサンプル記事かどうか。trueの場合、noindexにしArticle構造化データを出力しない */
    sample: z.boolean().default(false),
    relatedArticles: z.array(z.string()).default([]),
    serviceLink: z.string().optional(),
    serviceLinkText: z.string().optional(),
  }),
});

export const collections = { articles };
