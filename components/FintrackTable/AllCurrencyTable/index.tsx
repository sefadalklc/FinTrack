import FintrackTable from "@/components/FintrackTable";
import useCurrencies from "@/hooks/useCurrencies";
import fetcher from "@/libs/fetcher";
import { Button, Title, createStyles } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import moment from "moment";
import { useState, useEffect } from "react";
import useSWR from 'swr'

interface IElementProps {
    symbol: string,
    highPrice: number | string
    lowPrice: number | string
    openPrice: number | string
    volume: number | string
}


const useStyles = createStyles((theme): any => ({
    fetchDate: {
        fontSize: '12px',
        color: theme.colors.gray[5],
        textAlign: 'right'
    },
}));


const AllCurrencyTable = () => {

    const { data: currencies } = useSWR('/api/currency', fetcher)
    const currenciesNameMap = currencies ? JSON.stringify(currencies.map((e: { name: string, _id: string }) => e.name)) : JSON.stringify([])
    const { classes } = useStyles();
    const [fetchDate, setFetchDate] = useState<string>("");
    const { data } = useCurrencies(currenciesNameMap);

    useEffect(() => {
        setFetchDate(moment().format('MMMM Do YYYY, h:mm:ss a'))
    }, [data])

    const thead = (
        <tr>
            <th>Symbol</th>
            <th>High Price</th>
            <th>Low Price</th>
            <th>Open Price</th>
            <th>Volume</th>
            <th>İşlem</th>
        </tr>
    );

    const rows = data?.map((element: IElementProps) => (
        <tr key={element.symbol}>
            <td>{element.symbol}</td>
            <td>{Number(element.highPrice).toFixed(4)}</td>
            <td>{Number(element.lowPrice).toFixed(4)}</td>
            <td>{Number(element.openPrice).toFixed(4)}</td>
            <td>{Number(element.volume).toFixed(4)}</td>
            <td> <Button leftIcon={<IconHeart size="1rem" />} loaderPosition="center">
                Add Favorite
            </Button></td>
        </tr>
    ));

    return (
        <>
            <Title c="blue" mb={10} order={2}>Tüm Kripto Paralar</Title>
            <FintrackTable
                thead={thead}
                rows={rows}
            />
            <p className={classes.fetchDate}>Date: {fetchDate}</p>
        </>
    )
}

export default AllCurrencyTable;