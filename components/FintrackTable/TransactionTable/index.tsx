import FintrackTable from "@/components/FintrackTable";
import useTransactions from "@/hooks/useTransactions";
import { Title } from "@mantine/core";

interface IElementProps {
    id?: string,
    symbol: string,
    highPrice: number | string
    lowPrice: number | string
    openPrice: number | string
    volume: number | string
}

enum entity {
    tl = "Türk Lirası",
    foreignCurrency = "Döviz",
    gold = "Altın",
    silver = "Gümüş",
    stock = "Hisse Senedi",
    cryptoCurrency = "Kripto Para"
}

const TransactionTable = () => {


    const { data: transactions } = useTransactions();

    const thead = (
        <tr>
            <th>Entity Type</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Stock</th>
            <th>Created At</th>
            <th>Transaction Time</th>
        </tr>
    );

    const rows = transactions?.data?.map((element: IElementProps) => (
        <tr key={element.id}>
            <td>{entity[element.entityType]}</td>
            <td>{Number(element.quantity).toFixed(2)}</td>
            <td>{Number(element.unitPrice).toFixed(2)}</td>
            <td>{element.stock ? element.stock : '~'}</td>
            <td>{element.createdAt ? element.createdAt : '~'}</td>
            <td>{element.transactionTime ? element.transactionTime : '~'}</td>
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