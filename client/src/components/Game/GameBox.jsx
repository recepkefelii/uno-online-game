import { useState } from 'react'
import { motion } from 'framer-motion';
import useGetRooms from '../../hooks/Socket/Room/GetRooms';
import { useSelector } from 'react-redux';
const GameBox = () => {
    useGetRooms()
    const games = useSelector(state => state.RoomSlice);
    console.log(games);

    return (
        <>
            {
                games.map((item,index) => (
                    <motion.div key={index} className="bg-blue-500 h-14 flex items-center  hover:bg-blue-400 border border-blue-700 rounded mt-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="text-white font-bold px-4 flex-1 ">{item.name}</div>
                        <div className="text-white font-bold px-4 text-right flex-1">{item.maxPlayers}/{item.currentPlayers}</div>
                    </motion.div>
                ))
            }
        </>


    )
}

export default GameBox;