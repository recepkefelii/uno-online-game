import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../redux/features/User/UserSlice';


const Home = () => {

  const { nickname, status } = useSelector((state) => state.JoinRoomSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userCheck = () => {
    if (status) {
      navigate("/rooms")
    } else {
      navigate("/register")
    }
  }
  return (
    <div className="bg-blue1 h-screen flex items-center justify-center">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <div className="flex flex-col items-center mt-4">
          <motion.button
            className="bg-white text-blue1 border-r-8 border-blue2  h-20 w-80 text-3xl font-medium py-6 px-12 rounded-xl mt-4"
            onClick={userCheck}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
           PLAY
          </motion.button>
          <motion.button
            className="bg-white text-blue1 border-r-8 border-blue2 text-3xl h-20 w-80 font-medium py-6 px-12 rounded-xl mt-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            GUIDE
          </motion.button>
          <motion.button
            className="bg-white text-blue1 border-r-8 border-blue2 text-3xl w-80 font-medium py-6 px-12 rounded-xl mt-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            SOURCE CODE
          </motion.button>

        </div>
      </div>
    </div>
  );
};

export default Home;