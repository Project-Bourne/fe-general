import { request4 } from "../hooks/api";

class RolesService {
  //   static getUserViaAccessToken() {
  //     throw new Error("Method not implemented.");
  //   }
  /**
   * Create a new workspace.
   * @param {Object} docData - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

  static async getAllRoles() {
    try {
      const response = await request4(`roless`, "GET", {}, true, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async AddRole(body) {
    try {
      const response = await request4(
        `role`,
        "POST",
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

  static async EditRoles(id, body) {
    try {
      const response = await request4(
        `role/${id}`,
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

  static async DeleteRoles(id) {
    try {
      const response = await request4(
        `role/${id}`,
        "DELETE",
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
export default RolesService;
