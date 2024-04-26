import axios from 'axios'
import React from 'react'
import { API } from '../../App'
import { useEffect } from 'react'
import { useState } from 'react'
import ProductCardU from '../../Components/Product/ProductCardU'

function User() {

  const getProducts = async () => {
    var result = await axios.get(`${API}/Products`)
    console.log(result)
    setProducts(result.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const [Products, setProducts] = useState(null)

  return (
    <div className='flex flex-col justify-center items-center p-5 gap-4'>

      <div className='grid gap-5 w-11/12' style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))" }}>
        {
          Products
            ?
            Products.map((product) => {
              return (
                <ProductCardU key={product.id} product={product} />
              )
            })
            : null
        }
      </div>
    </div>
  )
}

export default User