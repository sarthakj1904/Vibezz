import React from 'react';
import './App.css';
import Login from './pages/Login';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from './store';
import Home from './pages/Home';



function App() {
  
  let store = configureStore();
  return (
    <Provider store = {store}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
        </Switch>
        <Switch>
          <Route path='/login' exact>
            <Login />
          </Route>
        </Switch>
      </Router>
     </Provider>

    
  );
}

export default App;
