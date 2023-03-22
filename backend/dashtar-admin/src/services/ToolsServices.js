import requests from './httpService';

const ToolsServices = {
  getAllTools() {
    return requests.get('/tools');
  },

  getToolsById(id) {
    return requests.get(`/tools/${id}`);
  },

  addTools(body) {
    return requests.post('/tools/add', body);
  },

  updateTools(id, body) {
    return requests.put(`/tools/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/tools/status/${id}`, body);
  },

  deleteTools(id, body) {
    return requests.delete(`/tools/${id}`, body);
  },
};

export default ToolsServices;
