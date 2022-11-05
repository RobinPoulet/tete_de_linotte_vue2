import axios from 'axios'

const url = "https://api-tdl-backend.herokuapp.com/api/auth/"

export default {

    signup: (user) => Promise.resolve(axios.post(url + "signup", user)),

    login: (user) => Promise.resolve(axios.post(url + "login", user)),
    
}