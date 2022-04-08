
// npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment uuid
import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Routes as Switch
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';

// REDUX
import { Provider } from 'react-redux'; // collega react con redux
import store from './store';


const  App = ()=> (
  <Provider store={store}>  {/* RENDE ACCESSIBILE LO STATO OVUNQUE */}
    <Router>
      <Navbar />
      <Alert />
      <Switch>
        
        <Route exact path="/" element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
          
        
      </Switch>
    </Router>
  </Provider>
)


export default App;