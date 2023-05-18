import FintrackTable from "@/components/FintrackTable";
import useCurrencies from "@/hooks/useCurrencies";
import useCurrentUser from "@/hooks/useCurrentUser";
import fetcher from "@/libs/fetcher";
import { Button, Loader, Title, createStyles } from "@mantine/core";
import { IconHeart, IconTrash } from "@tabler/icons-react";
import moment from "moment";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useSWR from 'swr'

interface IElementProps {
    id?: string,
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
    const { data: currentUser } = useCurrentUser();
    const [favoriteCurrencies, setFavoriteCurrencies] = useState<any>([]);
    const { classes } = useStyles();
    const [fetchDate, setFetchDate] = useState<string>("");
    const { data } = useCurrencies(currencies);
    const [matchedCurrenciesData, setMatchedCurrenciesData] = useState<any[]>([]);
    const [processLoading, setProcessLoading] = useState({
        status: false,
        id: null
    });

    const addFavorite = (currency: any) => {
        setProcessLoading({ id: currency.id, status: true });
        fetch('/api/currency/addFavorite', {
            method: "POST",
            body: JSON.stringify({
                id: currency.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.IsSuccess) {
                    setFavoriteCurrencies((prevData: any) => [...prevData, currency.id])
                    toast.success(res.Message)
                } else {
                    toast.error(res.Message)
                }
            })
            .finally(() => {
                setProcessLoading({ id: null, status: false })
            })
    }

    useEffect(() => {
        setFavoriteCurrencies(currentUser?.favoriteCurrencies || [])
    }, [currentUser])

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
            <td>
                {
                    (processLoading.status && processLoading.id === currency.id) ? <Loader /> :
                        favoriteCurrencies.find((el: string) => el === currency.id)
                            ?
                            <Button variant="gradient" bg={"red"} onClick={() => addFavorite(currency)} leftIcon={<IconTrash size="1rem" />} loaderPosition="center">
                                Remove Favorite
                            </Button>
                            : <Button variant="gradient" onClick={() => addFavorite(currency)} leftIcon={<IconHeart size="1rem" />} loaderPosition="center">
                                Add Favorite
                            </Button>
                }
            </td>
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