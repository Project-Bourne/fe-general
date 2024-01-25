import React, { useEffect } from 'react'
import IrpListItem from './IrpListItem'
import Auth from "@/services/auth.service"
import { setUserInfo } from '@/redux/reducer/authReducer';
import NotificationService from '@/services/notification.service';
import { useDispatch } from 'react-redux';

const index = () => {
const dispatch  = useDispatch()

  // useEffect(() => {
  //   Auth.getUserViaAccessToken()
  //     .then((response) => {
  //       if (response?.status) {
  //         dispatch(setUserInfo(response?.data));
  //       }
  //     })
  //     .catch((err) => {
  //       NotificationService.error({
  //         message: "Error!",
  //         addedText: <p>{`Access forbidden. Redirecting to login page.`}</p>,
  //         position: "top-center",
  //       });
  //     });
  // }, []); 
  return (
    <div className='h-[100%] py-10'>
        <IrpListItem />
    </div>
  )
}

export default index