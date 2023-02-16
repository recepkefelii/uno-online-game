import React, { useState, useEffect } from 'react';
import GameBox from '../components/Menu/GameBox'
import { motion } from 'framer-motion';
import GameModal from '../components/Menu/GameModal'
import { useDispatch, useSelector } from "react-redux";
import JoinRoomSlice from '../redux/features/User/UserSlice';
import onSocketConnect from '../hooks/Socket/OnSocket';
import { useNavigate } from 'react-router';
import useGetRooms from '../hooks/Socket/Room/GetRooms';

const GameRooms = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { nickname } = useSelector((state) => state.JoinRoomSlice)
    if (nickname) {
        onSocketConnect(nickname)
    }

    return (
        <div className={`h-screen bg-gray-800 flex `}>
            <div className={`w-1/2 flex flex-col m-auto items-center`}>
                {
                    modalVisible ? null :
                        <div className='text-white font-bold text-3xl'>Start Playing Now</div>
                }
                <div className={`flex-1 w-full mx-auto my-auto bg-blue3 rounded-xl mt-7 border-4 border-sky-500 border-white `}>
                    <div>weqeqe</div>
                    <div>weqeqe</div>
                    <div>weqeqe</div>
                    <div>weqeqe</div>
                    <div>weqeqe</div>
                    <div>weqeqe</div>
                    <div>weqeqe</div>
                    <div className="bg-blue1 h-12 flex items-center  hover:bg-bluehover border-4 border-sky-500 border-white rounded-xl mt-2"
                    >
                        <div className="text-white font-bold px-4 flex-1 ">ewqeqeq</div>
                        <div className="text-white font-bold px-4 text-right flex-1">ewqeqeq</div>
                        <div className="text-white font-bold px-4 text-right flex-1">ewqeqeq</div>
                        <div className="text-white font-bold px-4 text-right flex-1">ewqeqeq</div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default GameRooms;
