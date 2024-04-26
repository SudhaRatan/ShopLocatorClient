import React, { useState, useRef } from 'react'
import CategoryCard from '../../Components/AdminCards/CategoryCard';
import { Link } from 'react-router-dom';
import ShopProductsSearch from '../../Components/SearchBar/ShopProductsSearch';
import AddCategory from '../../Components/AdminCards/AddCategory';
import axios from "axios"
import { useEffect } from 'react';
import { API } from '../../App';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { AlertContext } from '../../Context/AlertContext';

const Categories = () => {

  const categoryForm = useRef()
  const categoryAdd = useRef()
  const [token, setToken] = useContext(AuthContext)
  const [alert, setAlert] = useContext(AlertContext)

  const reset = () => {
    categoryAdd.current.reset()
  }

  const closeCategoryForm = () => {
    categoryForm.current.close()
  }

  const getCategories = async () => {
    const result = await axios.get(`${API}/Categories`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    if (result.status === 200) {
      setCategories(result.data)
    }
  }

  const refresh = () => {
    getCategories()
  }

  const deleteCategory = async (id) => {
    const result = await axios.delete(`${API}/Categories/${id}`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    if (result.status === 204) {
      refresh()
    } else {
      setAlert({
        show: true,
        message: "Error occured",
        type: "error"
      })
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const [categories, setCategories] = useState(null);

  return (
    <div className='flex flex-col justify-center py-4 px-10 gap-5'>
      <div className="text-sm breadcrumbs flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <ul className='text-lg'>
          <li><Link className='font-semibold' to={'..'}>Manage</Link></li>
          <li className='text-gray-400'>Categories{categories && ` (${categories.length})`}</li>
        </ul>
        <div className='flex items-start gap-4 md:flex-row flex-col'>
          <div onClick={() => categoryForm.current.showModal()} className="btn btn-md btn-accent text-gray-100 hover:shadow-lg" >Add new Category</div>
          <ShopProductsSearch ph="Search Categories" />
        </div>
      </div>
      {
        categories
          ?
          categories.length > 0
          ?
          <div className='grid justify-center items-center gap-8' style={{ gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)" }}>
            {
              categories.map((item) => {
                return <CategoryCard key={item.id} id={item.id} name={item.name} image={item.image} deleteCategory={deleteCategory} />
              })
            }
          </div> : <div className='text-center font-semibold text-2xl'>Add categories to display here</div>
          :
          <div className='flex justify-center'>
            <span className="loading loading-bars loading-lg text-accent"></span>
          </div>
      }
      <dialog className='modal' onClose={reset} ref={categoryForm} >
        <div className='modal-box'>
          <AddCategory close={closeCategoryForm} refresh={refresh} ref={categoryAdd} />
        </div>
      </dialog>
    </div>
  )
}

export default Categories