import { AppProps } from 'next/app';
import Head from 'next/head';
import { Grid, MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import useWindowSize from '@/hooks/useWindowSize';
import Sidebar from '@/components/Sidebar';

export default function App({ Component, pageProps }: AppProps) {

  const { width, height } = useWindowSize();

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <Head>
          <title>Page title</title>
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
          <Grid m={0}>
            {width > 850 && <Grid.Col p={0} m={0} span="content"><Sidebar /></Grid.Col>}
            <Grid.Col p={0} m={0} span="auto" display={"flex"} >
              <Component {...pageProps} />
            </Grid.Col>
          </Grid>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}