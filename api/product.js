import axios from 'axios'

const url = "https://api-tdl-backend.herokuapp.com/api/product"

export default {

    getAllProducts: () => Promise.resolve(axios.get(url)),

    addOneProduct: (product) => Promise.resolve(axios.post(url, product)),

}