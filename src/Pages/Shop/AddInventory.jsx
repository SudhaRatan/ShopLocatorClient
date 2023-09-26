import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { API } from '../../App'
import ProductCard from '../../Components/Product/ProductCard'
import { Link, useNavigate } from 'react-router-dom'
import ShopProductsSearch from '../../Components/SearchBar/ShopProductsSearch'
import AddProduct from '../../Components/Product/AddProduct'
import Pagination from '../../Components/Pagination/Pagination'

const AddInventory = () => {

  const [token, setToken] = useContext(AuthContext)
  const [products, setProducts] = useState(null)
  const [search, setSearch] = useState("")
  const [addToggle, setAddToggle] = useState(false)
  const navigate = useNavigate()

  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)


  const getProducts = async (way) => {
    setProducts(null)
    var products
    products = await axios.get(`${API}/Products/ProductsNotInInventory?page=${way === ">" ? count + 1 : way === "<" && count > 0 ? count - 1 : count}`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })

    if (products.status === 200) {
      if (products.data.products.length > 0) {
        setProducts(products.data.products)
        setCount(products.data.page)
        setPage(Math.ceil(products.data.count / 10))
      } else {
        getProducts()
      }
    } else {
      navigate('/login')
    }
  }

  const AddToInventory = async (ProductId, Quantity) => {
    var resp = await axios.post(`${API}/Inventories`, { ProductId, Quantity }, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus:false
    })
    if (resp.status === 200) {
      getProducts()
    }else if(resp.status === 400){
      alert(resp.data)
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

  const [updateProduct, setUpdateProduct] = useState(null)
  const editProduct = (product) => {
    modal.current.showModal()
    setAddToggle(true)
    setUpdateProduct(product)
  }

  return (
    <div className='relative'>
      <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
        <dialog onClose={() => console.log("Closed")} ref={modal} id="my_modal_4" className="modal modal-middle">
          <div className="modal-box w-11/12 max-w-5xl">
            {addToggle && <AddProduct closeModal={closeModal} update={updateProduct} />}
          </div>
        </dialog>
      </>
      <div className='flex justify-center '>
        <div className="text-sm breadcrumbs pl-5 flex flex-col lg:flex-row justify-between lg:items-center w-11/12 gap-2">
          <ul className='text-lg'>
            <li><Link to={'..'}>Inventory</Link></li>
            <li className='text-gray-400'>Add</li>
          </ul>
          <div className='flex gap-4'>
            <div className="btn btn-md btn-accent text-gray-100 hover:shadow-lg" onClick={addProduct}>Add new Product</div>
            <ShopProductsSearch searchProds={searchProds} search={search} handleSearch={handleSearch} handleSearchInput={handleSearchInput} ph="Search Products" />
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center gap-4 flex-col p-5 mb-7'>
        {
          products
            ? products.length !== 0
              ?
              <>
                <div className='grid gap-5 w-11/12' style={{ gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))" }}>
                  {
                    products.map((product, index) => {
                      return (
                        <ProductCard editProduct={editProduct} product={product} key={product.id} AddToInventory={AddToInventory} />
                      )
                    })
                  }
                </div>
                <Pagination count={count} get={getProducts} page={page} />
              </>
              : <div className='text-lg'>No products found</div>
            : <span className="loading loading-bars loading-lg text-success"></span>
        }
      </div>
    </div>
  )
}

export default AddInventory