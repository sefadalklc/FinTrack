import useSWR from 'swr'
import fetcher from "@/libs/fetcher"
import moment from "moment";

const useCurrencies = (currencyQuery: string) => {
    const { data, error, isLoading } = useSWR(`http://api.binance.com/api/v3/ticker/24hr?symbols=${currencyQuery}`, fetcher)

    return {
        data,
        error,
        isLoading,
    }
}

export default useCurrencies;