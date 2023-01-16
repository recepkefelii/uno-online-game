import React, { useState } from 'react';
import GameBox from '../components/GameBox'
import { motion } from 'framer-motion';
import GameModal from '../components/GameModal'
const GameRooms = () => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <div className="h-screen bg-gray-800 flex ">
            <div className='w-1/2 flex flex-col m-auto items-center'>
                <div className='text-white font-bold text-3xl'>Start Playing Now</div>
                <div className="flex-1 w-full mx-auto my-auto bg-slate-500 rounded-lg mt-7">
                    <div className='flex justify-between sticky top-0 items-center py-3'>
                        <div className='flex-1 ml-4 font-bold text-white'>Room Name</div>
                        <div className='flex-2 mr-4 font-bold text-white'>Status</div>
                    </div>
                    <div className='overflow-y-auto h-96'>
                        <GameBox />
                    </div>
                    <div className="items-center flex justify-around sticky top-0 mt-auto py-3">
                        <motion.button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded flex"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Quick Start
                        </motion.button>
                        <GameModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                        <motion.button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded flex"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setModalVisible(true)}
                        >
                            Create Game
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default GameRooms;
