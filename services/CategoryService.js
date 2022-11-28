const axios = require('axios');

const url = "https://api-tdl-backend.herokuapp.com/api/category";

export default  {

    getOne: async(id) => {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    },
    
    getAll: async() => {
        const response = await axios.get(url);
        return response.data;
    },   
    
    add: async(category) => {
        const response = await axios.post(url, category);
        return response.data; 
    },

    update: async(id, category) => {
        const response = await axios.put(`${url}/${id}`, category);
        return response.data;
    },

    delete: async(id) => {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    },

}