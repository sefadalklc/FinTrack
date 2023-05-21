import AddTransaction from "@/components/AddTransaction";
import BaseLayout from "@/layouts/baseLayout";
import { NextPage } from "next";

const Transactions: NextPage = () => {

    return (
        <div>
            <AddTransaction />
        </div>
    )


}

Transactions.Layout = BaseLayout;

export default Transactions;