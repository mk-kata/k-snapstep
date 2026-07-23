// K-SNAPSTEP 読みもの機能 Content Collections 最小構成
//
// docs/KSNAPSTEP_IMPLEMENTATION_GAP.md 14番の初期項目案に基づく。
// 初期必須にしない項目(thumbnail・category・tag・読了時間・複雑な著者情報)は、今回定義しない。
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
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(false),
    relatedArticles: z.array(z.string()).default([]),
    serviceLink: z.string().optional(),
    serviceLinkText: z.string().optional(),
  }),
});

export const collections = { articles };
