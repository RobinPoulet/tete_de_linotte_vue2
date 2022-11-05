import axios from 'axios'

const url = "https://api-tdl-backend.herokuapp.com/api/category"

export default {

    getAllCategories: () => Promise.resolve(axios.get(url)),
   
    addCategory: (category) => Promise.resolve(axios.post(url, category)),

    updateCategory: (categoryId, category) => Promise.resolve(axios.put(`${url}/${categoryId}`, category)),
  
}

