import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import { API } from '../../App'
import InventoryCard from '../../Components/Inventory/InventoryCard'
import demo from "../../Images/demo.png"
import ShopProductsSearch from '../../Components/SearchBar/ShopProductsSearch'
export const placeHolderImage = demo

function Shop() {

  const [inventories, setInventories] = useState(null)
  const [store, setStore] = useState(inventories)
  const [token, setToken] = useContext(AuthContext)
  const [search, setSearch] = useState("")

  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  const getInventories = async (way) => {
    var res = await axios.get(`${API}/Inventories?page${way === ">" ? count + 1 : way === "<" && count > 0 ? count - 1 : count}`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    if (res.status == 200) {
      if (res.data.inventories.length > 0) {
        setInventories(res.data.inventories)
        setStore(res.data.inventories)
        setCount(res.data.page)
        // console.log(res.data)
      } else {
        setInventories([])
      }
    } else {
      localStorage.clear()
      navigate('/login')
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

  const searchProds = async (s) => {
    if (s !== "" || s !== null) {
      let newArray = store.filter(item => {
        var name = item.product.name
        var st = s
        return `${name}`.toLowerCase().includes(st.toLowerCase())
      });
      setInventories(newArray)
    }
  }

  const handleSearch = (event) => {
    if (event.key === 'Enter' && search !== "" && search != null) {
      searchProds()
    }
  }

  const handleSearchInput = (e) => {
    if (e.target.value === "") {
      setSearch("")
      setInventories(store)
    } else {
      setSearch(e.target.value)
      searchProds(e.target.value)
    }
  }

  return (
    <div className='flex justify-center items-center gap-4 flex-col p-5'>
      <div className='flex gap-4 justify-between w-11/12  pl-5 flex-col lg:flex-row lg:items-center ' >
        <h2 className='text-4xl font-bold'>Inventory</h2>
        <div className='flex gap-4 lg:flex-row flex-col items-start'>
          <Link to={'/Shop/Inventory/Add'} className="btn btn-accent text-gray-100 hover:shadow-lg">Products</Link>
          <ShopProductsSearch searchProds={searchProds} search={search} handleSearch={handleSearch} handleSearchInput={handleSearchInput} ph="Search Inventory" />
        </div>
      </div>
      {
        inventories
          ?
          inventories.length !== 0
            ?
            <div className='grid gap-5 w-11/12' style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))" }}>
              {
                inventories.map((inventory, index) => {
                  return (
                    <InventoryCard inventory={inventory} key={inventory.id} deleteInventory={deleteInventory} />
                  )
                })
              }
            </div>
            :
            <div>Add products to the inventory to appear here</div>
          :
          <span className="loading loading-bars loading-lg text-success"></span>
      }
    </div>
  )
}

export default Shop