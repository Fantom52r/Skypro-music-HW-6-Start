"use client"
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface NotificationProps {
    errorMessage:string|null;
}

const Notification = ({errorMessage} : NotificationProps) => {
    const notify = () => toast("Wow so easy!");


    useEffect(()=>{
        if (errorMessage) {
            toast.error(errorMessage)
        }
    },[errorMessage])
  return (
    <div>
 <ToastContainer/>
    </div>
  )
}

export default Notification
