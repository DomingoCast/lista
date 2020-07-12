import React, {Component} from 'react'
import Popup from '../../components/Popup/Popup'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.resInterceptop= axios.interceptors.response.use(res => console.log('[RES]', res), error => {
                this.setState({ error: error})
                console.log('[ERROR]', error, error.data)
                setTimeout(() => {
                    this.setState({ error: null})
                }, 5000)
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqIterceptor)
            axios.interceptors.response.eject(this.resIterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render(){
            return(
                <>
                    <Popup type="error" display={this.state.error}>
                        { this.state.error ? (this.state.error.response ? this.state.error.response.data.msg : this.state.error.message) : null}
                    </Popup>

                    <WrappedComponent {...this.props}/>
                </>
            )
        }
    }
}

export default withErrorHandler
