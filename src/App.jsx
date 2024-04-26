import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import User from './Pages/User/User'
import Cart from './Pages/User/Cart'
import Orders from './Pages/User/Orders'
import Shop from './Pages/Shop/Shop'
import Login from './Pages/Login'
import Navbar from './Components/navbar/Navbar'
import { useState } from 'react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import ShopInventoryRoutes from './Routes/ShopInventoryRoutes'
import Account from './Pages/Shop/Account'
import { AuthContext } from './Context/AuthContext'
import { ShopContext } from './Context/ShopContext'
import { AlertContext } from './Context/AlertContext'
import Alert from './Components/Alert/Alert'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminHome from './Pages/Admin/AdminHome'
import AddInventory from './Pages/Shop/AddInventory'
import Categories from './Pages/Admin/Categories'

export const API = import.meta.env.VITE_API_KEY

function App() {

  const [token, setToken] = useState({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role')
  })
  const [shopAccess, setShopAccess] = useState(true)

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  const [theme, setTheme] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    message: null,
  })

  const toggleTheme = () => {
    setTheme(!theme)
  }

  return (
    <div data-theme={theme ? "dark" : "light"} className='h-full w-full overflow-auto'>
      <AuthContext.Provider value={[token, setToken]}>
        <AlertContext.Provider value={[alert, setAlert]}>

          <BrowserRouter>
            <Navbar toggleTheme={toggleTheme} />
            <Alert />
            <Routes>
              <Route path="*" element={
                <>
                  <Routes>
                    <Route path='' element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='AdminLogin' element={<AdminLogin />} />
                    <Route path="*" element={<Navigate to={'/login'} />} />
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
                      <Route path='Cart' element={<Cart />} />
                      <Route path='Orders' element={<Orders />} />
                    </Routes>
                  </>
                } />
              }
              {
                token.role === 'Shop' &&
                <Route path="Shop/*" element={
                  token.role === 'Shop' &&
                  <ShopContext.Provider value={[shopAccess, setShopAccess]}>
                    <Routes>
                      {['', 'Inventory'].map((path, index) => <Route path={path} key={index} element={<Shop />} />)}
                      <Route path='Inventory/*' element={<ShopInventoryRoutes />} />
                      <Route path='Account' element={<Account />} />
                    </Routes>
                  </ShopContext.Provider>
                } />
              }
              {
                token.role === 'Admin' &&
                <Route path='Admin/*' element={
                  <Routes>
                    <Route path='/' element={<AdminHome />} />
                    <Route path='Products' element={<AddInventory />} />
                    <Route path='Categories' element={<Categories />} />
                    <Route path='Users' element={<div>Users</div>} />
                    <Route path='Shops' element={<div>Shops</div>} />
                    <Route path="*" element={<Navigate to={'/login'} />} />
                  </Routes>
                } />
              }
            </Routes>
          </BrowserRouter>
        </AlertContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
