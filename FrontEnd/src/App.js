import React from 'react';
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import MyShares from './pages/MyShares';
import PrivateRoute from './routers/PrivateRoute';

import configureStore from './store/configureStore';
const store = configureStore()

function App() {
  return (
    <Provider store={store}> 
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute component={MyShares} path="/myshares" exact/>
          <Route component={Login} path="/login" exact/>
          <Redirect to='/myshares' />
        </Switch>
    </Router>
    </Provider>
  );
}

export default App;
