import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import ProfilePhoto from '../components/Game/ProfilePhoto'
import BlankPhoto from '../components/Game/BlankPhoto'
const WaitingRoom = () => {
  const [deneme, useDeneme] = useState(2)
  const [deneme2, useDeneme2] = useState(1)
    const { gameid } = useParams();
  return (
    <div className='h-screen bg-gray-800'>
      <div>
      please wait for your friends
      </div>
        <div className='flex flex-row justify-center items-center h-full gap-10'>
        {
          [...Array(deneme)].map((index) => <ProfilePhoto key={index} />)
        }
        {
          [...Array(deneme2)].map((index) => <BlankPhoto key={index} />)
        }
        </div>
    </div>
  )
}

export default WaitingRoom