import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "../Components/navbar/Navbar"
import "./Styles/Home.css"
import { FaBowlFood } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { BsPencilFill, BsFillPinAngleFill } from "react-icons/bs";
import { GiChocolateBar } from 'react-icons/gi'
import RandomWords from "../Components/RandomWords/RandomWords";

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {

    var token = localStorage.getItem('token')
    var role = localStorage.getItem('role')
    if (token !== null && role !== null)
      if (role === "Shop")
        navigate("/Shop")
      else if (role === "User")
        navigate("User")
      else if (role === "Admin")
        navigate("Admin")
  }, [])

  const getRandomDelay = () => {
    return `${Math.floor(Math.random() * 10)}s`
  }

  const getRandomSize = () => {
    return Math.floor(Math.random() * (100 - 20 + 1)) + 20
  }

  const colors = [
    '#264653',
    '#2a9d8f',
    '#e9c46a',
    '#f4a261',
    '#e76f51',
    '#f72585',
    '#b5179e',
    '#7209b7',
    '#480ca8',
    '#3a0ca3',
    '#3f37c9',
    '#4361ee',
    '#4895ef',
    '#4cc9f0'
  ]

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getRandomDisplacement = () => {
    return `${Math.floor(Math.random() * 100)}%`
  }



  return (
    <div className="absolute grid top-0 w-full p-12 gap-5 items-start justify-normal bg-base-100" style={{ gridTemplateColumns: "4fr 3fr" }}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className=" flex items-center gap-5">
            <img className="w-16" src={Logo} alt="Logo" />
            <div className="text-3xl font-semibold w-fit">Shop locator</div>
          </div>
          <div className="flex gap-2 cursor-pointer">
            <Link to={"/login"} className="px-8 py-2 bg-slate-900 text-md transition-all hover:text-black hover:bg-base-300 text-base-200 rounded-sm font-semibold">Login</Link>
          </div>
        </div>
        <div>
          <RandomWords />
          <div>Order from local stores near you.</div>
        </div>
      </div>
      <div className="bg-slate-200 w-full h-[80vh] relative overflow-hidden">
        <FaBowlFood size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay() }} />
        <IoFastFoodSharp size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay() }} />
        <MdEmojiFoodBeverage size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay(), left: `${getRandomDisplacement()}` }} />
        <BsPencilFill size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay(), left: `${getRandomDisplacement()}` }} />
        <GiChocolateBar size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay(), left: `${getRandomDisplacement()}` }} />
        <BsFillPinAngleFill size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay(), left: `${getRandomDisplacement()}` }} />
        <MdEmojiFoodBeverage size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay(), left: `${getRandomDisplacement()}` }} />
        <MdEmojiFoodBeverage size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay(), left: `${getRandomDisplacement()}` }} />
        <MdEmojiFoodBeverage size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay(), left: `${getRandomDisplacement()}` }} />
        <MdEmojiFoodBeverage size={getRandomSize()} color={getRandomColor()} className={`icon`} style={{ animationDelay: getRandomDelay(), left: `${getRandomDisplacement()}` }} />
      </div>
    </div>
  )
}

export default Home