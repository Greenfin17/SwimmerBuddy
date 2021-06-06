// Routes.js
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import WorkoutsView from '../views/WorkoutsView';

const AuthedRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (values) => (user
    ? (<Component {...values} user={user} />)
    : (<Redirect to={{ pathname: '/not-found', state: { from: values.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

AuthedRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};

const Routes = ({
  user,
  userWorkouts
}) => (
  <div>
    <Switch>
      <Route exact path='/' component={() => <Home user={user} />} />
      <AuthedRoute exact path='/workouts'
        user={user}
        component={() => <WorkoutsView
          user={user}
          userWorkouts={userWorkouts} />} />
    </Switch>
  </div>
);

Routes.propTypes = {
  user: PropTypes.any,
  userWorkouts: PropTypes.array
};

export default Routes;
