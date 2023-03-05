import { Route, Routes } from 'react-router'
import Register from './pages/Menu/auth/Register'
import Home from './pages/Home'
import Login from './pages/Menu/auth/Login'
import Rooms from './pages/Menu/rooms/Room'
import Profile from './pages/Profile'
import Waiting from './pages/Menu/rooms/Waiting'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/rooms' element={<Rooms />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/rooms/:gameId' element={<Waiting />} />
    </Routes>
  )
}

export default App
