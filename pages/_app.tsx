import { AppProps } from 'next/app';
import Head from 'next/head';
import { Grid, MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import useWindowSize from '@/hooks/useWindowSize';
import Sidebar from '@/components/Sidebar';

const Noop = ({ children }: any) => <>{children}</>

export default function App({ Component, pageProps }: AppProps) {

  const { width, height } = useWindowSize();


  const Layout = Component.Layout ?? Noop

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <Head>
          <title>FinTrack</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>

        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}