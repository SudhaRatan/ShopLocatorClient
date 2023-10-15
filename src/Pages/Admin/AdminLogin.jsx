import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { API } from '../../App';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => login(data)

  const [errorMsg, setErrorMsg] = useState(null)
  const [token, setToken] = useContext(AuthContext)
  const navigate = useNavigate()

  const login = async (data) => {
    var result = await axios.post(`${API}/Login/GetAdminToken`, data, {
      validateStatus: false
    })
    if (result.status === 200) {
      localStorage.setItem('token', result.data)
      localStorage.setItem('role', 'Admin')
      setToken({ token: result.data, role: 'Admin' })
      navigate('/Admin')
    }
    else {
      setErrorMsg(result.data)
    }
  }

  return (
    <div className='flex items-center flex-col gap-5 m-4'>
      <div className='text-3xl font-semibold'>Admin login</div>
      {errorMsg && <div className='text-red-500'>{errorMsg}</div>}
      <form className='flex flex-col items-center gap-4' onError={(error) => console.log(error)} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input className='input input-bordered' type="text" placeholder="Username" {...register("userName", { required: true })} />
          {errors.userName?.type === "required" && (
            <p className='text-red-500' role="alert">Username is required</p>
          )}
        </div>
        <div>
          <input className='input input-bordered' type="password" placeholder="Password" {...register("password", { required: true })} />
          {errors.password?.type === "required" && (
            <p className='text-red-500' role="alert">Password is required</p>
          )}
        </div>

        <input className='input input-bordered cursor-pointer' type="submit" />
      </form>
    </div>
  )
}

export default AdminLogin