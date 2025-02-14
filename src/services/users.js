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
        false
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
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getUserRoles() {
    try {
      const response = await request(`roless`, "GET", {}, true, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async filterByRoles(id, page = 1) {
    try {
      const response = await request(
        `filter?filterType=role&filterValue=${id}&page=${page}`,
        "GET",
        {},
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async filterByAction(id, page = 1) {
    try {
      const response = await request(
        `filter?filterType=${id}&filterValue=&page=${page}`,
        "GET",
        {},
        true,
        false,
        false
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
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async rejecteUser(id) {
    try {
      const response = await request(
        `reject-user/${id}`,
        "PUT",
        {},
        true,
        false,
        false
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
        false
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
        false
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
        false
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
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, body) {
    try {
      const response = await request(
        `edit/user/${id}`,
        "PUT",
        body,
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getUsers() {
    try {
      const response = await request(`users/`, "GET", {}, true, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async filterByAudit(page = 1, perPage = 30) {
    try {
      const response = await request(
        `admin/audit?page=${page}&per_page=${perPage}`,
        "GET",
        {},
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async enquiries(page = 1, perPage = 30) {
    try {
      const response = await request(
        `feedbacks?page=${page}&per_page=${perPage}`,
        "GET",
        {},
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Export the Service class.
export default UserService;
