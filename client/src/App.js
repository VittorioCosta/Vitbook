
// npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment uuid
import React, { useEffect } from 'react';
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
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation'
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import { LOGOUT } from './actions/types';

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

    // logout the user da tutte le tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT })
    })
  }, [])

  return(
    <Provider store={store}>  {/* RENDE ACCESSIBILE LO STATO OVUNQUE */}
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          
          <Route exact path="/" element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profiles' element={<Profiles />} />
          <Route path="profile/:id" element={<Profile />} />

          <Route
            path='/dashboard' 
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path='/create-profile' 
            element={<PrivateRoute component={CreateProfile} />}
          />
          <Route
            path='/edit-profile'
            element={<PrivateRoute component={EditProfile} />}
          />
          <Route
            path="add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="add-education"
            element={<PrivateRoute component={AddEducation} />}
          />
          
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
