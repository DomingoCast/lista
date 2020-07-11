import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/lista/'
})
//axios.defaults.headers.common['Auth-Token'] = 'foo bar';
const storedToken = JSON.parse(localStorage.getItem('token'))
instance.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken

export default instance
