import FintrackTable from "@/components/FintrackTable";
import useCurrencies from "@/hooks/useCurrencies";
import { createStyles } from "@mantine/core";
import moment from "moment";
import { useState, useEffect } from "react";


const useStyles = createStyles((theme) => ({
    fetchDate: {
        fontSize: '12px',
        color: theme.colors.gray[5],
        textAlign: 'right'
    },
}));

const CurrencyTable = () => {

    const { classes } = useStyles();

    const [fetchDate, setFetchDate] = useState();
    const { data } = useCurrencies(JSON.stringify(["BTCUSDT", "ETHUSDT", "XRPUSDT", "AVAXUSDT", "SOLUSDT", "DYDXUSDT"]));

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

    const rows = data?.map((element) => (
        <tr key={element.symbol}>
            <td>{element.symbol}</td>
            <td>{Number(element.highPrice).toFixed(4)}</td>
            <td>{Number(element.lowPrice).toFixed(4)}</td>
            <td>{Number(element.openPrice).toFixed(4)}</td>
            <td>{Number(element.volume).toFixed(4)}</td>
        </tr>
    ));

    return (
        <>
            <FintrackTable
                thead={thead}
                rows={rows}
            />
            <p className={classes.fetchDate}>Date: {fetchDate}</p>
        </>
    )
}

export default CurrencyTable;