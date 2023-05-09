import AllCurrencyTable from "@/components/FintrackTable/AllCurrencyTable";
import BaseLayout from "@/layouts/baseLayout";
import { Grid } from "@mantine/core";
import Head from "next/head";

const Settings = () => {

    return (
        <>
            <Head>
                <title>FinTrack | Settings</title>
                <meta name="description" content="Settings page." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid.Col p={15}>
                <AllCurrencyTable />
            </Grid.Col>
        </>
    )
}

Settings.Layout = BaseLayout;

export default Settings;

