import axios from 'axios'

const instance = axios.create({
    //baseURL: 'http://localhost:8080/auth/'
    baseURL: 'https://donde-esta-la-lista.herokuapp.com/auth'
})

export default instance
