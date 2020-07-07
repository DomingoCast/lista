import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/lista/'
})

export default instance
