// Routes.js
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import WorkoutsView from '../views/WorkoutsView';
import WorkoutForm from '../components/forms/WorkoutForm';
import CollectionsView from '../views/CollectionsView';
import CollectionWorkoutsView from '../views/CollectionWorkoutsView';
import CollectionForm from '../components/forms/CollectionForm';

const AuthedRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (values) => (user
    ? (<Component {...values} user={user} />)
    : (<Redirect to={{ pathname: '/not-found', state: { from: values.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

AuthedRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any,
};

const Routes = ({
  user,
}) => (
  <div>
    <Switch>
      <Route exact path='/' component={() => <Home user={user} />} />
      <AuthedRoute exact path='/collections'
        user={user}
        component={() => <CollectionsView
          user={user} />}
      />
      <AuthedRoute exact path='/edit-collection/:id'
        user={user}
        component={() => <CollectionForm
          user={user} />}
      />
      <AuthedRoute exact path='/collection-workouts/:id'
        user={user}
        component={() => <CollectionWorkoutsView
          user={user} />}
      />
      <AuthedRoute exact path='/add-collection'
        user={user}
        component={() => <CollectionForm
          user={user} />}
      />
      <Route exact path='/workouts'
        user={user}
        component={() => <WorkoutsView
          user={user} />}
      />
      <AuthedRoute exact path='/edit-workout/:id'
        user={user}
        component={() => <WorkoutForm
          user={user} />}
      />
      <AuthedRoute exact path='/add-workout'
        user={user}
        component={() => <WorkoutForm
          user={user} />}
      />
      <Route path='*'
        component={NotFound}
      />
    </Switch>
  </div>
);

Routes.propTypes = {
  user: PropTypes.any,
};

export default Routes;
