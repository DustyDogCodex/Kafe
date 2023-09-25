'use client'
import { useParams } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from 'react'

type ItemProps = {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    category: string[]
}

function EditPage() {
    const itemID = useParams().itemID

    //item info
    const [ selectedItem, setSelectedItem ] = useState<ItemProps>()
    const [ loading, setLoading ] = useState<boolean>(true)

    //get item info for display
    async function getItemInfo() {
        axios.get(`http://localhost:3000/api/items/${itemID}`)
        .then(res => { 
            setSelectedItem(res.data.itemInfo)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getItemInfo()
    }, [])

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-between">
            <div className="container pt-20 font-fauna">
                this is the edit items page for {selectedItem?.name}
            </div>
        </div>
    )
}

export default EditPage