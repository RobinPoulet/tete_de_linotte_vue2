const axios = require('axios');

const url = "https://api-tdl-backend.herokuapp.com/api/product";

export default  {

    getOne: async(id) => {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    },

    getAll: async() => {
        const response = await axios.get(url);
        return response.data;
    },

    add: async(product) => {
        const response = await axios.post(url, product);
        return response.data;
    },

    update: async(id, product) => {
        const response = await axios.put(`${url}/${id}`, product);
        return response.data;
    },

    delete: async(id) => {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    }

}