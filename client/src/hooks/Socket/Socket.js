import { io } from "socket.io-client"
const socket = io(`${import.meta.env.VITE_SERVER}${nickname}`)

export default socket;