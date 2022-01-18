import React from 'react';

import {Provider} from 'react-redux'
// import generateStore from './store/store'
import Login from './pages/Login';


import configureStore from './store/configureStore';
const store = configureStore(window.__STATE__)

function App() {
  return (
    <Provider store={store}> 
      <div className="container mt-3">
      <Login/>
      </div>
    </Provider>
  );
}

export default App;
