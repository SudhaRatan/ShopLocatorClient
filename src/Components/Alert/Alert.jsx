import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../Context/AlertContext'
import { useRef } from 'react'
import { CiWarning } from "react-icons/ci";
import { RxCrossCircled, RxCheckCircled } from "react-icons/rx";

const Alert = () => {

  const [alert, setAlert] = useContext(AlertContext)

  const alertModal = useRef()

  // return (
  //   <div className='absolute flex justify-center left-0 right-0'>
  //     <div className="alert alert-warning w-fit">
  //       <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  //       <span>Warning: Invalid email address!</span>
  //     </div>
  //   </div>
  // )


  const closeModal = () => {
    setAlert({
      show: false,
      message: null,
      type: null
    })
  }

  useEffect(() => {
    if (alert.show) {
      alertModal.current.showModal()
    } else {
      alertModal.current.close()
    }
  }, [alert])

  return (
    <>
      <dialog id="my_modal_2" className="modal w-full bg-transparent" ref={alertModal}>
        <div className="modal-box p-0 lg:w-1/4 md:w-1/2 w-5/6">
          <div className={`flex justify-center items-center flex-col text-base-200 py-10 ${alert.type === 'warning' ? 'bg-warning' : alert.type === 'error' ? 'bg-error' : alert.type === 'success' && 'bg-accent'}`}>
            {
              alert.type === "success"
                ?
                <RxCheckCircled size={80} />
                :
                alert.type === "warning"
                  ?
                  <CiWarning size={80} />
                  :
                  alert.type === "error"
                  &&
                  <RxCrossCircled size={80} />

            }
            {alert.type && alert.type.toUpperCase()}
          </div>
          <div className='bg-base-200 flex flex-col justify-center items-center p-8 gap-4'>
            {alert && alert.message}
            <button className={`btn rounded-full px-10 text-base-200 ${alert.type === 'warning' ? 'btn-warning' : alert.type === 'error' ? 'btn-error' : alert.type === 'success' && 'btn-accent'}`} onClick={closeModal}>Ok</button>
          </div>
        </div>
      </dialog>
    </>
  )

}

export default Alert