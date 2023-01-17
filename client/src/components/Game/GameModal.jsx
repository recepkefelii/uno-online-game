import React from "react";
import { Radio } from "@material-tailwind/react";
import { motion } from 'framer-motion';

const GameModal = ({ modalVisible, setModalVisible }) => {
  if (!modalVisible) return null;
  return (
    <div>
      <div className={`flex flex-col justify-center items-center fixed top-0 left-0 h-screen w-screen rounded p-4 max-h-screen overflow-hidden ${modalVisible ? 'opacity-100' : ''}`}>
        <div className="text-white font-medium text-2xl pb-10">Create Room</div>
        <div className="h-1/4 w-1/4 bg-white rounded-md items-center">
          <div className="mb-4 pl-10 pt-3 flex-col justify-center items-center">
            <label htmlFor='name' className=" block text-gray-700 font-small p-2">Room Name</label>
            <input
              type="text"
              className="border border-gray-400 p-2 rounded-lg w-3/6 outline-none"
              placeholder="Enter your room name"
            />
          </div>
          <div className="pl-7 flex flex-row items-center">
            <div className="gap-20 mr-5">
              <Radio id="react" name="type" label="2" defaultChecked />
              <Radio id="react" name="type" label="3" />
              <Radio id="react" name="type" label="4" />
            </div>
            <div>Max Players</div>
          </div>
          <div className="flex justify-between mt-5 pl-5 pr-5">
            <motion.button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-700 rounded flex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalVisible(false)}
            >
              Back
            </motion.button>
            <motion.button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 border border-green-700 rounded flex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalVisible(true)}
            >
              Create Game
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameModal
