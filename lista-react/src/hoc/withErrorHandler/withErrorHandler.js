import React, {Component} from 'react'

import { connect, dispatch } from 'react-redux'

const withErrorHandler = (WrappedComponent, axios) => {
    return (connect(null, mapActions)(
        class extends Component {
                componentWillMount(){
                    this.reqInterceptor = axios.interceptors.request.use(req => {
                        this.props.setPopup({
                            display: true,
                            text: "loading...",
                            type: "loading"
                        })
                        return req
                    })
                    this.resInterceptop= axios.interceptors.response.use(res =>{
                        this.props.setPopup({
                            display: false
                        })
                        return res

                    }, error => {
                        console.log('[ERROR]', error)
                        this.props.setPopup({
                            display: true,
                            text: error.response ? error.response.data.msg : error.message,
                            type: "error"
                        })
                        setTimeout(() => {
                            this.props.setPopup({
                                display: false
                            })
                        }, 5000)
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
