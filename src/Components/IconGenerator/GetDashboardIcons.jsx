import Lottie from "react-lottie";
import Product from '../../assets/Lotties/wired-lineal-139-basket.json'
import Category from '../../assets/Lotties/wired-lineal-1360-grocery-shelf.json'
import Users from '../../assets/Lotties/wired-lineal-21-avatar.json'
import Shops from '../../assets/Lotties/shops.json'

const GetDashboardIcons = (name, size, playAnim) => {

  var anim = name === 'Product' ? Product : name === 'Category' ? Category : name === 'Users' ? Users : name === 'Shops' && Shops

  return (
    <Lottie
      options={{
        loop: false,
        autoplay: false,
        animationData: anim
      }}
      isStopped={playAnim}
      height={size}
    />
  )
}

export default GetDashboardIcons