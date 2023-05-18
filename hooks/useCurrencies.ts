import useSWR from 'swr'
import fetcher from "@/libs/fetcher"
import moment from "moment";
import { Currency } from '@prisma/client';

const useCurrencies = (currencies: any) => {
    if (typeof currencies === "string") {
        const { data, error, isLoading } = useSWR(`http://api.binance.com/api/v3/ticker/24hr?symbols=${currencies}`, fetcher)

        return {
            data,
            error,
            isLoading,
        }
    } else {
        const currenciesNameMap = currencies ? JSON.stringify(currencies.map((e: any) => e.name)) : JSON.stringify([])

        const { data, error, isLoading } = useSWR(`http://api.binance.com/api/v3/ticker/24hr?symbols=${currenciesNameMap}`, fetcher)

        return {
            data,
            error,
            isLoading,
        }
    }
}

export default useCurrencies;