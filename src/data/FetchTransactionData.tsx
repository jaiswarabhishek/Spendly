import useSWR from "swr"

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json())

export const FetchTransactionData = (id:string) => {
        const { data, error } = useSWR(`/api/transactions/singletransaction/${id}`, fetcher)

        return {
            transactionData:data,
            error
        }
}