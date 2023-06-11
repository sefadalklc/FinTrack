import FintrackTable from "@/components/FintrackTable";
import useTransactions from "@/hooks/useTransactions";
import { Button, Loader, Title } from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

enum entity {
    tl = "Türk Lirası",
    foreignCurrency = "Döviz",
    gold = "Altın",
    silver = "Gümüş",
    stock = "Hisse Senedi",
    cryptoCurrency = "Kripto Para"
}

const TransactionTable = ({ setNewTransaction, newTransaction }: { setNewTransaction: (e: any) => void, newTransaction: boolean }) => {
    const [processLoading, setProcessLoading] = useState({
        status: false,
        id: null
    });

    let { data: transactions } = useTransactions();

    const [activeTransactionList, setActiveTransactionList] = useState<any[]>([]);

    let getTransactions = () => {
        fetch('/api/transaction/getTransactions', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(async res => {
                if (res.IsSuccess) {
                    setActiveTransactionList(res.data);
                    setNewTransaction(false)
                } else {
                    toast.error(res.Message)
                }
            })
    }

    useEffect(() => {
        if (transactions?.data) {
            setActiveTransactionList(transactions.data);
        }
    }, [transactions])

    useEffect(() => {
        getTransactions()
    }, [newTransaction])



    const removeTransaction = (transaction: any) => {
        setProcessLoading({ id: transaction.id, status: true });
        fetch('/api/transaction/removeTransaction', {
            method: "POST",
            body: JSON.stringify({
                id: transaction.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(async res => {
                if (res.IsSuccess) {
                    getTransactions()
                    toast.success(res.Message)
                } else {
                    toast.error(res.Message)
                }
            })
            .finally(() => {
                setProcessLoading({ id: null, status: false })
            })
    }

    const thead = (
        <tr>
            <th>Varlık Tipi</th>
            <th>Adet</th>
            <th>Birim Fiyat</th>
            <th>İşlem Tipi </th>
            <th>İşlem Saati</th>
            <th>İşlem Zamanı </th>
            <th>İşlem</th>
        </tr>
    );

    const rows = activeTransactionList?.map((transaction: any) => (
        <tr key={transaction.id}>
            <td>{entity[transaction.entityType]}
                {transaction.cryptoCurrency && ` (${transaction.cryptoCurrency})`}
                {transaction.stock && ` (${transaction.stock})`}
                {transaction.foreignCurrencyType && ` (${transaction.foreignCurrencyType})`}
            </td>
            <td>{Number(transaction.quantity).toFixed(2)}</td>
            <td>{Number(transaction.unitPrice).toFixed(2)}</td>
            <td align="center">
                {transaction.transactionType === "plus" && <IconPlus size={20} color="green" />}
                {transaction.transactionType === "minus" && <IconMinus size={20} color="red" />}
            </td>
            <td>{transaction.createdAt ? dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss') : '~'}</td>
            <td>{transaction.transactionTime ? dayjs(transaction.transactionTime).format('DD.MM.YYYY HH:mm:ss') : '~'}</td>
            <td>
                {
                    (processLoading.status && processLoading.id === transaction.id) ? <Loader /> :
                        <Button variant="gradient" bg={"red"} onClick={() => removeTransaction(transaction)} leftIcon={<IconTrash size="1rem" />} loaderPosition="center">
                            Remove Transaction
                        </Button>
                }
            </td>
        </tr>
    ));

    return (
        <>
            <Title c="blue" mb={10} order={2}>İşlemlerim</Title>
            <FintrackTable
                thead={thead}
                rows={rows}
            />
        </>
    )
}

export default TransactionTable;