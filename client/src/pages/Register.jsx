import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useUserPostData from '../hooks/Game/UserPostData'

const Register = () => {
  const url = import.meta.env.VITE_REGISTER
  const { nickname, SubmitUserData, error, setNickName, isLoading, } = useUserPostData(url)
  return (
    <div className="bg-blue1 h-screen flex items-center justify-center">
      <div>
        <div className='flex justify-center text-4xl text-white mb-5'>Register</div>
        <form onSubmit={SubmitUserData} className="bg-blue3 rounded-lg p-6 border-r-4 border-b-4 border-blue4">
          <div className='flex items-center m-6'>
            <input
              value={nickname}
              onChange={(e) => setNickName(e.target.value)}
              placeholder='Enter your nickname' type="text" className='placeholder-white pl-4 text-white cursor-text placeholder- bg-blue4 h-9 w-full border-none outline-none rounded-md  shadow-md shadow-blue1' />
            <motion.button className='bg-white text-blue1 ml-10 h-9 w-52 rounded-xl'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}>Register
            </motion.button>
          </div>
        </form>
        {error && <div className="text-red-800">{error}</div>}
      </div>
    </div>
  );
};

export default Register;