import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client"

const useSocket = () => {
    const {nickname} = useSelector((state) => state.JoinRoomSlice)
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        setSocket(io(`${import.meta.env.VITE_SERVER}${nickname}`))
    }, [nickname])
    return socket
}

export default useSocket