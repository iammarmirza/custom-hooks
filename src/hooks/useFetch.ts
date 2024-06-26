import { useCallback, useEffect, useMemo, useState, useRef } from "react"

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
    const controller = useRef<AbortController>()
    const timeout = useRef<number>()

    const fullUrl = useMemo(() => {
        const newUrl = new URL(url)
        const keyValuePairs = Object.entries(queryParams || {})
        keyValuePairs.forEach(([key, value]) => {
            newUrl.searchParams.append(key, value.toString())
        })
        return newUrl
    }, [url])

    const onAbort = () => controller.current && controller.current.abort();

    const fetchPromise = new Promise((res, rej) => {
        if (extraOptions?.timeout) {
            timeout.current = setTimeout(() => {
                rej('Timeout')
                onAbort()
            }, extraOptions.timeout)
        }
        fetch(fullUrl, { signal: controller.current?.signal }).then(response => {
            if (timeout.current) clearTimeout(timeout.current)
            res(response)
        }).catch((err) => {
            rej(err)
        })
    })


    const fetchData = useCallback(async () => {
        setData(null)
        setError(null)
        setLoading(true)
        controller.current = new AbortController();
        try {
            const response = await fetchPromise
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
    }, [url])

    useEffect(() => {

        return () => {
            extraOptions?.shouldCancelOnUnmount && controller.current && controller.current.abort();
        }
    }, [])

    return { data, error, loading, fetchData, onAbort }
}