import useSWR from 'swr'
import fetcher from "@/libs/fetcher"
const useFavoriteCurrencies = () => {

    const { data, error, isLoading } = useSWR('/api/currency/getFavoriteCurrencies', fetcher);

    return {
        data,
        error,
        isLoading,
    }
}


export default useFavoriteCurrencies;