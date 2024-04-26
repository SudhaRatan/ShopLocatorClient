import React, { useState } from 'react'

const Pagination = ({ count, get, page }) => {

  const decrement = () => {
    if (count > 0) {
      get("<")
    }
  }

  const increment = () => {
    if (count + 1 !== page)
      get(">")
  }

  const scrollToTop = () => {
    console.log("12312")
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className='bottom-0 fixed flex justify-center w-full p-1' onClick={scrollToTop}>
      <div className="join border-2 border-accent rounded-lg bg-base-200">
        <button className={`join-item btn btn-sm ${count == 0 && 'text-gray-300'}`} onClick={decrement}>«</button>
        <div className='text-lg px-2 bg-base-200 rounded-none'>{count + 1} of {page}</div>
        <button className={`join-item btn btn-sm ${count + 1 === page && 'text-gray-300'}`} onClick={increment}>»</button>
      </div>
    </div>
  )
}

export default Pagination