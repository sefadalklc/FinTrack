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
    const { classes } = useStyles();
    const [fetchDate, setFetchDate] = useState<string>("");
    const { data } = useCurrencies(currencies);
    const [matchedCurrenciesData, setMatchedCurrenciesData] = useState<any[]>([]);

    const addFavorite = (currency: any) => {
        fetch('/api/currency/addFavorite', {
            method: "POST",
            body: JSON.stringify({
                id: currency.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    useEffect(() => {
        let matches: any[] = []
        if (currencies && data) {
            currencies.map((cur: { id: string, name: string }) => {
                data.map((d: any) => {
                    let matched = {}
                    if (cur.name == d.symbol) {
                        matched = { ...d, id: cur.id }
                        matches.push(matched)
                    }
                })
            })
            setMatchedCurrenciesData(matches)
        }
        setFetchDate(moment().format('MMMM Do YYYY, h:mm:ss a'))
    }, [data, currencies])

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

    const rows = matchedCurrenciesData?.map((currency: IElementProps) => (
        <tr key={currency.symbol}>
            <td>{currency.symbol}</td>
            <td>{Number(currency.highPrice).toFixed(4)}</td>
            <td>{Number(currency.lowPrice).toFixed(4)}</td>
            <td>{Number(currency.openPrice).toFixed(4)}</td>
            <td>{Number(currency.volume).toFixed(4)}</td>
            <td> <Button onClick={() => addFavorite(currency)} leftIcon={<IconHeart size="1rem" />} loaderPosition="center">
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