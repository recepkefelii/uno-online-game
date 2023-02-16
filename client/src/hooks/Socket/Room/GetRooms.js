import useSocket from "../Socket";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { RoomSlice } from "../../../redux/features/Room/RoomSlice";
import { setGames } from "../../../redux/features/Room/RoomSlice";

const useGetRooms = () => {
    const socket = useSocket()
    const dispatch = useDispatch()
    useEffect(() => {
        if(socket){
            socket.on('allRooms', (allRooms) => {
               dispatch(setGames(allRooms))
            });
            socket.emit('getRooms');
        }
    }, [socket]);
}


export default useGetRooms;