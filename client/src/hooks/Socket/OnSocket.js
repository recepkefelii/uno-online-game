import { useEffect } from "react"
import { io,Socket } from "socket.io-client"
import { useNavigate } from "react-router"

const onSocketConnect = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const socket = io("http://localhost:3000/?username=mesadmo")
        socket.on('disconnect',() => {
            navigate("/register")
            console.log("disconnect");
        })
    },[])
}

export default onSocketConnect;