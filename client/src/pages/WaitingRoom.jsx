import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import ProfilePhoto from '../components/Game/ProfilePhoto'
import BlankPhoto from '../components/Game/BlankPhoto'
import { motion } from 'framer-motion';
import ShareButton from '../components/Game/ShareButton'


const WaitingRoom = () => {
  const [deneme, useDeneme] = useState(4)
  const [deneme2, useDeneme2] = useState(4)
  const { gameid } = useParams();
  return (
    <div className='h-screen bg-gray-800 overflow-hidden'>
      <div className='pl-5 pt-2 h-10 w-10'>
        <motion.button
          type="submit"
          className="bg-red-300 text-white font-bold py-1 px-2 rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </motion.button>
      </div>
      <div className='flex flex-col justify-center items-center h-full'>
        <div className='mb-5'>
          <ShareButton />
        </div>
        <div className='text-white font-bold text-2xl'>
          Please wait for your friends
        </div>
        <div className='flex gap-16 pt-10'>
          {
            [...Array(deneme)].map((index) => <ProfilePhoto key={index} />)
          }
        </div>
        <div className="mr-20 transform translate-x-1/2 translate-y-1/2 ">
          <div className="border-t-transparent border-solid animate-spin  rounded-full border-gray-400 border-8 h-24 w-24"></div>
        </div>

      </div>
    </div>
  )
}

export default WaitingRoom