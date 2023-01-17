import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Register from './pages/Register'
import GameRooms from './pages/Room'
import WaitingRoom from './pages/WaitingRoom'

function App() {
  return (
    <Routes>
      <Route index  element={<Home />}></Route>
      <Route path='/register' element={<Register />} />
      <Route path='/rooms' element={<GameRooms />} />
      <Route path='/rooms/:gameid' element={<WaitingRoom />} />
    </Routes>
  )
}

export default App
