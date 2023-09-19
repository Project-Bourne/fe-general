import UserService from "@/services/users";
import { setAllUsers} from '@/redux/reducer/userSlice';
import NotificationService from "@/services/notification.service";
import { useSelector } from "react-redux";

export async function fetchData(dispatch) {
  // const {dropDown} = useSelector((state: any) => state?.user);

  try {
        const response = await UserService.getUsers();
    if (response.status) {
      dispatch(setAllUsers(response.data));
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}</p>,
      });
    } 
  } catch (error) {
    console.log(error);
  }
}
