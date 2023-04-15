import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";

import Footer from "@/components/Layout/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Jakub Pawlak" />
        <meta
          name="description"
          content="Fullstack Todo list app created with Next.js, TypeScript and Material UI to help you better organize your daily tasks."
        />
        <meta
          name="keywords"
          content="TypeScript, Next.js, React.js, Material UI, Fullstack, MongoDB, Mongoose, todo app, list"
        />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}
