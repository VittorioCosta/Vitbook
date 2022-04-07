
// npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment
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
import './App.css';


const  App = ()=> (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path="/" element={<Landing />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
        
      
    </Switch>
  </Router>
)


export default App;
