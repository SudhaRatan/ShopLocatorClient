import Categories from '../../assets/Filter.svg'
import DashboardCard from "../../Components/AdminCards/DashboardCard"
import DashboardCardHover from "../../Components/AdminCards/DashboardCardHover"
import { BsFillBoxSeamFill } from "react-icons/bs";
import { GrAppsRounded } from "react-icons/gr";
import { useState } from "react"
import { Link } from 'react-router-dom';

const AdminHome = () => {

  return (
    <div className='flex flex-col gap-5 justify-center items-center w-full p-5 px-10'>
      <div className='w-full font-semibold text-3xl'>Manage</div>
      <div className='grid items-center justify-center w-full gap-10' style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
        <DashboardCard to={'Products'} iconName={'Product'} size={80}>Products</DashboardCard>
        <DashboardCard to={'Categories'} iconName={'Category'} size={80}>Categories</DashboardCard>
        <DashboardCard to={'Users'} iconName={'Users'} size={80}>Users</DashboardCard>
        <DashboardCard to={'Shops'} iconName={'Shops'} size={80}>Shops</DashboardCard>
      </div>
    </div>
  )
}

export default AdminHome