import React, { useEffect, useState, useContext } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import axios from 'axios';
import { API } from '../../App';
import { placeHolderImage } from '../../Pages/Shop/Shop';
import { AuthContext } from '../../Context/AuthContext';
import { MdOutlineInventory2 } from "react-icons/md";
const ProductCard = (props) => {

  const [product, setProducts] = useState(props.product)
  const [image, setImage] = useState(null)
  const [token, setToken] = useContext(AuthContext)
  const [count, setCount] = useState(1)
  // console.log(props.product)

  const increment = () => {
    setCount(count + 1)
  }
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }


  const getImage = async () => {
    var resp = await axios.get(`${API}/Products/image?id=${props.product.id}`)
    if (resp.status == 200) {
      setImage(resp.data.image)
    }
  }

  useEffect(() => {
    getImage()
  }, [])

  return (
    <div className="card rounded-md bg-base-100 drop-shadow-xl" onDoubleClick={() => props.doubleClick(props.product)}>
      <div className='flex justify-center items-center min-w-full'><img style={{ aspectRatio: '4/3' }} src={image ? image : placeHolderImage} alt="Shoes" className='image-full rounded-t-md rounded-r-md' /></div>
      <div className="card-body">
        <p>{product.brand && product.brand}</p>
        <h2 className="card-title">{product.name}</h2>
        <p className='overflow-ellipsis whitespace-nowrap overflow-hidden'>{product.description}</p>
        <p>{product.info && product.info}</p>
        <div className="card-actions justify-end">
          <div className='tooltip border-2 p-1 rounded-lg shadow-md cursor-pointer' data-tip="Add to inventory" onClick={() => props.AddToInventory(product.id,count)}>
            <MdOutlineInventory2 size={18} className='text-green-500' />
          </div>
          <div className="flex justify-center items-center border-2 rounded-lg shadow-md p-1 text-green-500">
            {
              product.quantity <= 1
                ? <AiOutlineDelete size={18} color='#ef4444' onClick={() => props.deleteInventory(product.id)} className='cursor-pointer' />
                : <AiOutlineMinus size={18} onClick={decrement} className='cursor-pointer' />
            }
            <span className="countdown font-mono text-xl">
              <span className='pl-3' style={{ "--value": count }}></span>
            </span>
            <AiOutlinePlus size={18} onClick={increment} className='cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard