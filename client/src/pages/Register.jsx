import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useUserPostData from '../hooks/UserPostData'

const Register = () => {
  const url = import.meta.env.VITE_REGISTER
  const { nickname, SubmitUserData, error, setNickName, isLoading, } = useUserPostData(url)

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <form onSubmit={SubmitUserData} className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-bold text-center mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor='name' className="block text-gray-700 font-boldm mb-2">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full"
            placeholder="Enter your nickname"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex items-center justify-center">
          <motion.button
            type="submit"
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'Loading...' : "Register"}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default Register;