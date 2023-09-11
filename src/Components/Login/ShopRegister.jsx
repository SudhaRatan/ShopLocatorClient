import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { API } from '../../App';
import axios from 'axios';

export default function ShopRegister() {

  const aTag = useRef()
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true)
    var data = await axios.post(`${API}/Login/RegisterShop`, data, { validateStatus: false })
    if (data.status === 200) {
      aTag.current.click()
      setErrorMsg(null)
      setLoading(false)
    }
    else {
      setLoading(false)
      setErrorMsg(data.data)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='text-center min-w-full grid grid-flow-row gap-0'>
        {errorMsg && <div className='text-red-600'>{errorMsg}</div>}
        <h2 className='text-3xl font-bold'>Shop Register</h2>
        <div className=''>
          <input className='input input-bordered w-full max-w-xs' type="text" placeholder="Owner Name" {...register("OwnerName", { required: "Enter name" })} />
          <p className='text-red-600'>{errors.OwnerName?.message}</p>
        </div>
        <div className=''>
          <input className='input input-bordered w-full max-w-xs' type="text" placeholder="Shop Name" {...register("ShopName", { required: "Enter name" })} />
          <p className='text-red-600'>{errors.ShopName?.message}</p>
        </div>
        <div className=''>
          <input className='input input-bordered w-full max-w-xs' type="number" placeholder="Mobile number" {...register("PhoneNumber", { required: "Enter mobile number", minLength: { value: 4, message: "Minimun length is 4" }, maxLength: { value: 12, message: "Maximum length is 12" } })} />
          <p className='text-red-600'>{errors.PhoneNumber?.message}</p>
        </div>
        <div className=''>
          <input className='input input-bordered w-full max-w-xs' type="password" placeholder="Password" {...register("Password", { required: "Enter password", minLength: { value: 4, message: "Minimun length is 4" } })} />
          <p className='text-red-600'>{errors.Password?.message}</p>
        </div>
        <div className=''>
          <button className='btn btn-success w-full max-w-xs' type="submit" >
            {loading ? <span className="loading loading-dots loading-lg"></span> : 'Submit'}
          </button>
        </div>
        <div>
          <a className='link' ref={aTag} href='#ShopLogin'>Have account? Login here</a>
        </div>
      </form>
    </>
  );
}