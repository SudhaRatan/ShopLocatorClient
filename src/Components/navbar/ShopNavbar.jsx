import { Link } from "react-router-dom"

const ShopNavbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
      {/* Mobile */}
        <div className="dropdown">
          <label tabIndex={0} htmlFor="my-drawer" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Link to={'/'} className="btn btn-ghost normal-case text-xl">Shop-Locator</Link>
      </div>
      {/* Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link>Shop</Link></li>
          <li><Link>Item 1</Link></li>
          <li><Link>Item 2</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to={'/login'} className="btn">Login/Register</Link>
      </div>
    </div>
  )
}

export default ShopNavbar