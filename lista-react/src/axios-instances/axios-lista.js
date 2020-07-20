import axios from 'axios'
import dev from '../util/dev'

const instance = axios.create({
    //baseURL: 'https://donde-esta-la-lista.herokuapp.com/lista'
    baseURL: dev.url+'lista/'
})
//axios.defaults.headers.common['Auth-Token'] = 'foo bar';
const storedToken = JSON.parse(localStorage.getItem('token'))
console.log('[INSTANCE]',storedToken )
instance.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken

export default instance
