import React from 'react';
import './App.css';
import DefaultLayout from './pages/DefaultLayout/DefaultLayout';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <DefaultLayout></DefaultLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
