import React from 'react';
import './App.css';

import {Route, Switch, Redirect} from 'react-router-dom'

import Start from './components/Start/Start'
import Lista from './containers/Lista/Lista'
import Prueba from './containers/Prueba/Lista'
import Listas from './containers/Listas/Listas'
import Login from './containers/Auth/Login'
import Singup from './containers/Auth/Singup'

//import { connect, dispatch } from 'react-redux'

import axios from 'axios'
import axiosAuth from './axios-instances/axios-auth'
import axiosLista from './axios-instances/axios-lista'

import Layout from './hoc/Layout/Layout'

function App(props) {
    const storedToken = JSON.parse(localStorage.getItem('token'))

    axios.defaults.headers.common['Authorization'] = props.token
    axiosAuth.defaults.headers.common['Authorization'] = props.token
    axiosLista.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken
    axiosLista.defaults.headers.common['Authorization'] = 'Bearer ' + props.token
    console.log('[TOKEN APP]', props.token)
  return (
        <Layout>
            <Switch>
                <Route path="/prueba" component={Prueba}/>
                <Route path="/login" component={Login}/>
                <Route path="/singup" component={Singup}/>
                <Route path="/start" component={Start}/>
                <Route path="/lista/:id" component={Lista}/>
                <Route path="/listas" component={Listas}/>

                <Redirect from="/" to="/start"/>
            </Switch>
        </Layout>
  );
}
//const mapState = (state ) => ({
    //token : state.token
//})

export default App
//export default connect(mapState)(App)
