import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Register = () => {
  const [nickname, setNickname] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-medium text-center mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full"
            placeholder="Enter your nickname"
          />
        </div>
        <div className="flex items-center justify-center">
          <motion.button
            type="submit"
            className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default Register;