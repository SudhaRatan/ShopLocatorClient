import { useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { API } from '../../App'
import { AuthContext } from '../../Context/AuthContext'
import ShopRegister from '../../Components/Login/ShopRegister'
import { AlertContext } from '../../Context/AlertContext'
import AddAddress from '../../Components/AddAddress/AddAddress'
import { useLoadScript } from '@react-google-maps/api';
import { Link } from 'react-router-dom'


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
    console.log(addressResult)
    if (addressResult.status === 200) {
      setAddress(addressResult.data)
    }
    else {
      setAddAddress("Add address")
    }
  }



  const addShopAddress = () => {
    AddAddressDialog.current.showModal()
  }

  const closeModal = () => {
    AddAddressDialog.current.close()

  }

  const AddAddressDialog = useRef()
  const addressRef = useRef()

  useEffect(() => {
    getAccount()
    getAddress()
  }, [])

  const resetAddressState = () => {
    addressRef.current.resetState()
    getAddress()
  }

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
            <div className='flex flex-col gap-2 bg-base-200 p-8 rounded-md shadow-md items-start'>
              <div className='my-2 text-3xl font-semibold'>Address<hr /></div>
              <div><b>Building name: </b>{address.building}</div>
              <div><b>Address: </b>{address.address}</div>
              {address.landmark !== "" && <div><b>Landmark: </b>{address.landmark}</div>}
              <Link to={`https://www.google.com/maps/search/${address.coordinateX},${address.coordinateY}`} target='_blank' className='btn btn-outline'>View on google maps</Link>
            </div>
            :
            addAddress
              ?
              <>
                <div className='btn btn-primary' onClick={addShopAddress}>
                  {addAddress}
                </div>
              </>
              :
              <span className="loading loading-bars loading-lg text-success"></span>
        }
        {
          isLoaded
          &&
          <dialog onClose={resetAddressState} ref={AddAddressDialog} className="modal modal-bottom sm:modal-middle"><AddAddress ref={addressRef} closeModal={closeModal} /></dialog>
        }
      </div>
    </>
  )
}

export default Account