import { Analytics } from '@vercel/analytics/react';
import Head from "next/head";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  //{pageProps.title && `${pageProps.title} | `}
  return <>
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="keywords"
        content="Abdullah Al Rafi, Portfolio, Python, JavaScript, Data Scientist, bKash, Django, Bangladesh, Dhaka"
      />
      <meta name="author" content="Abdullah Al Rafi" />
      <meta name="creator" content="Abdullah Al Rafi" />
      <meta name="publisher" content="Abdullah Al Rafi" />
      <meta name="description" content="Blog website of Abdullah Al Rafi, Python & JS Developer, Analyst (Data Science) at bKash Limited" />
      <title>Abdullah Al Rafi</title>
    </Head>
    <Component {...pageProps} />
    <Analytics />
  </>;
}

export default MyApp;
