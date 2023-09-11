import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    var token = localStorage.getItem('token')
		var role = localStorage.getItem('role')
		if(token !== null && role !== null)
			if(role === "Shop")
				navigate("/Shop")
			else if(role === "User")
				navigate("User")
  })
  return (
    <>
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <Link to={'login'} className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home