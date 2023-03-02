import { Route, Routes } from 'react-router'
import Register from './pages/menu/auth/Register'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
