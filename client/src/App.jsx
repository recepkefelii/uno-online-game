import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/games' element={""}/>
      <Route path='/create-game' element={""}/>
      <Route path='game/:gameid' element={""} />
    </Routes>
  )
}

export default App
