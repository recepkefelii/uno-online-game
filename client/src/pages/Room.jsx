import React, { useState } from 'react';
import GameBox from '../components/GameBox'

const GameRooms = () => {
  

  return (
    <div class="flex items-center h-screen bg-gray-800">
  <div class="w-1/2 h-1/2 mx-auto my-auto overflow-auto  bg-slate-500 rounded-lg">
    <div className='flex justify-between'>
        <div className='flex-1 ml-4'>Room Name</div>
        <div className='flex-2 mr-4'>Status</div>
    </div>
    <GameBox/>
  </div>
</div>

  
  );
};

export default GameRooms;
