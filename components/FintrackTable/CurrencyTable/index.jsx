import FintrackTable from "@/components/FintrackTable";
import { Card, Group, Menu, SimpleGrid, Text } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";

const CurrencyTable = () => {

    const [date, setDate] = useState();

    useEffect(() => {
        setDate(moment().format('MMMM Do YYYY, h:mm:ss a'))
    }, [])

    const thead = (
        <tr>
            <th>Symbol</th>
            <th>High Price</th>
            <th>Low Price</th>
            <th>Open Price</th>
            <th>Volume</th>
        </tr>
    );


    const elements = [
        {
            "symbol": "ETHUSDT",
            "openPrice": 2079.19000000,
            "highPrice": 2121.47000000,
            "volume": 366458.80510000,
            "lowPrice": 2071.13000000,
        },
        {
            "symbol": "BTCUSDT",
            "openPrice": 30275.00000000,
            "highPrice": 30595.60000000,
            "volume": 29547.43968000,
            "lowPrice": 30200.76000000,
        },
        {
            "symbol": "XRPUSDT",
            "openPrice": "0.52020000",
            "highPrice": "0.52780000",
            "lowPrice": "0.51600000",
            "volume": "175324802.00000000",
        }
    ]

    const rows = elements.map((element) => (
        <tr key={element.symbol}>
            <td>{element.symbol}</td>
            <td>{Number(element.highPrice).toFixed(4)}</td>
            <td>{Number(element.lowPrice).toFixed(4)}</td>
            <td>{Number(element.openPrice).toFixed(4)}</td>
            <td>{Number(element.volume).toFixed(4)}</td>
        </tr>
    ));

    const tfoot = <tr>
        <td>{date}</td>
    </tr>

    return (
        <>
            <FintrackTable
                thead={thead}
                tfoot={tfoot}
                rows={rows}
            />
        </>
    )
}

export default CurrencyTable;