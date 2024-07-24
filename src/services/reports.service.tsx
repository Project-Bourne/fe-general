import { factCheckRequest } from '../hooks/factcheckerApi'
class ReportService {
  // get factchecked docs service
  async getAllReports() {
    try {
      return await factCheckRequest("/reports", "GET", {}, true, false, false);
    } catch (error) {
      throw error;
    }
  }
}

export default ReportService;
