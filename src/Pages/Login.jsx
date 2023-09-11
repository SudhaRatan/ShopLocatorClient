import { useState, useEffect } from 'react'
import UserLogin from '../Components/Login/UserLogin'
import ShopLogin from '../Components/Login/ShopLogin'
import ShopRegister from '../Components/Login/ShopRegister'
import UserRegister from '../Components/Login/UserRegister'
import { useNavigate } from 'react-router-dom'
import { BiSolidUser } from "react-icons/bi";
import { AiTwotoneShop } from "react-icons/ai";

function Login() {

	const [t, setT] = useState(true)
	const toggle = () => {
		setT(!t)
	}

	const navigate = useNavigate()

	useEffect(() => {
		var token = localStorage.getItem('token')
		var role = localStorage.getItem('role')
		if (token !== null && role !== null)
			if (role === "Shop")
				navigate("/Shop")
			else if (role === "User")
				navigate("/User")
	}, [])

	return (
		<div className="bg-base-100 min-h-full flex justify-center items-center flex-col gap-10">
			<div className="card shadow-md rounded-3xl">
				<div className='flex w-full gap-5 min-w-0 border-2 p-2 rounded-full'>
					<a className={`${t && 'rounded-full bg-blue-600 text-yellow-50'} p-1 text-lg flex justify-center items-center flex-1`} href="#UserLogin" onClick={toggle}><BiSolidUser size={20} className="mr-1"/> User</a>
					<a className={`${!t && 'rounded-full bg-green-500 text-yellow-50'} p-1 text-lg flex justify-center items-center flex-1`} href="#ShopLogin" onClick={toggle}><AiTwotoneShop size={20} className="mr-1"/>Shop</a>
				</div>
				<div className="carousel carousel-vertical" style={{ height: 440 }}>
					<div className="carousel-item h-full">
						<div className="carousel rounded-box">
							<div id='UserLogin' className="carousel-item w-full">
								<UserLogin />
							</div>
							<div id='ShopLogin' className="carousel-item w-full">
								<ShopLogin />
							</div>
						</div>
					</div>
					<div className="carousel-item h-full">
						<div className="carousel rounded-box">
							<div id='UserRegister' className="carousel-item w-full">
								<UserRegister />
							</div>
							<div id='ShopRegister' className="carousel-item w-full">
								<ShopRegister />
							</div>
						</div>
					</div>
				</div>
			</div>


			<p>Scroll to register</p>

		</div>
	)
}

export default Login