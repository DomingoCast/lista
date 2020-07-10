import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'

import { createStore/*, applyMiddleware*/, compose/*, combineReducers*/  } from 'redux'
import { Provider } from 'react-redux'

//import axios from 'axios'
//import axiosAuth from './axios-instances/axios-auth'
//import axiosLista from './axios-instances/axios-lista'

import './index.sass';

import reducer from './store/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(/*applyMiddleware(thunk)*/))


//console.log('[STORE]', store.getState(), store.getState().token)

//axios.defaults.headers.common['Authorization'] = {token: store.getState().token}
//axiosAuth.defaults.headers.common['Authorization'] = store.getState().token//{token: store.getState().token}
//axiosLista.defaults.headers.common['Authorization'] = {token: store.getState().token}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
