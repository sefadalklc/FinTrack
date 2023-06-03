import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useTransactions = () => {

    const { data, error, isLoading, mutate } = useSWR('/api/transaction/getTransactions', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useTransactions;