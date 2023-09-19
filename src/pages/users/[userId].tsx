import { Breadcrumbs } from "@/components/ui";
import { Button, CustomModal } from "@/components/ui";
import { useEffect, useState } from "react";
import UserService from '@/services/users'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import BlockModal from './components/BlockModal'
import {
  ActivityLogSection,
  Header,
  PersonalInfoSection,
  ProfileSection,
} from "./components";
import { TabHeaderData } from "./utils/constants";
import NotificationService from "@/services/notification.service";
import DeleteModal from "./components/deleteModal";
import {setSingleUser} from '@/redux/reducer/userSlice'

function UserDetails() {
  const router = useRouter()
  const [toggleModal, setToggleModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const id = router.query?.userId
  const dispatch = useDispatch()
  const {user} = useSelector((state: any) => state?.user)
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchuserData = async () => {
      console.log(id)
      if (id) {
        const response = await UserService.getUserById(id)
        dispatch(setSingleUser(response.data))
      }
    }
    fetchuserData()
  }, [id])


  const handleBlock = async() => {
    const response = await UserService.blockUser(id)
    if(response.status){
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
    } else{
      NotificationService.error({
        message: "error!",
        addedText: <p>{response.message}. something went wrong, please try again</p>,
      });
    }
    setToggleModal(false)
  }
  const cancelblock = () => {
    setToggleModal(false)
  }

  const handleDeleteUser = async() => {
    const response = await UserService.deleteUser(user.uuid)
    if(response.status){
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
    } else{
      NotificationService.error({
        message: "error!",
        addedText: <p>{response.message}. something went wrong, please try again</p>,
      });
    }
    console.log(response)
    setShowDelete(false)
  };

  return (
    <>
      <div className="pb-7">
        <h1 className="font-bold text-2xl mx-5">User</h1>
        <Breadcrumbs />
        <PersonalInfoSection blockUser={()=> setToggleModal(true)} handleDeleteUser={()=>setShowDelete(true)} isEditing={isEditing} setIsEditing={setIsEditing} />
        <ProfileSection isEditing={isEditing}/>
        {/* <ActivityLogSection user={user} /> */}
      </div>
      {toggleModal && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setToggleModal(false)}
        >
          <BlockModal handleBlock={handleBlock}  user={user} cancelblock={cancelblock}/>
        </CustomModal>
      )}
       {showDelete && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowDelete(false)}
        >
          <DeleteModal
            handleDelete={handleDeleteUser}
            cancelblock={cancelblock}
            user={user}
          />
        </CustomModal>
      )}
    </>
  );
}

export default UserDetails;
