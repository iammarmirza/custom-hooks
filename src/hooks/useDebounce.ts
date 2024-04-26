import { useEffect, useRef, useState } from "react"

export const useDebounce = <T>(value: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    const timeoutRef = useRef<number>()

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        if (timeoutRef.current) return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [value, delay])

    return debouncedValue
}