import { Route, Routes } from 'react-router'
import Register from './pages/Menu/auth/Register'
import Home from './pages/Home'
import Login from './pages/Menu/auth/Login'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
