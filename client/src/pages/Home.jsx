import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../redux/features/User/UserSlice';


const Home = () => {
  const { nickname,status } = useSelector((state) => state.JoinRoomSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const userCheck = () => {
    if(status){
     navigate("/rooms") 
    }else{
      navigate("/register")
    }
    }
  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <img src="src/assets/UnoLogo.png" alt="Uno Logo" className="mx-auto" height={200} width={300} />
        <div className="flex flex-col items-center mt-4">

          <motion.button
            onClick={userCheck}
            className="bg-red-500 text-2xl font-medium py-6 px-12 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Play
          </motion.button>
          <motion.button
            className="bg-yellow-500 text-2xl font-medium py-6 px-12 rounded-lg mt-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Settings
          </motion.button>
          <motion.button
            className="bg-green-500 text-2xl font-medium py-6 px-12 rounded-lg mt-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Source Code
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;