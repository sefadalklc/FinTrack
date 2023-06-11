import AddTransaction from "@/components/AddTransaction";
import TransactionTable from "@/components/FintrackTable/TransactionTable";
import BaseLayout from "@/layouts/baseLayout";
import { Card, Grid } from "@mantine/core";
import { NextPage } from "next";
import { useState } from "react";

const Transactions: NextPage = () => {

    const [newTransaction, setNewTransaction] = useState<boolean>(false);

    return (
        <>
            <Grid.Col span={3}>
                <AddTransaction setNewTransaction={setNewTransaction} />
            </Grid.Col>
            <Grid.Col span={9}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <TransactionTable setNewTransaction={setNewTransaction} newTransaction={newTransaction} />
                </Card>
            </Grid.Col>
        </>

    )
}

Transactions.Layout = BaseLayout;

export default Transactions;