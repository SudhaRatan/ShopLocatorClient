import { useState, useEffect } from 'react'
import { GoogleMap, MarkerF, } from '@react-google-maps/api'
import { fromLatLng, setKey, fromPlaceId } from "react-geocode"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { GAPI } from '../../Pages/Shop/Account'
import { IoArrowBackOutline } from "react-icons/io5";
import { ImLocation2 } from "react-icons/im";
import { BiCurrentLocation } from "react-icons/bi";


const AddAddress = ({ closeModal }) => {

  const [cood, setCood] = useState(null)
  const [address, setAddress] = useState(null)

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
    fromLatLng(lat || cood.lat , lng || cood.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
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
    navigator.geolocation.getCurrentPosition(function (pos) {
      setCood({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      getAddress(pos.coords.latitude,pos.coords.longitude)
    });
  }

  const [value, setValue] = useState(null)

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
          <div className='m-2 flex gap-2'><IoArrowBackOutline className='shadow-md rounded-full p-[2px] cursor-pointer' onClick={closeModal} size={20} />Choose Address</div>
          <GoogleMap
            onClick={onMapClick}
            zoom={18}
            center={cood}
            mapContainerClassName='w-full flex-1'
            options={{
              disableDefaultUI: true
            }}
          >
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
                <BiCurrentLocation size={24} />Use current location
              </div>
            </div>
            {
              address
                ?
                <div className='p-4 flex flex-col gap-2 bg-base-100 rounded-t-2xl'>
                  <div className='flex gap-2'>
                    <ImLocation2 className='text-warning' size={40} />
                    {address}
                  </div>
                  <button className='btn btn-warning'>Confirm address</button>
                </div>
                :
                <div className='flex justify-center w-full items-center bg-base-100 rounded-t-2xl'>
                  <span className="loading loading-dots loading-lg text-success"></span>
                </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default AddAddress