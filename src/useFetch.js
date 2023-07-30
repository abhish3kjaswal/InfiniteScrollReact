import React, { useState, useCallback, useEffect } from 'react'
import axios from "axios";

const useFetch = (query, page) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [list, setList] = useState([])

    const sendQuery = useCallback(async () => {
        try {
            await setLoading(true)
            await setError(false)
            let url = 'https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/1'
            const res = await axios.get(url)
            console.log("LIST RES-->", res)
            // await setList((prev) => [...prev, ...res.data])
            await setLoading(false)

        } catch (error) {
            setError(error)
        }
    }, [query, page])
    return {loading,error,list}
}

export default useFetch