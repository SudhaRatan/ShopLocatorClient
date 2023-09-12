import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { API } from '../../App'
import ProductCard from '../../Components/Product/ProductCard'
import { Link, useNavigate } from 'react-router-dom'
import { BiSearchAlt } from "react-icons/bi";
import ShopProductsSearch from '../../Components/SearchBar/ShopProductsSearch'
import AddProduct from '../../Components/Product/AddProduct'

const AddInventory = () => {

  const [token, setToken] = useContext(AuthContext)
  const [products, setProducts] = useState(null)
  const [search, setSearch] = useState("")
  const [addToggle,setAddToggle] = useState(false)
  const navigate = useNavigate()

  const getProducts = async () => {
    setProducts(null)
    var products = await axios.get(`${API}/Products/ProductsNotInInventory`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    // console.log(products)
    if (products.status === 200) {
      setProducts(products.data)
    } else {
      navigate('/login')
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

  const modal = useRef()

  const addProduct = () => {
    modal.current.showModal()
    setAddToggle(true)
    setUpdateProduct(null)
  }

  const closeModal = (refresh) => {
    modal.current.close()
    setUpdateProduct(null)
    setAddToggle(false)
    if (refresh) {
      getProducts()
    }
  }

  const [updateProduct,setUpdateProduct] = useState(null)
  const doubleClick = (product) => {
    modal.current.showModal()
    setAddToggle(true)
    setUpdateProduct(product) 
  }

  return (
    <>
      <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
        <dialog ref={modal} id="my_modal_4" className="modal modal-middle">
          <div className="modal-box w-11/12 max-w-5xl">
            {addToggle && <AddProduct closeModal={closeModal} update={updateProduct}/>}
          </div>
        </dialog>
      </>
      <div className='flex justify-center '>
        <div className="text-sm breadcrumbs pl-5 flex flex-col lg:flex-row justify-between lg:items-center w-11/12 lg:w-5/6 gap-2">
          <ul className='text-lg'>
            <li><Link to={'../'}>Inventory</Link></li>
            <li className='text-gray-400'>Add</li>
          </ul>
          <div className='flex gap-4'>
            <div className="btn btn-md btn-accent text-gray-100 hover:shadow-lg" onClick={addProduct}>Add new Product</div>
            <ShopProductsSearch searchProds={searchProds} search={search} handleSearch={handleSearch} handleSearchInput={handleSearchInput} ph="Search Products" />
          </div>
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
                      <ProductCard product={product} key={product.id} doubleClick={doubleClick} AddToInventory={AddToInventory} />
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