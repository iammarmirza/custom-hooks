import { useCallback, useEffect, useState } from "react"

type QueryParams = {
    [key: string]: string | number | boolean
}

type ExtraOptionsParams = {
    shouldCancelOnUnmount?: boolean
    timeout?: number
}

export const useFetch = <T>(url: string, queryParams?: QueryParams, extraOptions?: ExtraOptionsParams) => {

    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(true)

        const fetchData = useCallback(async () => {
            setData(null)
            setError(null)

            try {
                const response = await fetch(url)
                const fetchedData = await response.json()
                setData(fetchedData)
            } catch (e: unknown) {
                if (typeof e === "string") {
                    setError(e)
                } else if (e instanceof Error) {
                    setError(e.message)
                }
            } finally {
                setLoading(false)
            }
        },[url])

    return { data, error, loading, fetchData }
}