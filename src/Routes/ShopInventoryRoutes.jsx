import { Routes, Route, Navigate } from "react-router-dom"
import AddInventory from "../Pages/Shop/AddInventory"
import axios from "axios"
import { useContext, useEffect } from "react"
import { API } from "../App"
import { AuthContext } from "../Context/AuthContext"
import { ShopContext } from "../Context/ShopContext"
import { AlertContext } from "../Context/AlertContext"

const ShopInventoryRoutes = () => {

  const [token, setToken] = useContext(AuthContext)
  const [shopAccess, setShopAccess] = useContext(ShopContext)
  const [alert, setAlert] = useContext(AlertContext)

  const getAddress = async () => {
    var result = await axios.get(`${API}/ShopAddresses`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    if (result.status === 200) {
      setShopAccess(true)
    }else{
      setShopAccess(false)
      setAlert({ show: true, message: "Add address to continue", type:"warning" })
    }
  }

  useEffect(() => {
    getAddress()
  }, [])

  return (
    <>
      {
        shopAccess
          ?
          <Routes>
            <Route path="Add" element={<AddInventory />} />
          </Routes>
          :
          <Navigate to={'/Shop/Account'} />
      }
    </>
  )
}

export default ShopInventoryRoutes