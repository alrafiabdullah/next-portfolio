import Head from "next/head";
import axios from "axios";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // axios.defaults.baseURL = process.env.NODE_ENV === "production" ? process.env.PROD_URL : process.env.LOCAL_URL;

  return <>
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Portfolio website of Abdullah Al Rafi, Python & JS Developer, Junior Data Scientist at MedAI" />
      <title>Abdullah Al Rafi</title>
    </Head>
    <Component {...pageProps} />
  </>;
}

export default MyApp;
