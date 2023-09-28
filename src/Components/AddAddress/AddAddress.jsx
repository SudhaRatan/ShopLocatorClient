import { useState, useEffect, forwardRef, useImperativeHandle, useContext } from 'react'
import { GoogleMap, MarkerF, } from '@react-google-maps/api'
import { fromLatLng, setKey, fromPlaceId } from "react-geocode"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { GAPI } from '../../Pages/Shop/Account'
import { IoArrowBackOutline } from "react-icons/io5";
import { ImLocation2 } from "react-icons/im";
import { BiCurrentLocation } from "react-icons/bi";
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import { API } from '../../App'
import { RxCross2 } from "react-icons/rx";
import { ShopContext } from '../../Context/ShopContext'


const AddAddress = forwardRef(({ closeModal }, ref) => {

  const [cood, setCood] = useState(null)
  const [address, setAddress] = useState('')
  const [building, setBuilding] = useState('')
  const [landmark, setLandmark] = useState('')
  const [value, setValue] = useState(null)
  const [gettingLocation, setGettingLocation] = useState(true)
  const [shopAccess, setShopAccess] = useContext(ShopContext)

  const [token, setToken] = useContext(AuthContext)

  const [confirmAddress, setConfirmAddress] = useState(false)

  const [posting, setPosting] = useState(null)

  // cood && console.log(cood.lat, cood.lng, address)

  useImperativeHandle(ref, () => ({
    resetState() {
      setCood({ lat: 110, lng: 110 })
      setAddress('')
      setValue(null)
      setGettingLocation(true)
      setConfirmAddress(false)
    }
  }))

  const postAddress = async () => {
    setPosting(true)
    const response = await axios.post(`${API}/ShopAddresses`, {
      address,
      building,
      landmark,
      coordinateX: cood.lat,
      coordinateY: cood.lng
    }, {
      headers: {
        'Authorization': `Bearer ${token.token}`
      },
      validateStatus: false
    })
    if (response.status === 200) {
      setShopAccess(true)
      closeModal()
    }
    setPosting(false)
  }

  const onMapClick = (e) => {
    setCood({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
    getAddress(e.latLng.lat(), e.latLng.lng())
  }

  useEffect(() => {
    setKey(GAPI)
  }, [])

  const getAddress = (lat, lng) => {
    fromLatLng(lat || cood.lat, lng || cood.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        // console.log(address);
        setAddress(address)
        // console.log(response)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const getCoords = () => {
    if (value) {
      fromPlaceId(value.value.place_id).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          // console.log(lat, lng);
          setCood({ lat, lng })
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  function getPos() {
    setGettingLocation(false)
    navigator.geolocation.getCurrentPosition(function (pos) {
      setCood({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      setGettingLocation(true)
      getAddress(pos.coords.latitude, pos.coords.longitude)
    });
  }

  useEffect(() => {
    getCoords()
    value && setAddress(value.value.description)
  }, [value])

  useEffect(() => {
    // getAddress()
  }, [cood])

  return (
    <>
      <div className="modal-box md:w-11/12 max-w-5xl h-full p-0 transition-all">
        <div className='flex flex-col h-full'>
          <div className='m-2 flex gap-2 items-center'>
            {
              confirmAddress
                ?
                <>
                  <IoArrowBackOutline className='shadow-md rounded-full p-[2px] cursor-pointer' onClick={() => setConfirmAddress(false)} size={28} />
                </>
                :
                <>
                  <IoArrowBackOutline className='shadow-md rounded-full p-[2px] cursor-pointer' onClick={closeModal} size={28} />Choose Address
                </>
            }
          </div>
          <GoogleMap
            onClick={onMapClick}
            zoom={18}
            center={cood}
            mapContainerClassName='w-full flex-1'
            options={{
              disableDefaultUI: true
            }}
          >
            {
              confirmAddress &&
            <div className={`absolute w-full h-full ${confirmAddress ? 'bg-[#00000090] z-10' : 'z-0'}`}></div>
            }
            <div className={`absolute w-full h-fit bottom-0 z-20 transition-all ${confirmAddress ? 'translate-y-0' : ' translate-y-full'}`}>
              <RxCross2 size={34} onClick={() => setConfirmAddress(false)} className='bg-[#202124] cursor-pointer text-base-100 rounded-full p-[5px] left-0 right-0 m-auto mb-3 ' />
              <div className='flex flex-col w-full p-4 bg-base-100 rounded-xl'>
                <p className='font-semibold text-lg'>Enter complete address</p>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Your address" className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Building</span>
                  </label>
                  <input value={building} onChange={(e) => setBuilding(e.target.value)} type="text" placeholder="Building name or number" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Landmark</span>
                  </label>
                  <input value={landmark} onChange={(e) => setLandmark(e.target.value)} type="text" placeholder="Nearby landmark (optional)" className="input input-bordered w-full" />
                </div><hr className='m-4'></hr>
                <button className='btn btn-warning' onClick={postAddress}>
                  {
                    posting
                      ?
                      <span className="loading loading-dots loading-lg text-black"></span>
                      :
                      <div>
                        Save address
                      </div>
                  }
                </button>
              </div>
            </div>


            <div className='w-full absolute h-10' style={{ backgroundImage: "linear-gradient(#00000030, #ffffff00)" }} />
            <div className='absolute w-full p-3'>
              {/* <input type="text" placeholder="Search for area, street name..." className="input input-bordered w-full" /> */}
              <GooglePlacesAutocomplete
                apiOptions={{ language: 'en', region: 'in' }}
                autocompletionRequest={{
                  componentRestrictions: { country: "in" },
                }}
                className='shadow-md'
                selectProps={{
                  value,
                  onChange: setValue,
                  placeholder: "Search for area, street name..."
                }}
              />
            </div>
            <MarkerF draggable={true} position={cood} />
          </GoogleMap>
          <div className='absolute w-full bottom-0 h-fit'>
            <div className='flex justify-center m-2 text-warning cursor-pointer'>
              <div className='flex drop-shadow-lg bg-base-100 gap-2 border-[1px] border-warning p-2 rounded-lg justify-center items-center' onClick={getPos}>
                {
                  gettingLocation
                    ?
                    <>
                      <BiCurrentLocation size={24} />Use current location
                    </>
                    :
                    <span className="loading loading-ring loading-md"></span>
                }
              </div>
            </div>
            {
              address
                ?
                <div className={`p-4 transition-all flex flex-col gap-2 bg-base-100 rounded-t-2xl ${confirmAddress ? 'opacity-0' : 'opacity-100'}`}>
                  <div className='flex gap-2'>
                    <ImLocation2 className='text-warning' size={40} />
                    {address}
                  </div>
                  <button className='btn btn-warning' onClick={() => setConfirmAddress(true)} >Confirm address</button>
                </div>
                :
                <div className='flex justify-center w-full items-center bg-base-100 rounded-t-2xl'>
                  <span className="loading loading-dots loading-lg text-success"></span>
                </div>
            }
          </div>
        </div>
      </div >
    </>
  )
})

export default AddAddress