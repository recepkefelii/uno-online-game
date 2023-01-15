import {useState} from 'react'

const GameBox = () =>{
    const [rooms, setRooms] = useState([
        { name: 'Room1', capacity: 4, current: 2 },
        { name: 'Room2', capacity: 6, current: 4 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
        { name: 'Room3', capacity: 8, current: 1 },
      ]);
      

    return (
       <>
       {
        rooms.map((index,item) => (
            <div className="bg-blue-500 h-14 flex items-center mt-5 hover:bg-blue-400 border border-blue-700 rounded">
      <div className="text-white font-bold px-4 flex-1 ">Room Name</div>
  <div className="text-white font-bold px-4 text-right flex-1">4/2</div>
</div>
        ))
       }
       </>
    

    )
}

export default GameBox;