import { useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'


function App() {

  return (
    <Routes>
      <Route path='/' element={""}/>
      <Route path='/login' element={""}/>
      <Route path='/games' element={""}/>
      <Route path='/create-game' element={""}/>
      <Route path='game/:gameid' element={""} />
    </Routes>
  )
}

export default App
