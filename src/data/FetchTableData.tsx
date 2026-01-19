import React from 'react'
import useSWR from "swr"


const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json())

export const FetchTableData = () => {
        const { data, error,mutate } = useSWR('/api/transactions', fetcher)

        return {
            transactionData:data,
            error,
            mutate
        }
}

