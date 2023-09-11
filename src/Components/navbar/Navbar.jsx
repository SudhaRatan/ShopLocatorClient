import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import { MdOutlineInventory2 } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {

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