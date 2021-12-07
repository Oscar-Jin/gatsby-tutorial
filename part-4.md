# Gatsby | Part4. GraphQLを使ったデータのクエリ

## イントロ

第４部と第５部は、データについて学んでいきます。

データを直接コンポーネント内で扱うこと以外にも、MarkdownやCMSを使ってデータを管理する方法もあります。

Gatsbyには強力なデータレイヤーがあり、様々な場所からデータを取り寄せることができます。

ここでは、データの追加と、コンポーネント内で表示する方法について学んでいきます。

Note: GatsbyにはGraphQLを搭載しており、データのクエリを行う際に利用しています。

### 学べること：

* GraphiQLを利用して、データレイヤーの閲覧とクエリ文の作成。

* useStaticQuery フックを利用して、コンポーネント内にデータを取り入れる。

* gatsby-source-filesystem を利用して、ローカルファイルを取り入れる。

* page queery を利用して、データをページ内に取り入れる。

ビデオ版：

## Gatsby GraphQL データレイヤー

複数の箇所からデータを取得するためには、それに対応したsource-pluginを使用します。

Tip: gatsby-source と検索すると、source plugin の一覧が表示されます。

データ取得するためには、まずGraphQLを用いて、コンポーネント内でクエリを発行します。

サイトのビルドを行う際に、GraphQLが実行されるため、必要なデータが表示されます。

## GraphiQLを使う

dev サーバーを立ち上げる際に、特別なエンドポイントが作成され、GraphiQLが使える様になります。

`localhost:8000/___graphiql`

## GraphiQLのインターフェイス

GraphiQLには三つのセクションがあります。

Explorer: 画面左側に位置しており、クエリが可能なデータが表示されています。

* dropdownをトグルすると、選択可能なフィールドが表示されます。

* 青いやつはクエリ可能なフィールドです。

* 紫色のやつは利用可能なフィルターです。

Query Editor: 画面の中央に位置しており、クエリの作成ができます。

* Explorerで選択するか、直接入力することが可能です。Ctrl + Space で自動補完できます。

* クエリを実行するには、三角のボタンを押してください。

Result Window: 画面の右側に位置しており、実行結果が表示されます。

次のセクションでは、フィールドについて詳しく学んでいきます。

## サイトのタイトルの取得

コンポーネントの種類によって（page / building-block)、クエリの仕方が違ってきます。

まずはレイアウト（buildingーblock）コンポーネントについて見ていきます。

## タスク：GraphiQLを使ってクエリを作成する

gatsby-config.jsには、サイトに関する情報がいくつか存在しています。

これは、プロジェクト作成時に、自動で生成されたものです。データレイヤーにも登録されているため、追加のsource pluginを必要としません。

GraphiQL で確認します：

1. GraphiQL を開きます。
2. site フィールドを開きます。
3. siteMetadata フィールドを開きます。
4. title フィールドを選択します。
5. 実行ボタンを押します。

titleの値を変更して、クエリに反映されるかどうか、試してみましょう。

## タスク：useStaticQueryを使ってタイトルを取得します

Reactコンポーネント内でクエリを行うには、useStaticQuery関数を利用します。

useStaricQueryは、Gatsbyが提供する関数（Hook）の一つです。

以下のステップに従います：

1. useStaticQuery と graphql をインポートします。

`import { useStaticQuery, graphql } from 'gatsby'`

graphql テンプレートタグは、クエリ文であることを識別させるために使うものです。

2. コンポーネント内で、useStaticQuery と graphql を使って、クエリ文を作成します。

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

3. (.)オペレータを使って、フィールドにアクセスします。

  return (
    <header>
      <h1>{ data.site.siteMetadata.title }</h1>
    </header>
  )

Note: useStaticQueryは、ファイル内で一回しか呼びさせません。複数のフィールドが必要な場合は一つのクエリにまとめてください。

```
const data = useStaticQuery(graphql`
  query {
      siteMetadata {
        title
      }
    }
    siteBuildMetadata {
      buildTime
    }
  }
`)
```

以下のステップに従ってLayoutにタイトルを表示させてください：

1. useStaticQuery と graphql をインポートします。

`import { Link, useStaticQuery, graphql } from 'gatsby'`

2. クエリ文を作成します。

```
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
```

3. (.)オペレータを使って、タイトル情報を表示させます。

```
  <title>{pageTitle} | {data.site.siteMetadata.title}</title>
  <header>{data.site.siteMetadata.title}</header>
```

4. スタイルを追加します。

```
.site-title {
  font-size: 3rem;
  color: gray;
  font-weight: 700;
  margin: 3rem 0;
}
```

```
  <header className={siteTitle}>{data.site.siteMetadata.title}</header>
```

おめでとうございます。GraphQLを使ったデータの表示に成功しました。

## ページ内でのクエリ：ブログページ

次に、ブログページを作成します。

ここではまず、ブログのファイルの一覧を表示するところから始めます。

ブロクページから各ブログに遷移する方法は、セクション５、６で学ぶ予定です。

### タスク：ブログページの作成

1. src/pages/blog.js に以下の内容を追加します。

```
Copysrc/pages/blog.js: copy code to clipboard
import * as React from 'react'
import Layout from '../components/layout'
const BlogPage = () => {
  return (
    <Layout pageTitle="My Blog Posts">
      <p>My cool posts will go in here</p>
    </Layout>
  )
}
export default BlogPage
```

2. リンクを追加する。

```
<li className={navLinkItem}>
  <Link to="/blog" className={navLinkText}>
    Blog
  </Link>
</li>
```

3. ブラウザを開いて動作確認する。

### タスク：MDXファイルを追加する

blogダイレクトリ内で、.mdxの拡張子がついたファイルを三つ作成してください。MDXについてはチャプター５を見てください。

## GraphiQLを使ってクエリを作成する

ローカルで保存されたファイルをGatsbyのデータレイヤーに読み込ませるためには、gatsby-source-filesystemを使用します。








