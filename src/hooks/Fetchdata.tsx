import UserService from "@/services/users";
import { setAllUsers } from "@/redux/reducer/userSlice";
import NotificationService from "@/services/notification.service";

export async function fetchData(dispatch, dropDown) {
  try {
    if (isMostlyNumbers(dropDown)) {
      // It's mostly numbers, treat it as a number
      const response = await UserService.filterByRoles(dropDown);
      handleApiResponse(dispatch, response);
      const data = response.data
      dispatch(setAllUsers(data))

    } else {
      // It's mostly text, treat it as text
      const response = await UserService.filterByAction(dropDown);
      handleApiResponse(dispatch, response);
      const data = response.data
      dispatch(setAllUsers(data))

    }
  } catch (error) {
    console.log(error);
  }
}

function isMostlyNumbers(value) {
  // Count the number of digits in the value
  const digitCount = (value.match(/\d/g) || []).length;
  const letterCount = (value.match(/[a-zA-Z]/g) || []).length;

  // If there are more digits than letters, consider it mostly numbers
  return digitCount > letterCount;
}

function handleApiResponse(dispatch, response) {
  if (response.status) {
    dispatch(setAllUsers(response.data));
    NotificationService.success({
      message: "Success!",
      addedText: <p>{response.message}</p>,
    });
  }
}
