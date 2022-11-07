const axios = require('axios');

const url = "https://api-tdl-backend.herokuapp.com/api/auth/";

export default {

    signup: async(user) => {
        const response = await axios.post(`${url}signup`, user);
        return response.data;
    },

    login: async(user) => {
        const response = await axios.post(`${url}login`, user);
        return response.data;
    }

}