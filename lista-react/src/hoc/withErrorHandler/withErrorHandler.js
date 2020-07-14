import React, {Component} from 'react'

import { connect, dispatch } from 'react-redux'

const withErrorHandler = (WrappedComponent, axios) => {
    return (connect(null, mapActions)(
        class extends Component {
                componentWillMount(){
                    this.reqInterceptor = axios.interceptors.request.use(req => {
                        console.log(req)
                        const url = req.url.split('/')[0]
                        if(url !== 'putorder' && url !== 'posttolista' && url !== 'deleteorder'){
                            console.log('[HA GOTCHAAA] 1')
                            this.props.setPopup({
                                display: true,
                                text: "loading...",
                                type: "loading"
                            })
                        }
                        return req
                    })
                    this.resInterceptop= axios.interceptors.response.use(res =>{
                        console.log('[HA GOTCHAAA] 2', res)
                        //const url = res.config.url.split('/')[0]
                        this.props.setPopup({
                            display: false
                        })
                        return res

                    }, error => {
                        console.log('[ERROR]', error.response)
                        this.props.setPopup({
                            display: true,
                            text: error.response ? error.response.data.msg : error.message,
                            type: "error"
                        })
                        if(error.response.status === 401){
                            this.props.history.push('/login')
                        }

                        setTimeout(() => {
                            console.log('[YAAAAAAAAAAAAA????????]')
                            this.props.setPopup({
                                display: false
                            })
                        }, 5000)

                        return error //parece que hay que dejarlo asi para que funcione
                    })
                }

                componentWillUnmount(){
                    axios.interceptors.request.eject(this.reqIterceptor)
                    axios.interceptors.response.eject(this.resIterceptor)
                }

                render(){
                    return(
                        <>
                            <WrappedComponent {...this.props}/>
                        </>
                    )
                }
            }
    ))}

const mapActions = (dispatch) => {
    return{
        setPopup: (popData) => dispatch({type: 'SET_POPUP', popData: popData})
    }
}

//export default connect(null, mapActions)(withErrorHandler)
export default withErrorHandler
