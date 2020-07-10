import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/lista/'
})
//axios.defaults.headers.common['Auth-Token'] = 'foo bar';

export default instance
