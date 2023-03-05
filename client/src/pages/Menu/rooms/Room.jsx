import React, { useState } from 'react';
import Button from '../../../components/common/Button';
import CustomModal from '../../../components/common/Modal';


const Rooms = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className={`h-screen bg-gray-800 flex `}>
            <div className={`w-1/2 flex flex-col m-auto items-center`}>
                <div className='text-white font-bold text-3xl'>Start Playing Now</div>

                <div
                    onClick={openModal}
                    className={`flex-1 2xl:w-[800px] cursor-pointer  lg:w-[800px] max-co max-h-[500px]  overflow-auto  bg-blue3 rounded-xl mt-7 border-4 border-sky-500 border-white `}>
                    <div className="bg-blue1 h-12 flex items-center  hover:bg-bluehover border-4 border-sky-500 border-white rounded-xl m-3">
                        <div className="text-white font-bold px-4 flex-1 ">ewqeqeq</div>
                        <div className="text-white font-bold px-4 text-right flex-1">ewqeqeq</div>
                        <div className="text-white font-bold px-4 text-right flex-1">ewqeqeq</div>
                        <div className="text-white font-bold px-4 text-right flex-1">ewqeqeq</div>
                    </div>
                </div>
                <div className='mt-5 h-full w-[800px] flex justify-between'>
                    <Button text={"Quick Start"} width="100px" />
                    <Button text={"Reload"} width="100px" />
                </div>
                <CustomModal isOpen={modalIsOpen} onClose={closeModal} />
            </div>
        </div>

    );
};

export default Rooms;