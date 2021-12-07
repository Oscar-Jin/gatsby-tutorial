// ───────────────────────────────────────────────────────────── import ───┐
import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";

// ───────────────────────────────────────────────────────────── define ───┐
const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blogs">
      <ul>
        {data.allFile.nodes.map(node => (
          <li key={node.name}>{node.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
      nodes {
        name
      }
    }
  }
`;

// ───────────────────────────────────────────────────────────── export ───┐
export default BlogPage;
