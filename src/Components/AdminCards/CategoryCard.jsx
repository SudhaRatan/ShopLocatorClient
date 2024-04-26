import React from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

const CategoryCard = ({ id, name, image, deleteCategory }) => {
  
  return (
    <div className='flex rounded-xl bg-base-200 p-1 gap-3 drop-shadow-md'>
      <img width={100} height={100} className='aspect-square rounded-xl border-2 border-base-100 bg-cover object-cover bg-center' src={image} alt='Catgory image' />
      <div className='flex flex-col justify-between w-full'>
        <div className='text-lg'>{name}</div>
        <div className='flex justify-end w-full gap-1'>
          {/* <FiEdit3 onClick={() => { }} size={28} className=' p-1 rounded-lg border-2 border-green-500 text-green-500 bg-base-200 shadow-lg cursor-pointer' /> */}
          <MdDelete onClick={() => deleteCategory(id)} size={28} className=' p-1 rounded-lg border-2 border-red-700 text-red-700 bg-base-200 shadow-lg cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default CategoryCard