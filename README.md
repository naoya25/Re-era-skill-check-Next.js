## 概要

- Todo アプリの作成
- 開発環境
- Next.js (v13.5 以上), React, TypeScript
- mantine, tailwind などのコンポーネントライブラリは自由
- API は dummyJSON (https://dummyjson.com/docs/todos) を使用
- 開発目安期間: 1 週間

## 備考

- コーディング課題完了後、**Public にした**GitHub リポジトリのリンクを共有してください。面接から 2 週間経っても共有がなされない場合、辞退したものとみなします。
- コーディング課題の結果、採用となった場合、入社後にレビューをすることも可能です。
- 実装できなかった部分があった場合には、リポジトリの README にその旨を記載してください。

## 制約

- ロジック面 (Next.js)
- App Router を用いる
- UI 面
- コンポーネント化をして可読性と可用性を高める
- Hooks を用いて動的な UI を作成する
- mantine, tailwind などを用いてデザインを行う

## 要件 (ページごと)

- ユーザー ID を指定するページ : 完了 http://localhost:3000/user/register
- Todo 一覧ページ : 完了 http://localhost:3000/todo
- 指定されたユーザー ID の Todo を取得 : 完了 http://localhost:3000/user/[userId]
- Todo 完了、完了の取り消し : 完了 http://localhost:3000/todo
- Todo 削除 : 完了 http://localhost:3000/todo/edit/[todoId]
- Todo 追加 : 完了 http://localhost:3000/todo/add

## Getting Started

vercel deploy

> https://re-era-skill-check-next-js.vercel.app/

```bash
npm run dev
```

## ディレクトリ

```
./src
├── app           : ページの表示用
├── components
│   ├── base      : 共通で使う共通コンポーネント
│   ├── features  : ページの実体
│   └── ui        : デザイン用コンポーネント
├── hooks         : 共通で使う関数（userの情報）
├── styles        : CSS（ローディング画面のcssのみ、その他tailwind）
├── types         : 型定義
└── utils         : 共通で使う関数
```

## メモ

- api 関連は全て dummy で、実際に投稿や編集ができるわけではない
- ユーザ画像の投稿、表示は未実装
