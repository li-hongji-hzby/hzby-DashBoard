import React from 'react';
import './App.css';
import './style/global-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './views/Login'

import { DefaultLayout } from './containers';
import './server'

function App() {
  return (
    <BrowserRouter>
      <div className="App brank-black">
          <Switch>
              <Redirect exact path="/" to="/Home" />
              <Route path='/Home' component={DefaultLayout}/>
              <Route exact path='/Login' component={Login}/>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
