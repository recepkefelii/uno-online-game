import React, {} from 'react';

const GameRooms = () => {
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
