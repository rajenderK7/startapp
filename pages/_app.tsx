import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components";
import Head from "next/head";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import UserContext from "../lib/contexts/userContext";
import useUserData from "../lib/hooks/userDataHook";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <>
      <UserContext.Provider value={userData}>
        <Head>
          <title>Startapp</title>
          <link rel="icon-nav" href="/favicon.ico" />
        </Head>
        <Header />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
