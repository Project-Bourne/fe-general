export default function getUserRole(data) {
    switch (data) {
      case "0":
        return "Super Admin";
      case "1":
        return "Admin";
      case "2":
        return "Supervisor";
      case "3":
        return "Liason Officer";
      case "4":
        return "Station Officer";
      case "5":
        return "Desk Officer";
      case "6":
        return "Analyst";
      default:
        break;
    }
  }