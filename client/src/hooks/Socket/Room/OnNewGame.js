import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGames } from "../../../redux/features/Room/RoomSlice";
import useSocket from "../Socket";

const currentRooms = () => {
    const socket = useSocket();
    const dispatch = useDispatch();

    useEffect(() => {
        if (socket) {
            socket.on('onNewGame', (data) => {
                console.log(data.newGame); 
                dispatch(setGames([data.newGame]));
            });

        }
    }, [socket]);
};

export default currentRooms;
