import React from 'react';
import { useForm } from 'react-hook-form';

export default function UserRegister() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='text-center min-w-full grid grid-flow-row gap-0'>
        <h2 className='text-3xl font-bold'>User Register</h2>
        <div className=''>
          <input className='input input-bordered w-full max-w-xs' type="text" placeholder="Name" {...register("Name", { required: "Enter name" })} />
          <p className='text-red-600'>{errors.Name?.message}</p>
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
          <input className='btn btn-primary w-full max-w-xs' type="submit" />
        </div>
        <div>
          <a className='link' href='#UserLogin'>Already a user? Login here</a>
        </div>
      </form>
    </>
  );
}