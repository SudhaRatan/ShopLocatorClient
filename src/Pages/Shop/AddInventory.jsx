import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { API } from '../../App'
import ProductCard from '../../Components/Product/ProductCard'
import { Link } from 'react-router-dom'

const AddInventory = () => {

  const [token, setToken] = useContext(AuthContext)
  const [products, setProducts] = useState(null)

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

  return (
    <>
      <div className="text-sm breadcrumbs p-5">
        <ul>
          <li><Link to={'../'}>Inventory</Link></li>
          <li className='text-gray-400'>Add</li>
        </ul>
      </div>
      <div className='flex justify-center items-center gap-4 flex-col p-5'>
        {/* <div className='text-2xl font-bold'>Products</div> */}
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
              : <div>Products will appear here</div>
            : <span className="loading loading-bars loading-lg text-success"></span>

        }
      </div>
    </>
  )
}

export default AddInventory