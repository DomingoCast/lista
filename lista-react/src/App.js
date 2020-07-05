import React from 'react';
import './App.css';

import {Route, Switch, Redirect} from 'react-router-dom'

import Start from './components/Start/Start'
import Lista from './containers/Lista/Lista'

function App() {
  return (
        <>
            <Switch>
                <Route path="/start" component={Start}/>
                <Route path="/lista" component={Lista}/>

                <Redirect from="/" to="/start"/>
            </Switch>
        </>
  );
}

export default App
