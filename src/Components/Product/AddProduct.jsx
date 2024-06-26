import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import imagePlaceholder from '../../assets/uploadImagePlaceholder.jpg'
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { API } from '../../App';
import "./style.css"

const AddProduct = ({ closeModal, update }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: update });
  const [message, setMessage] = useState(null)
  const [Categories, setCategories] = useState(null)

  const onSubmit = async (data) => {
    var result
    if (!update) {
      result = await axios.post(`${API}/Products`, {
        ...data,
        Image: image
      }, {
        headers: {
          'Authorization': `Bearer ${token.token}`
        },
        validateStatus: false
      })
    } else {
      result = await axios.put(`${API}/Products/${update.id}`, {
        ...data,
        Image: image,
        imageId: imageId
      }, {
        headers: {
          'Authorization': `Bearer ${token.token}`
        },
        validateStatus: false
      })
    }
    if (result.status === 200 || result.status === 204) {
      closeModal(true)
      setMessage(null)
      setImage(null)
    } else if (result.status == 400) {
      setMessage("Fill all fields")
    }
    else {
      setMessage("Error Occured")
    }
  }

  const [image, setImage] = useState(null)
  const [token, setToken] = useContext(AuthContext)
  const [imageId, setImageId] = useState(null)

  const handleFileUpload = (e) => {
    const image123 = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result.toString())
    }
    reader.readAsDataURL(image123)
  }

  const getImage = async () => {
    if (update && update.id) {
      var resp = await axios.get(`${API}/Products/image?id=${update.id}`)
      if (resp.status == 200) {
        setImage(resp.data.image)
        setImageId(resp.data.id)
      }
    }
  }

  const getCategories = async () => {
    const result = await axios.get(`${API}/Categories`)
    if (result.status === 200) {
      setCategories(result.data)
    }
  }

  useEffect(() => {
    getImage()
    getCategories()
  }, [])

  return (
    <div className=''>
      <p className='text-2xl font-bold text-center mb-2'>{update ? 'Update' : 'Add new'} product</p>
      <div className='flex justify-start items-center gap-4 flex-col '>
        {message && <div className='text-red-500 text-lg'>{message}</div>}
        {/* <form onSubmit={handleSubmit(onSubmit)} className='grid grid-flow-row gap-5 w-11/12 md:w-3/4 lg:w-2/5'> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-5 justify-start items-center top-0 md:grid-flow-col md:gap-14' style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(400px,1fr))' }}>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-4 flex-col md:flex-row'>
                <input className="input input-bordered w-full" type="text" placeholder="Name" {...register("name", { required: true })} />
                <input className="input input-bordered w-full" type="number" placeholder="Price" {...register("price", { required: true })} />
              </div>
              <div className='flex gap-4 flex-col md:flex-row'>
                <input className="input input-bordered w-full" type="text" placeholder="Brand" {...register("brand", {})} />
                <input className="input input-bordered w-full" type="text" placeholder="Info" {...register("info", {})} />
              </div>
              <div className='flex gap-4'>
                {
                  Categories
                    ?
                    <select id='category' className="select select-bordered w-full" {...register("category", { required: true })}>
                      <option disabled selected>Select a category</option>
                      {
                        Categories.map((Category) => {
                          return <option key={Category.id} value={Category.name}>{Category.name}</option>
                        })
                      }
                    </select>
                    :
                    <div className='flex flex-1 gap-4 justify-center items-center'>
                      <span className="loading loading-spinner loading-sm"></span>
                      <div className='text-md'>Fetching categories</div>
                    </div>
                }

                <input className="input input-bordered w-full" type="text" placeholder="SubCategory" {...register("subCategory", {})} />
              </div>
              <textarea placeholder='Product description' className="textarea textarea-bordered" {...register("description", { required: true })} />
            </div>

            <div className='flex flex-col gap-4'>
              <div className='w-full flex justify-center items-center flex-col gap-2'>
                <img onError={() => setImage(null)} className='flex-1 border-2 shadow-md rounded-xl p-1 aspect-square h-40 max-h-40' src={image ? image : imagePlaceholder} alt="PLace" />
                <input type="file" className="file-input file-input-bordered w-full" onChange={handleFileUpload} />
                <div>OR</div>
                <input type="text" placeholder='Paste image URL' className="input input-bordered w-full" onChange={(e) => setImage(e.target.value)} />
              </div>
            </div>

          </div>
          <div className='flex gap-4 justify-end mt-5'>
            <div className="btn" onClick={() => {
              setMessage(null)
              setImage(null)
              closeModal()
            }} >Cancel</div>
            <input className="btn btn-primary " type="submit" value={update ? "Update" : "Add"} />
          </div>
        </form>
      </div>

    </div>
  )
}

export default AddProduct