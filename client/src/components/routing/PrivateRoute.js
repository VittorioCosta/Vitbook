import React from 'react'
import PropTypes from 'prop-types'
import {  Navigate } from 'react-router-dom'
import { connect } from 'react-redux'


const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading }
  }) => {

    if (isAuthenticated) return <Component />;
  
    return <Navigate to="/login" />;
  };
  
  


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)