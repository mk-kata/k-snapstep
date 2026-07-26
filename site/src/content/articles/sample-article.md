---
title: "【サンプル記事】これはContent Collections動作確認用のダミー記事です"
description: "本番記事ではありません。Astroのcontent.config.tsが正しく記事を読み込めるかを確認するためだけのサンプルです。"
series: "website-review"
introduction: "本番記事ではありません。draft: true の記事が一覧・詳細に表示されないことを確認するためのサンプルです。"
publishedDate: 2026-01-01
draft: true
sample: true
relatedArticles: []
serviceLink: "/"
serviceLinkText: "（仮）トップページへ"
---

# これはサンプル記事です

このファイルは「小さな会社のホームページ見直しノート」の実際の記事ではありません。
Astroの Content Collections(`src/content.config.ts`)が正しく記事データを読み込めるかどうかを
確認するためだけに作成した、動作確認用のダミー記事です。

`draft: true` を設定しているため、公開判定のフィールドが機能することもあわせて確認できます。

本文・一覧ページ・詳細ページの本格実装は、次の工程で行います。
