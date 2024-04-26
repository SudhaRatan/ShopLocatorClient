import { useState } from "react"
import Placeholder from "../../assets/uploadImagePlaceholder.png"
import { forwardRef } from "react"
import { useImperativeHandle } from "react"
import axios from "axios"
import { API } from "../../App"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { AlertContext } from "../../Context/AlertContext"

const AddCategory = forwardRef(({ close, refresh }, ref) => {

  const [categoryName, setCategoryName] = useState('')
  const [image, setImage] = useState('')
  const [token, setToken] = useContext(AuthContext)
  const [alert, setAlert] = useContext(AlertContext)

  const handleFileUpload = (e) => {
    const image123 = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result.toString())
    }
    reader.readAsDataURL(image123)
  }

  useImperativeHandle(ref, () => ({
    reset() {
      setImage("")
      setCategoryName("")
    }
  }))

  const uploadCategory = async () => {
    const result = await axios.post(`${API}/Categories`, {
      name: categoryName,
      image
    }, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    console.log(result)
    if (result.status === 200) {
      setAlert({
        show: true,
        message: "Added successfully!",
        type: "success"
      })
      close()
      refresh()
    } else {
      setAlert({
        show: true,
        message: result.data.detail,
        type: "error"
      })
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className='w-full bg-transparent flex flex-col gap-5 md:flex-row md:items-end justify-center'>
        <div className="flex flex-col flex-1 w-full">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category name</span>
            </label>
            <input onChange={(e) => setCategoryName(e.target.value)} value={categoryName} type="text" placeholder="Category" className="input input-bordered w-full" />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text flex items-center">Paste URL <div className="font-semibold text-xl">&nbsp;↓&nbsp;</div> or Upload image <div className="font-semibold text-xl">&nbsp;→</div></span>
            </label>
            <input onChange={(e) => setImage(e.target.value)} value={image} type="text" placeholder="Image URL" className="input input-bordered w-full" />
          </div>
        </div>
        <div className="border-2 rounded-lg flex justify-center w-fit">
          <input onChange={handleFileUpload} type="file" id="imgupload" className="hidden" />
          <label htmlFor="imgupload">
            <img width={140} className="aspect-square rounded-lg bg-cover object-cover bg-center" src={image !== "" ? image : Placeholder} alt="category image" />
          </label>
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <div onClick={close} className="btn">Cancel</div>
        <div onClick={uploadCategory} className="btn btn-primary">Save</div>
      </div>
    </div>
  )
})

export default AddCategory