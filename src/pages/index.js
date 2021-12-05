// ───────────────────────────────────────────────────────────── import ───┐
import * as React from "react";
import Layout from "../components/layout.js";
import { StaticImage } from "gatsby-plugin-image";

// ───────────────────────────────────────────────────────────── define ───┐
const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>Hi there! I am Oscar Jin</p>
      <StaticImage
        src="https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
        alt="green"
      />
    </Layout>
  );
};

// ───────────────────────────────────────────────────────────── export ───┐
export default IndexPage;
