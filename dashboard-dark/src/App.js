import React from 'react';
import './App.css';
import DefaultLayout from './pages/DefaultLayout/DefaultLayout';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import './style/global-style.css'

import Login from './views/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Switch>
              <Route path='/Home' component={DefaultLayout}/>
              <Route exact path='/Login' component={Login}/>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
