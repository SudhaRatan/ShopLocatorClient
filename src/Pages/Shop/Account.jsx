import { useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { API } from '../../App'
import { AuthContext } from '../../Context/AuthContext'
import ShopRegister from '../../Components/Login/ShopRegister'
import { AlertContext } from '../../Context/AlertContext'
import AddAddress from '../../Components/AddAddress/AddAddress'
import { useLoadScript } from '@react-google-maps/api';


export const GAPI = import.meta.env.VITE_MAPS_API_KEY

const Account = () => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GAPI,
    libraries: ["core", "geocoding", "maps", "places"]
  })

  const [token, Token] = useContext(AuthContext)
  const [account, setAccount] = useState(null)
  const [address, setAddress] = useState(null)
  const [addAddress, setAddAddress] = useState(null)
  const [alert, setAlert] = useContext(AlertContext)
  // console.log(errors);

  const getAccount = async () => {
    var accountResult = await axios.get(`${API}/Login/GetShop`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    if (accountResult.status === 200) {
      setAccount(accountResult.data)
    }
  }

  const getAddress = async () => {
    var addressResult = await axios.get(`${API}/ShopAddresses`, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    // console.log(addressResult)
    if (addressResult.status === 200) {
      setAddress(addressResult.data)
    }
    else {
      setAddAddress("Add address")
    }
  }



  const addShopAddress = () => {
    // setAlert({
    //   show: true,
    //   message: "Added address",
    //   type:"success"
    // })
    AddAddressDialog.current.showModal()
  }

  const closeModal = () => {
    AddAddressDialog.current.close()

  }

  const AddAddressDialog = useRef()

  useEffect(() => {
    getAccount()
    getAddress()
  }, [])

  return (
    <>
      <div className='flex justify-center p-4'>
        {
          account
            ?
            <form className='flex flex-col flex-1 items-center'>
              <h2 className='text-3xl font-semibold'>Account Details</h2>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Owner name</span>
                </label>
                <input className="input input-bordered w-full max-w-xs" disabled type="text" placeholder="ownerName" value={account.ownerName} />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Shop name</span>
                </label>
                <input className="input input-bordered w-full max-w-xs" disabled type="text" placeholder="shopName" value={account.shopName} />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Phone number</span>
                </label>
                <input className="input input-bordered w-full max-w-xs" disabled type="text" placeholder="phoneNumber" value={account.phoneNumber} />
              </div>


              {/* <input type="submit" /> */}
            </form>
            :
            <span className="loading loading-bars loading-lg text-success"></span>
        }
      </div>
      <div className='flex justify-center p-4'>
        {
          address
            ?
            <div>Address</div>
            :
            addAddress
              ?
              <>
                <div className='btn btn-primary' onClick={addShopAddress}>
                  {addAddress}

                </div>
                {
                  isLoaded
                  &&
                  <dialog onClose={() => console.log("Closed")} ref={AddAddressDialog} className="modal modal-bottom sm:modal-middle"><AddAddress closeModal={closeModal} /></dialog>
                }

              </>
              :
              <span className="loading loading-bars loading-lg text-success"></span>
        }
      </div>
    </>
  )
}

export default Account