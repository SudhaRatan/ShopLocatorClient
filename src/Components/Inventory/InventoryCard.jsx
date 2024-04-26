import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import axios from 'axios';
import { API } from '../../App';
import { placeHolderImage } from '../../Pages/Shop/Shop';
import { AuthContext } from '../../Context/AuthContext';

const InventoryCard = (props) => {

  const [inventory, setInventory] = useState(props.inventory)
  const [image, setImage] = useState(null)
  const [token, setToken] = useContext(AuthContext)
  const [count, setCount] = useState(0)
  // console.log(props.inventory)

  const increment = () => {
    setInventory(prev => ({ ...prev, quantity: prev.quantity + 1 }))
    setCount(count + 1)
  }
  const decrement = () => {
      setInventory(prev => ({ ...prev, quantity: prev.quantity - 1 }))
      setCount(count - 1)
  }
  const UpdateQuantity = async () => {
    var count = await axios.put(`${API}/Inventories`, inventory, {
      headers: {
        'Authorization': `Bearer ${token.token}`,
      },
      validateStatus: false
    })
    if (count.status === 200){
      setCount(0)
    }
  }

  const getImage = async () => {
    var resp = await axios.get(`${API}/Products/image?id=${props.inventory.productId}`)
    if (resp.status == 200) {
      setImage(resp.data.image)
    }
  }

  useEffect(() => {
    getImage()
  }, [])

  return (
    <div className="card rounded-md bg-base-100 drop-shadow-xl">
      <div className='flex justify-center items-center min-w-full'><img src={image ? image : placeHolderImage} alt="Shoes" className='image-full rounded-t-md aspect-square' /></div>
      <div className="card-body p-4">
        <p>{inventory.product.brand && inventory.product.brand}</p>
        <h2 className="font-bold overflow-ellipsis whitespace-nowrap overflow-hidden">{inventory.product.name}</h2>
        <p className='overflow-ellipsis whitespace-nowrap overflow-hidden'>{inventory.product.description}</p>
        <p>{inventory.product.info && inventory.product.info}</p>
        <div className="card-actions justify-end">
          {
            count !== 0 
            &&
            <div className='tooltip border-2 p-1 rounded-lg shadow-md cursor-pointer' data-tip="Save" onClick={UpdateQuantity}>
              <AiOutlineSave size={18} className='text-green-500' />
            </div>
          }
          <div className="flex justify-center items-center border-2 rounded-lg shadow-md p-1 text-green-500">
            {
              inventory.quantity <= 1
                ? <AiOutlineMinus size={18} color='#21155e' className='cursor-pointer' />
                : <AiOutlineMinus size={18} onClick={decrement} className='cursor-pointer' />
            }
            <span className="countdown font-mono text-xl">
              <span className='pl-3' style={{ "--value": inventory.quantity }}></span>
            </span>
            <AiOutlinePlus size={18} onClick={increment} className='cursor-pointer' />
          </div>
          <div className='tooltip border-2 p-1 rounded-lg shadow-md cursor-pointer' data-tip="Remove" onClick={UpdateQuantity}>
            <AiOutlineDelete size={18} color='#ef4444' onClick={() => props.deleteInventory(inventory.id)} className='cursor-pointer' />
          </div>

        </div>
      </div>
    </div>
  )
}

export default InventoryCard