import Head from "next/head";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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
