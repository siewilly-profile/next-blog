# 南宫有栖 Blog

以古風視覺為主題的個人網站，已遷移至 Next.js App Router + TypeScript + Tailwind。內容以 Markdown frontmatter 管理，支援文章搜尋、標籤、分頁、Giscus 留言與 GoatCounter 瀏覽統計（可選）。

## 專案摘要

- 部署方式：Vercel
- 技術堆疊：Next.js + TypeScript + Tailwind CSS
- 內容來源：Markdown + frontmatter（不再依賴 `posts.json`）
- Markdown 解析：`marked` + Highlight.js + KaTeX
- 留言系統：giscus（可選）
- 瀏覽統計：GoatCounter（可選）

## 主要路由

- `/`：首頁
- `/blog`：部落格列表
- `/blog/[slug]`：部落格文章
- `/solution`：题解分類
- `/solution/[category]`：题解列表
- `/solution/[category]/[slug]`：题解文章
- `/about`：關於
- `/friend`：友鏈

## 內容結構

```text
posts/
├─ blog/
│  ├─ s1.md
│  └─ s2.md
├─ solution/
│  ├─ APCS/
│  └─ Zerojudge/
├─ about/
│  └─ about.md
└─ friend/
   └─ friend_page.md
```

## Frontmatter 格式

每篇 Markdown 檔案頂部需要 frontmatter：

```yaml
---
title: "文章標題"
slug: "my-post"
date: "2026-04-11"
description: "文章摘要"
tags:
  - "tag1"
  - "tag2"
category: "APCS" # 仅题解文章需要
---
```

欄位說明：

- `title`：標題，必填
- `slug`：路由用 slug，必填
- `date`：日期，格式 `YYYY-MM-DD`，必填
- `description`：摘要，選填
- `tags`：標籤陣列，選填
- `category`：题解類別，选填

## 本地開發

```bash
npm install
npm run dev
```

## 設定檔策略

- 可在 `.env` 或 `env.public.json` 設定 giscus 與 GoatCounter。
- `env.public.json` 會在 build 時讀取，內容視為公開設定。

### giscus（可選）

必要欄位：

- `GISCUS_ENABLED=true`
- `GISCUS_REPO`
- `GISCUS_REPO_ID`
- `GISCUS_CATEGORY`
- `GISCUS_CATEGORY_ID`

### GoatCounter（可選）

- `ENGAGEMENT_ENABLED=true`
- `ENGAGEMENT_ENDPOINT=https://your.goatcounter.com/count`

## 靜態資產

圖片放在 `public/images/`，在 Markdown 或 JSX 中使用 `/images/...` 取用。

## 舊版檔案

原本的 HTML/JS/CSS 仍保留在根目錄（`index.html`、`pages/`、`js/`、`styles/`）作為參考，但已不再由 Next.js 使用。

# 紀念
4/12 我發現了我的網站 API 在裸奔，現在收起來了耶