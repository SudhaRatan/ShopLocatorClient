import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { API } from '../../App';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function ShopLogin() {

  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading,setLoading] = useState(false)

  const [token, setToken] = useContext(AuthContext)

  const onSubmit = async (data) => {
    setLoading(true)
    var resp = await axios.post(`${API}/Login/ShopLogin`, data, { validateStatus: false })
    console.log(resp)
    if (resp.status === 200) {
      localStorage.setItem('token', resp.data)
      localStorage.setItem('role', 'Shop')
      setToken({ token: resp.data, role: 'Shop' })
      navigate('/Shop')
      setErrorMsg(false)
      setLoading(false)
    } else {
      setLoading(false)
      setErrorMsg(resp.data)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='text-center min-w-full grid grid-flow-row gap-0'>
        {errorMsg && <div className='text-red-600'>{errorMsg}</div>}
        <h2 className='text-3xl font-bold'>Shop login</h2>
        <div className=''>
          <input className='input input-bordered w-full max-w-xs' type="number" placeholder="Mobile number" {...register("PhoneNumber", { required: "Enter mobile number", minLength: { value: 4, message: "Minimun length is 4" }, maxLength: { value: 12, message: "Maximum length is 12" } })} />
          <p className='text-red-600'>{errors.PhoneNumber?.message}</p>
        </div>
        <div className=''>
          <input className='input input-bordered w-full max-w-xs' type="password" placeholder="Password" {...register("Password", { required: "Enter password", minLength: { value: 4, message: "Minimun length is 4" } })} />
          <p className='text-red-600'>{errors.Password?.message}</p>
        </div>
        <div className=''>
          <button className='btn btn-success w-full max-w-xs' type="submit">
            {loading ? <span className="loading loading-dots loading-lg"></span> : 'Submit'}
          </button>
        </div>
        <div>
          <a className='link' href='#ShopRegister'>Register a shop</a>
        </div>
      </form>
    </>
  );
}