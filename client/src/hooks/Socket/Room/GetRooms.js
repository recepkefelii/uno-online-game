import useSocket from "../Socket";
import { useEffect,useState } from "react";

const useGetRooms = () => {
    const socket = useSocket()
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        if(socket){
            socket.on('allRooms', (allRooms) => {
                setRooms(allRooms);
            });
            socket.emit('getRooms');
        }
    }, [socket]);
    return rooms;
}


export default useGetRooms;