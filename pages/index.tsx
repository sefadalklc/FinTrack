import Head from 'next/head'
import Image from 'next/image'
import Sidebar from "@/components/Sidebar";
import HomepageHeroAlert from "@/components/HomepageHeroAlert";
import CurrencyTable from "@/components/FintrackTable/CurrencyTable";
import { Inter } from 'next/font/google'
import BaseLayout from "@/layouts/baseLayout";
import { Grid } from '@mantine/core';
import TradingViewRealTimeWidget from '@/components/TradingViewRealTimeWidget';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>FinTrack | Homepage</title>
        <meta name="description" content="Homepage." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid.Col p={15}>
        <HomepageHeroAlert />
        <CurrencyTable />
        <TradingViewRealTimeWidget />
      </Grid.Col>
    </>
  )
}

Home.Layout = BaseLayout;