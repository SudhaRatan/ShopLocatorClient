import React, { useEffect, useState, useContext } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import axios from 'axios';
import { API } from '../../App';
import { placeHolderImage } from '../../Pages/Shop/Shop';
import { BsInfoCircleFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { TbShoppingCartPlus } from "react-icons/tb";

const ProductCardU = (props) => {

  const product = props.product
  const [image, setImage] = useState(null)
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

  const [click, setClick] = useState(false)
  return (
    <>
      <div className={`flip-card-inner`}>
        <div className={`flip-card-front rounded-md bg-base-100 drop-shadow-xl`} style={{
          transform: click ? 'rotateY(180deg)' : null,
          transition: 'all 0.6s'
        }}>
          <div className='absolute cursor-pointer right-0 text-accent m-2 rounded-full' onClick={() => setClick(!click)}><BsInfoCircleFill className='bg-base-100 rounded-full ' size={18} /></div>
          <div className='flex justify-center items-center min-w-full'><img style={{ aspectRatio: '4/3' }} src={image ? image : placeHolderImage} alt="Shoes" className='w-full rounded-t-md ' /></div>
          <div className="card-body p-4">
            <p>{product.brand && product.brand}</p>
            <h2 className="font-bold overflow-ellipsis whitespace-nowrap overflow-hidden">{product.name}</h2>
            <p className='overflow-ellipsis whitespace-nowrap overflow-hidden'>{product.description}</p>
            <p>{product.info && product.info}</p>
            <p className='font-semibold'>{product.price && "$" + product.price}</p>
            <div className="card-actions justify-end">
              <div className='tooltip border-2 p-1 rounded-lg shadow-md cursor-pointer' data-tip="Add to Cart" onClick={() => props.AddToInventory(product.id, count)}>
                <TbShoppingCartPlus size={18} className='text-green-500' />
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
          </div>
        </div>
      </div>

    </>
  )
}

export default ProductCardU