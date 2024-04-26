import { Link } from 'react-router-dom'
import GetDashboardIcons from '../IconGenerator/GetDashboardIcons'
import { useEffect, useState } from 'react'

const DashboardCard = ({ children, iconName, size, to }) => {

  const play = () => {
    setPlayAnim(false)
  }

  const stop = () => {
    setPlayAnim(true)
  }

  const [playAnim, setPlayAnim] = useState(true)

  const [icon, setIcon] = useState(GetDashboardIcons(iconName, size, playAnim))

  useEffect(() => {
    setIcon(GetDashboardIcons(iconName, size, playAnim))
  }, [playAnim])

  return (
    <Link to={to} onMouseOver={play} onMouseLeave={stop} className="bg-base-300 hover:drop-shadow-lg rounded-md flex gap-2 justify-end flex-col items-center transition-all p-4 box-border cursor-pointer">
      {icon}
      <div className='text-2xl font-semibold'>{children}</div>
    </Link>
  )
}

export default DashboardCard