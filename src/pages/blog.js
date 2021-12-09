// ───────────────────────────────────────────────────────────── import ───┐
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";
import Layout from "../components/layout";

// ───────────────────────────────────────────────────────────── define ───┐
const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blogs">
      {data.allMdx.nodes.map(node => (
        <article key={node.id}>
          <MDXRenderer>{node.body}</MDXRenderer>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
        id
        body
      }
    }
  }
`;

// ───────────────────────────────────────────────────────────── export ───┐
export default BlogPage;
