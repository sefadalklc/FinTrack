import AddTransaction from "@/components/AddTransaction";
import TransactionTable from "@/components/FintrackTable/TransactionTable";
import BaseLayout from "@/layouts/baseLayout";
import { Card, Grid } from "@mantine/core";
import { NextPage } from "next";

const Transactions: NextPage = () => {

    return (
        <>
            <Grid.Col span={3}>
                <AddTransaction />
            </Grid.Col>
            <Grid.Col span={9}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <TransactionTable />
                </Card>
            </Grid.Col>
        </>

    )
}

Transactions.Layout = BaseLayout;

export default Transactions;