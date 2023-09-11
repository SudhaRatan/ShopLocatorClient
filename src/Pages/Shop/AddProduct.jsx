import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import imagePlaceholder from '../../Images/placeholder.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { API } from '../../App';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    var result = await axios.post(`${API}/Products`, {
      ...data,
      Image: image
    }, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    })
    if (result.status === 200) {
      navigate('../')
    }
  }

  const [image, setImage] = useState(null)
  const [token, setToken] = useContext(AuthContext)
  const navigate = useNavigate()

  const handleFileUpload = (e) => {
    const image123 = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result.toString())
    }
    reader.readAsDataURL(image123)
  }

  return (
    <>
      {/* <p className='text-2xl font-bold'>Add new product</p> */}
      <div className="text-sm breadcrumbs p-4">
        <ul>
          <li><Link to={'../'}>Inventory</Link></li>
          <li className='text-gray-400'>Add a product</li>
        </ul>
      </div>
      <div className='flex justify-center items-center gap-4 flex-col p-5 w-full'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-5 justify-center items-center top-0 md:grid-flow-col-dense md:gap-14' style={{gridTemplateColumns:'repeat(auto-fit,minmax(400px,1fr))'}}>
        {/* <form onSubmit={handleSubmit(onSubmit)} className='grid grid-flow-row gap-5 w-11/12 md:w-3/4 lg:w-2/5'> */}

          <div className='flex flex-col gap-4'>
            <div className='flex gap-4'>
              <input className="input input-bordered w-full" type="text" placeholder="Name" {...register("Name", { required: true })} />
              <input className="input input-bordered w-full" type="number" placeholder="Price" {...register("Price", { required: true })} />
            </div>
            <div className='flex gap-4'>
              <input className="input input-bordered w-full" type="text" placeholder="Brand" {...register("Brand", {})} />
              <input className="input input-bordered w-full" type="text" placeholder="Info" {...register("Info", {})} />
            </div>
            <div className='flex gap-4'>
              <select className="select select-bordered w-full" {...register("Category", { required: true })}>
                <option disabled selected>Select a category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Canned Goods">Canned Goods</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Snacks">Snacks</option>
                <option value="Cereal">Cereal</option>
                <option value="Beverages">Beverages</option>
                <option value="Stationary">Stationary</option>
              </select>
              <input className="input input-bordered w-full" type="text" placeholder="SubCategory" {...register("SubCategory", {})} />
            </div>
            <textarea placeholder='Product description' className="textarea textarea-bordered" {...register("Description", { required: true })} />
          </div>

          <div className='flex flex-col gap-4'>
            <div className='w-full flex justify-center items-center flex-col gap-4'>
              <img className='w-2/3 flex-1 border-2 shadow-md rounded-xl p-1' style={{ aspectRatio: '4/3' }} src={image ? image : imagePlaceholder} alt="PLace" />
              <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileUpload} />
            </div>
            <div className='flex gap-4'>
              <Link className="btn flex-1" type="submit" to={'../'} >Cancel</Link>
              <input className="btn btn-primary flex-1" type="submit" value="Add" onClick={AddProduct} />
            </div>
          </div>

        </form>
      </div>
    </>
  )
}

export default AddProduct