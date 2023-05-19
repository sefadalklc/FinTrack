import FintrackTable from "@/components/FintrackTable";
import useCurrencies from "@/hooks/useCurrencies";
import useFavoriteCurrencies from "@/hooks/useFavoriteCurrencies";
import { Alert, Anchor, Center, Container, Grid, Loader, Title, createStyles } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import moment from "moment";
import { useState, useEffect } from "react";

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

const FavoriteCryptoCurrencyTable = () => {

    const { classes } = useStyles();

    const [fetchDate, setFetchDate] = useState<string>("");
    const { data: favoriteCurrencies } = useFavoriteCurrencies();
    const { data, isLoading } = useCurrencies(favoriteCurrencies?.data ? JSON.stringify(favoriteCurrencies?.data.map((fc: any) => fc.name)) : JSON.stringify([].map((fc: any) => fc.name)))

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
        </tr>
    );

    const rows = data?.map((element: IElementProps) => (
        <tr key={element.symbol}>
            <td>{element.symbol}</td>
            <td>{Number(element.highPrice).toFixed(4)}</td>
            <td>{Number(element.lowPrice).toFixed(4)}</td>
            <td>{Number(element.openPrice).toFixed(4)}</td>
            <td>{Number(element.volume).toFixed(4)}</td>
        </tr>
    ));

    if (isLoading) {
        return <Center maw={"100%"} h={100} mx="auto">
            <Loader />
        </Center>

    }

    if (!data) {
        return <>
            <Title c="blue" mb={10} order={2}>Favori Kripto Paralarım</Title>
            <Alert my={"lg"} icon={<IconAlertCircle size="1rem" />} title="Hiç favori kripto paranız yok!" color="red" radius="xs" variant="outline">
                <Anchor href="/settings">
                    Ayarlar
                </Anchor> sayfasına giderek kripto paraları favorilerinize ekleyebilirsiniz.
            </Alert>
        </>
    }

    return (
        <>
            <Title c="blue" mb={10} order={2}>Favori Kripto Paralarım</Title>
            <FintrackTable
                thead={thead}
                rows={rows}
            />

            <p className={classes.fetchDate}>Date: {fetchDate}</p>
        </>
    )
}

export default FavoriteCryptoCurrencyTable;