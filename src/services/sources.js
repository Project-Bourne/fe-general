import { request2 } from "../hooks/api";

class SourceService {
  //   static getUserViaAccessToken() {
  //     throw new Error("Method not implemented.");
  //   }
  /**
   * Create a new workspace.
   * @param {Object} docData - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

  static async getAllSources() {
    try {
      const response = await request2(`sources`, "GET", {}, true, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async AddSource(body) {
    try {
      const response = await request2(
        `source`,
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
  static async EditSource(body) {
    try {
      const response = await request2(
        `source`,
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

  static async DeleteSource(body) {
    try {
      const response = await request2(
        `source`,
        "DELETE",
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
}

// Export the Service class.
export default SourceService;
