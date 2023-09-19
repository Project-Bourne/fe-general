import { request } from "@/hooks/api";

class UserService {

  static async createUser(data) {
    try {
      const response = await request(
        `register/`,
        "POST",
        data,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }


  static async getUserById(id) {
    try {
      const response = await request(
        `user/${id}`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getUserRoles() {
    try {
      const response = await request(
        `roles`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async filterByRoles(id) {
    try {
      const response = await request(
        `filter?filterType=role&filterValue=${id}`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async filterByAction(id) {
    try {
      const response = await request(
        `filter?filterType=${id}&filterValue=`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }


  static async deleteUser(id) {
    try {
      const response = await request(
        `delete/user/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async verifyUser(id) {
    try {
      const response = await request(
        `verify-user/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async blockUser(id) {
    try {
      const response = await request(
        `block-user/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  static async unBlockUser(id) {
    try {
      const response = await request(
        `unblock-user/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }



  static async verifyUser(id) {
    try {
      const response = await request(
        `verify-user/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, body) {
    try {
      const response = await request(
        `user/${id}`,
        "PUT",
        body,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }


  static async getUsers() {
    try {
      const response = await request(
        `users/`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Export the Service class.
export default UserService;
