import './App.css'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import User from './Pages/User/User'
import Shop from './Pages/Shop/Shop'
import Login from './Pages/Login'
import Navbar from './Components/navbar/Navbar'
import { AuthContext } from './Context/AuthContext'
import { useState } from 'react'
import AddInventory from './Pages/Shop/AddInventory'
import AddProduct from './Pages/Shop/AddProduct'
export const API = import.meta.env.VITE_API_KEY

function App() {

  const [token, setToken] = useState({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role')
  })

  return (
    <div>
      <AuthContext.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="*" element={
              <>
                <Routes>
                  <Route path='' element={<Home />} />
                  <Route path='login' element={<Login />} />
                  <Route path="*" element={<Navigate to={'login'} />} />
                </Routes>
              </>
            } />
            {
              token.role === 'User' &&
              <Route path="User/*" element={
                token.role === 'User' &&
                <>
                  <Routes>
                    <Route path='' element={<User />} />
                    <Route path='hi' element={<div>Hi</div>} />
                  </Routes>
                </>
              } />
            }
            {
              token.role === 'Shop' &&
              <Route path="Shop/*" element={
                token.role === 'Shop' &&
                <>
                  <Routes>
                    {['', 'Inventory'].map((path, index) => <Route path={path} key={index} element={<Shop />} />)}
                    <Route path='Inventory/Add' element={<AddInventory />} />
                    <Route path='AddProduct' element={<AddProduct />} />
                  </Routes>
                </>
              } />
            }
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App
