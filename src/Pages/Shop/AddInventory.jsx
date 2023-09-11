import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { API } from '../../App'
import ProductCard from '../../Components/Product/ProductCard'
import { Link } from 'react-router-dom'
import { BiSearchAlt } from "react-icons/bi";
import ShopProductsSearch from '../../Components/SearchBar/ShopProductsSearch'

const AddInventory = () => {

  const [token, setToken] = useContext(AuthContext)
  const [products, setProducts] = useState(null)
  const [search, setSearch] = useState("")

  const getProducts = async () => {
    var products = await axios.get(`${API}/Products/ProductsNotInInventory`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    // console.log(products)
    if (products.status === 200) {
      setProducts(products.data)
    }
  }

  const AddToInventory = async (ProductId, Quantity) => {
    var resp = await axios.post(`${API}/Inventories`, { ProductId, Quantity }, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    })
    if (resp.status == 200) {
      getProducts()
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const searchProds = async () => {
    if (search !== "" || search !== null) {
      var resp = await axios.post(`${API}/Products/Find`, {
        Name: search
      }, {
        headers: {
          'Authorization': `Bearer ${token.token}`
        },
        validateStatus: false
      })
      if (resp.status == 200) {
        setProducts(resp.data)
      } else {
        setProducts([])
      }
    }
  }

  const handleSearch = (event) => {
    if (event.key === 'Enter' && search !== "" && search != null) {
      searchProds()
    }
  }

  const handleSearchInput = (e) => {
    if (e.target.value === null || e.target.value === "") {
      getProducts()
      setSearch("")
    } else {
      setSearch(e.target.value)
    }
  }

  return (
    <>
      <div className='flex justify-center '>
        <div className="text-sm breadcrumbs pl-5 flex justify-between items-center w-11/12 lg:w-5/6">
          <ul className='text-lg'>
            <li><Link to={'../'}>Inventory</Link></li>
            <li className='text-gray-400'>Add</li>
          </ul>
          <ShopProductsSearch searchProds={searchProds} search={search} handleSearch={handleSearch} handleSearchInput={handleSearchInput} ph="Search Products"/>
        </div>
      </div>
      <div className='flex justify-center items-center gap-4 flex-col p-5'>
        {
          products
            ? products.length !== 0
              ?
              <div className='grid gap-5 w-11/12 lg:w-5/6' style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
                {
                  products.map((product, index) => {
                    return (
                      <ProductCard product={product} key={product.id} AddToInventory={AddToInventory} />
                    )
                  })
                }
              </div>
              : <div className='text-lg'>No products found</div>
            : <span className="loading loading-bars loading-lg text-success"></span>

        }
      </div>
    </>
  )
}

export default AddInventory