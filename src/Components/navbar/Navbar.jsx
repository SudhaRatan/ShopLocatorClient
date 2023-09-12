import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import { MdOutlineInventory2 } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

const Navbar = ({ toggleTheme }) => {

	const [token, setToken] = useContext(AuthContext)
	const navigate = useNavigate()

	// useEffect(() => {
	// 	setToken({ token: localStorage.getItem('token'), role: localStorage.getItem('role') })
	// }, [token])

	const logout = () => {
		localStorage.clear()
		navigate('/')
		setToken({ token: null, role: null })
	}

	return (
		<div className="navbar bg-base-100 border-b-2 border-gray-100">
			<div className="navbar-start">
				<div className="dropdown">
					<label htmlFor="my-drawer" tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
					</label>
					<div className="drawer">
						<input id="my-drawer" type="checkbox" className="drawer-toggle" />
						<div className="drawer-content">
							{/* Page content here */}
							{/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
						</div>
						<div className="drawer-side z-30">
							<label htmlFor="my-drawer" className="drawer-overlay z-40"></label>
							<ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content z-50">
								{/* Sidebar content here */}
								{
									token.role === 'User'
										?
										<>
											<li><Link to={'Shop/Inventory'} className="text-xl">Orders</Link></li>
											<li><Link to={'Shop/Orders'} className="text-xl">Cart</Link></li>
										</>
										:
										token.role === 'Shop'
											?
											<>
												<li><Link to={'Shop/Inventory'} className="text-xl"><MdOutlineInventory2 size={18} />Inventory</Link></li>
												<li><Link to={'Shop/Orders'} className="text-xl">Orders</Link></li>
											</>
											: <></>
								}
							</ul>
						</div>
					</div>
				</div>
				<Link to={'/'} className="btn btn-ghost normal-case text-xl">Shop-Locator</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{/* Desktop content here */}
					{
						token.role === 'User'
							?
							<>
								<li><Link to={'Shop/Inventory'} className="text-xl">Orders</Link></li>
								<li><Link to={'Shop/Orders'} className="text-xl">Cart</Link></li>
							</>
							:
							token.role === 'Shop'
								?
								<>
									<li><Link to={'Shop/Inventory'} className="text-xl"><MdOutlineInventory2 size={18} />Inventory</Link></li>
									<li><Link to={'Shop/Orders'} className="text-xl">Orders</Link></li>
								</>
								: <></>
					}
				</ul>
			</div>
			<div className="navbar-end">
				<label className="swap swap-rotate pr-4">

					{/* this hidden checkbox controls the state */}
					<input type="checkbox" onChange={toggleTheme} />

					{/* sun icon */}
					<svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

					{/* moon icon */}
					<svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

				</label>
				{
					token.token !== null
						?
						<div className="flex justify-center items-center gap-5">
							<Link to={'Shop/Account'}>
								<div className="tooltip tooltip-bottom" data-tip="hello user">
									<VscAccount size={30} />
								</div>
							</Link>
							<div onClick={logout} className="btn">Logout</div>
						</div>
						:
						<Link to={'/login'} className="btn">Login/Register</Link>
				}
			</div>
		</div>
	)
}

export default Navbar