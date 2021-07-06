// Routes.js
import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import WorkoutsView from '../views/WorkoutsView';
import SharedWorkoutsView from '../views/SharedWorkoutsView';
import WorkoutForm from '../components/forms/WorkoutForm';
import CollectionsView from '../views/CollectionsView';
import CollectionWorkoutsView from '../views/CollectionWorkoutsView';
import CollectionForm from '../components/forms/CollectionForm';
import UserForm from '../components/forms/UserForm';

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
  setUser,
  searchTerms
}) => {
  const [crossTrigger, setCrossTrigger] = useState({});

  return (
    <div>
      <Switch>
        <Route exact path='/'
        component={() => <Home user={user}
        searchTerms={searchTerms}/>} />
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
            user={user}
            searchTerms={searchTerms}
            crossTrigger={crossTrigger} />}
        />
        <Route exact path='/shared-workouts'
          user={user}
          component={() => <SharedWorkoutsView
            user={user}
            searchTerms={searchTerms}/>}
        />
        <AuthedRoute exact path='/edit-workout/:id'
          user={user}
          component={() => <WorkoutForm
            user={user}
            crossTrigger={crossTrigger}
            setCrossTrigger={setCrossTrigger} />}
        />
        <AuthedRoute exact path='/add-workout'
          user={user}
          component={() => <WorkoutForm
            user={user}
            crossTrigger={crossTrigger}
            setCrossTrigger={setCrossTrigger} />}
        />
        <AuthedRoute exact path='/account'
          user={user}
          component={() => <UserForm
            user={user}
            setUser={setUser} />}
        />
        <Route path='*'
          component={NotFound}
        />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  searchTerms: PropTypes.string
};

export default Routes;
