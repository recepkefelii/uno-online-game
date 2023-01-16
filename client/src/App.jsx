import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import GameRooms from './pages/Room'
import WaitingRoom from './pages/WaitingRoom'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/rooms' element={<GameRooms/>}/>
      <Route path='/rooms-waiting/:gameid' element={<WaitingRoom/>}/>
      <Route path='/create-game' element={""}/>
      <Route path='game/:gameid' element={""} />
    </Routes>
  )
}

export default App
