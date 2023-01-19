import React, { useState } from 'react';
import GameBox from '../components/Game/GameBox'
import { motion } from 'framer-motion';
import GameModal from '../components/Game/GameModal'
import useGetRooms from '../hooks/Socket/Room/GetRooms';
const GameRooms = () => {
    const [modalVisible, setModalVisible] = useState(false)
        const rooms = useGetRooms()
        console.log(rooms);

    return (
        <div className={`h-screen bg-gray-800 flex `}>
            <div className={`w-1/2 flex flex-col m-auto items-center ${modalVisible ? 'w-0' : ''}`}>
                {
                    modalVisible ? null :
                        <div className='text-white font-bold text-3xl'>Start Playing Now</div>
                }
                <div className={`flex-1 w-full mx-auto my-auto bg-blue-gray-200 rounded-lg mt-7 `}>
                    {
                        modalVisible ? null :
                            <div className='flex justify-between items-center py-3'>
                                <div className='ml-3 font-bold text-white'>Room Name</div>
                                <input type="text" className='outline-none border-none rounded-md h-7 w-2/5' placeholder='Search room name' />
                                <div className='mr-3 font-bold text-white'>Status</div>
                            </div>
                    }
                    <GameModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
                    <div className='overflow-y-auto h-96'>
                        <GameBox />
                    </div>
                    {
                        modalVisible ? null :
                            <div className="items-center flex justify-around sticky top-0 mt-auto py-2">
                                <motion.button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded flex"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Quick Start
                                </motion.button>
                                <motion.button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded flex"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setModalVisible(true)}
                                >
                                    Create Game
                                </motion.button>
                            </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default GameRooms;
