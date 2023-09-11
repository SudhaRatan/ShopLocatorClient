import { BiSearchAlt } from 'react-icons/bi'

const ShopProductsSearch = ({searchProds, search, handleSearch, handleSearchInput, ph}) => {
  return (
    <div className='w-80 h-12 bg-base-100 border-2 rounded-md flex items-center'>
      <BiSearchAlt size={24} className='m-1 cursor-pointer' onClick={searchProds} />
      <input type='text' className='flex-1 text-lg outline-none bg-transparent' value={search} onChange={handleSearchInput} placeholder={ph} onKeyDown={handleSearch} />
    </div>
  )
}

export default ShopProductsSearch