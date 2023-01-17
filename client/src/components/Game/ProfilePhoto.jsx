import { useState } from 'react'
import { identicon } from 'minidenticons'
import { BsQuestionLg } from 'react-icons/bs'

const ProfilePhoto = () => {
  const [deneme, setDeneme] = useState(true)
  return (
    <div className='flex flex-col justify-center items-center'>
      {
        deneme ? <>
          <div className='w-24 h-24 bg-white rounded-full border-spacing-2 border-b-light-green-700'>
            <identicon-svg username="jonh" saturation="95" lightness="60"></identicon-svg>
          </div>
          <div className="mt-2 text-overflow-ellipsis overflow-hidden w-28 whitespace-nowrap text-center">
            player name
          </div></> :
          <>
            <div className='w-24 h-24 bg-white rounded-full flex items-center justify-center'>
              <BsQuestionLg className='h-9 w-11' />
            </div>
            <div className="mt-2 text-overflow-ellipsis overflow-hidden w-28 whitespace-nowrap text-center">
              Waiting
            </div></>

      }
    </div>
  )
}

export default ProfilePhoto;
