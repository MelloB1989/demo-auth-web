import "../styles/global.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) {

  return (
    <>
        <Head>
          {/* Title Tag */}
          <title>{"Demo User Login and Signup | TS"}</title>
          {/* Meta Description Attribute */}
          <meta name="description" content={"MelloB"} />
          {/* Meta Robots Attribute */}
          <meta name="robots" content="index, follow" />
          {/* Meta Keywords Attribute (less important nowadays) */}
          <meta
            name="keywords"
            content="nbl, noobs, mellob"
          />
          {/* Meta Viewport Tag for responsive web design */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* Meta Charset Tag */}
          <meta charSet="UTF-8" />
          {/* Meta Language Tag */}
          <meta httpEquiv="content-language" content="en" />
          {/* Meta Author Tag */}
          <meta name="author" content="CoffeeCodes" />
          {/* Dynamic Open Graph Image */}
          <meta
            property="og:image"
            content={
              "https://noobsverse-internal.s3.ap-south-1.amazonaws.com/karmapay-removebg-preview.png"
            }
          />
          <link
            rel="icon"
            type="image/x-icon"
            href="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/karmapay-removebg-preview.png"
          />
        </Head>
            <Component {...pageProps} />
            <ToastContainer />
    </>
  );
}