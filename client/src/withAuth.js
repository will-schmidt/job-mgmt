import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import { getToken } from './utils/authentication';

// handle the private routes
export const PrivateRoute = ({ component: Component, ...rest }) => 
  <Route
    {...rest}
    render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />}
  />

// handle the public routes
export const PublicRoute = ({ component: Component, ...rest }) => 
  <Route
    {...rest}
    render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />}
  />
