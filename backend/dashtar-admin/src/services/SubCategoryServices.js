import requests from './httpService';

const SubCategoryServices = {
  getAllSubCategory() {
    return requests.get('/subCategory');
  },

  getSubCategoryById(id) {
    return requests.get(`/subCategory/${id}`);
  },

  addSubCategory(body) {
    return requests.post('/subCategory/add', body);
  },

  updateSubCategory(id, body) {
    return requests.put(`/subCategory/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/subCategory/status/${id}`, body);
  },

  deleteSubCategory(id, body) {
    return requests.delete(`/subCategory/${id}`, body);
  },
};

export default SubCategoryServices;
