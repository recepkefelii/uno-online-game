import React from 'react'
import { identicon } from 'minidenticons'

const ProfilePhoto = () => {
  return (
        <div className='w-24 h-24 bg-white rounded-full'>
          <identicon-svg username="jonh" saturation="95" lightness="60"></identicon-svg>
        </div>
  )
}

export default ProfilePhoto;
