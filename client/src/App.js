
// npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension uuid
import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';

import './App.css';
import { LOGOUT } from './actions/types';
import Routes from './components/routing/Routes'

// REDUX
import { Provider } from 'react-redux'; // collega react con redux
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';




const  App = ()=> {

  useEffect(()=> {

    
    if(localStorage.token) {
      setAuthToken(localStorage.token)
      
    }

    store.dispatch(loadUser())
    store.dispatch(loadUser())

    // logout the user da tutte le tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT })
    })
  }, [])

  return(
    <Provider store={store}>  {/* RENDE ACCESSIBILE LO STATO OVUNQUE */}
      <Router>
        <Navbar />
        <Routes />
        
      </Router>
    </Provider>
  )
}

export default App;
