import React, { useEffect, useState } from 'react'

import axios from "axios";
import dataAr from './utilArr';

const MainComp = () => {

    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const [nextNum, setNextNum] = useState(5)
    const [totalRecords, setTotalRecords] = useState(dataAr.length)
    const [list, setList] = useState(dataAr.slice(0, 5))

    console.log("State loading->", loading)

    const fetchData = async () => {
        if(list.length !=dataAr.length){
            setLoading(true)
        }
        setTimeout(() => {
            setLoading(false)
            setList(dataAr.slice(0, nextNum + 5))
            setNextNum(nextNum + 5)
        }, 500);
    }


    const handleInfiniteScroll = async () => {
        try {
            //total web page height visible
            console.log('height-->', document.documentElement.scrollHeight)

            //height visible to user
            console.log("inner height-->",window.innerHeight)

            //returns the number of pixels the document is scrolled
            console.log("scrollTop->",document.documentElement.scrollTop)

            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                fetchData()
             }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll)
        return ()=>window.removeEventListener('scroll',handleInfiniteScroll)
    }, [])

    return (
        <div className='mainContainer'>
            <ul className='ulContainer'>
                {
                    list.map((it, i) => (
                        <li className='itemContainer'>
                            <div className='imgCon'>
                                <img className='imgTagCon' src={it.img} alt="Mountain"></img>
                            </div>
                            <div className='secondCon'>
                                <div className='titleContainer'>{it.title}</div>
                                <div className='contentContainer'>{it.content}</div>
                            </div>
                        </li>

                    ))
                }
            </ul>
            {/* <button onClick={fetchData}>Next</button> */}
            {loading && <div className='loadingCon'>
                <p>...Loading</p>
            </div>}
        </div>
    )
}

export default MainComp