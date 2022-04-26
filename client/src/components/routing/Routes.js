
import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Landing from '../layout/Landing';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-form/CreateProfile';
import EditProfile from '../profile-form/EditProfile';
import AddExperience from '../profile-form/AddExperience';
import AddEducation from '../profile-form/AddEducation'
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import PrivateRoute from '../routing/PrivateRoute';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';

export default function Routes() {
    return (
        <>
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
            path="/add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="/add-education"
            element={<PrivateRoute component={AddEducation} />}
          />
          <Route path="/posts" element={<PrivateRoute component={Posts} />} />
          <Route path="posts/:id" element={<PrivateRoute component={Post} />} /> 
          <Route path="/*" element={<NotFound />} />
          
        </Switch>
        </>
    )
}