import React from 'react';
import './App.css';

import {Route, Switch, Redirect} from 'react-router-dom'

import Start from './components/Start/Start'
import Lista from './containers/Lista/Lista'
import Prueba from './containers/Prueba/Lista'
import Listas from './containers/Listas/Listas'

function App() {
  return (
        <>
            <Switch>
                <Route path="/prueba" component={Prueba}/>
                <Route path="/start" component={Start}/>
                <Route path="/lista/:id" component={Lista}/>
                <Route path="/listas" component={Listas}/>

                <Redirect from="/" to="/start"/>
            </Switch>
        </>
  );
}

export default App
