import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header, Rightbar, SideNavbar } from "../components";
import Head from "next/head";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Startapp</title>
        <link rel="icon-nav" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <div className="max-w-7xl mx-auto flex">
        <SideNavbar />
        <Component {...pageProps} />
        <Rightbar />
      </div> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
