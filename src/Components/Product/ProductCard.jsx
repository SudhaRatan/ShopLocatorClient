import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import axios from 'axios';
import { API } from '../../App';
import { placeHolderImage } from '../../Pages/Shop/Shop';
import { MdDelete, MdOutlineInventory2 } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { FiDelete, FiEdit2, FiEdit3 } from "react-icons/fi";

const ProductCard = (props) => {

  const [product, setProducts] = useState(props.product)
  const [image, setImage] = useState(null)
  const [count, setCount] = useState(1)
  const [token, setToken] = useContext(AuthContext)
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

  const [click, setClick] = useState(false)
  return (
    <>
      <div className={`flip-card-inner`}>
        <div className={`flip-card-front rounded-md bg-base-100 drop-shadow-xl`} style={{
          transform: click ? 'rotateY(180deg)' : null,
          transition: 'all 0.6s'
        }}>
          <div className='absolute border-[1px] border-base-100 cursor-pointer right-0 text-accent m-2 rounded-full' onClick={() => setClick(!click)}><BsInfoCircleFill className='bg-base-100 rounded-full ' size={18} /></div>
          <div className='flex justify-center items-center min-w-full'><img src={image ? image : placeHolderImage} alt="Shoes" className='w-full rounded-t-md aspect-square' /></div>
          <div className="card-body p-4">
            <p>{product.brand && product.brand}</p>
            <h2 className="font-bold overflow-ellipsis whitespace-nowrap overflow-hidden">{product.name}</h2>
            <p className='overflow-ellipsis whitespace-nowrap overflow-hidden'>{product.description}</p>
            <p>{product.info && product.info}</p>
            {
              token.role === 'Shop'
              &&
              <div className="card-actions justify-end">
                <div className='tooltip border-2 p-1 rounded-lg shadow-md cursor-pointer' data-tip="Add to inventory" onClick={() => props.AddToInventory(product.id, count)}>
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
            }
          </div>
        </div>
        <div className={`flip-card-back rounded-md drop-shadow-xl absolute top-0 overflow-hidden p-0 w-full`} style={{
          transform: click ? 'rotateY(0deg)' : 'rotateY(-180deg)',
          transition: 'all 0.6s',
          backgroundImage: ` linear-gradient(to bottom,#00000095,#ffffff40),url(${image ? image : placeHolderImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}>
          <div className='flex justify-end flex-row cursor-pointer m-2'>
            <TiArrowBack color='#ffffff' size={22} onClick={() => setClick(!click)} />
          </div>
          <div className='flex flex-col h-full'>
            <div className='overflow-scroll p-3 bg-base-200 flex flex-col gap-4 translate-y-[50%] hover:translate-y-[0%] flex-1 rounded-s-3xl rounded-e-3xl'
              style={{
                transition: 'all 0.3s'
              }}
            >
              <div className='text-lg font-bold'>{product.name}</div>
              <div className=''><b>Brand: </b>{product.brand}</div>
              <div className=''><b>Category: </b>{product.category}</div>
              <div className=''><b>Info: </b>{product.info}</div>
              <div className=''><b>₹{product.price}</b></div>
              <div><b>Descripion: </b>{product.description}</div>
            </div>
            {
              token.role === 'Admin'
              &&
              <>
                <div className='flex gap-2 absolute bottom-0 right-0 m-2 mb-4'>
                  <FiEdit3 onClick={() => props.editProduct(product)} size={30} className=' p-1 rounded-lg border-2 border-green-500 text-green-500 bg-base-200 shadow-lg cursor-pointer' />
                  <MdDelete onClick={() => props.deleteProduct(product.id)} size={30} className=' p-1 rounded-lg border-2 border-red-700 text-red-700 bg-base-200 shadow-lg cursor-pointer' />
                </div>
              </>
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default ProductCard