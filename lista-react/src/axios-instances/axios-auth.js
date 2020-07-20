import axios from 'axios'
import dev from '../util/dev'

const instance = axios.create({
    baseURL: dev.url+'auth/'
    //baseURL: 'https://donde-esta-la-lista.herokuapp.com/auth'
})

export default instance
