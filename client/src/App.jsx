import { Route, Routes } from 'react-router'
import Register from './pages/menu/auth/Register'
import Home from './pages/Home'
import Login from './pages/menu/auth/Login'
import Rooms from './pages/menu/rooms/Room'
import Profile from './pages/Profile'
import Waiting from './pages/menu/rooms/Waiting'
import Game from './pages/game/Game'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/rooms' element={<Rooms />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/rooms/:gameId' element={<Waiting />} />
      <Route path='/rooms/:gameId/started' element={<Game />} />
    </Routes>
  )
}

export default App
