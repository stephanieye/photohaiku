import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';


const SecureRoute = ({ component: Component, ...rest}) => {
  !Auth.isAuthenticated() && Flash.setMessage('denied', 'to explore photohaiku, please log in.');

  return (
    <Route {...rest} render={props =>
      Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    } />
  );
};

export default SecureRoute;
