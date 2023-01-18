import { useEffect } from "react"
import { io } from "socket.io-client"

const useGetRooms = () => {
    useEffect(() => {
        const socket = io(`${import.meta.env.VITE_SERVER}${nickname}`)
        socket.on("allRooms", (data) => {
            console.log(data);
        })
    },[])  
}

export {socket,useGetRooms};