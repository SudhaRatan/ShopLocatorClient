import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import { API } from '../../App'
import InventoryCard from '../../Components/Inventory/InventoryCard'
import demo from "../../Images/demo.png"
export const placeHolderImage = demo

function Shop() {

  const [inventories, setInventories] = useState(null)
  const [token, setToken] = useContext(AuthContext)

  const getInventories = async () => {
    var res = await axios.get(`${API}/Inventories`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    if (res.status == 200) {
      setInventories(res.data)
    }
  }

  const deleteInventory = async (id) => {
    // console.log(id)
    var response = await axios.delete(`${API}/Inventories/${id}`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    if (response.status === 200)
      getInventories()
  }

  useEffect(() => {
    getInventories()
  }, [])

  return (
    <div className='flex justify-center items-center gap-4 flex-col p-5'>
      <div className='flex gap-4'>
        <Link to={'/Shop/Inventory/Add'} className="btn btn-accent text-gray-100 hover:shadow-lg">Add to inventory</Link>
        <Link to={'/Shop/AddProduct'} className="btn btn-accent text-gray-100 hover:shadow-lg">Products</Link>
      </div>
      <h2 className='text-4xl font-bold'>Inventory</h2>
      {
        inventories
          ?
          inventories.length !== 0
          ?
          <div className='grid gap-5 w-11/12 lg:w-5/6' style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
            {
              inventories.map((inventory, index) => {
                return (
                  <InventoryCard inventory={inventory} key={inventory.id} deleteInventory={deleteInventory} />
                )
              })
            }
          </div>
          : <div>Add products to the inventory to appear here</div>
          :
          <span className="loading loading-bars loading-lg text-success"></span>
      }
    </div>
  )
}

export default Shop