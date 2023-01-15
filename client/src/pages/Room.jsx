import React, { useState } from 'react';
import GameBox from '../components/GameBox'
import { motion } from 'framer-motion';
const GameRooms = () => {
  

  return (
    <div className="h-screen bg-gray-800 flex ">
  <div className="w-1/2 h-1/2 mx-auto my-auto bg-slate-500 rounded-lg">
    <div className='flex justify-between sticky top-0'>
        <div className='flex-1 ml-4 font-bold text-white'>Room Name</div>
        <div className='flex-2 mr-4 font-bold text-white'>Status</div>
    </div>
    <div className='overflow-y-scroll h-5/6'>
      <GameBox/>
    </div>
    <div className="flex justify-around sticky top-0">
    <motion.button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded flex"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    >
  Quick Start
</motion.button>
      <motion.button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded flex"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      >
  Create Game
</motion.button>
    </div>
  </div>
</div>





  
  );
};

export default GameRooms;
