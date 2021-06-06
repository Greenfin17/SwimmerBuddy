// Workouts.js
// View of workouts

import React from 'react';
import PropTypes from 'prop-types';
import WorkoutCard from '../components/cards/WorkoutCard';

const WorkoutsView = ({
  user,
  userWorkouts
}) => (
  <>
    <p>Workouts View</p>
    <p>Welcome {user.fullName}</p>
    <div className='workout-cards-container'>
      { user && userWorkouts.map((workout, key) => <WorkoutCard
        key={key}
        user={user}
        workout={workout}
        />)
      }
    </div>
  </>
);

WorkoutsView.propTypes = {
  user: PropTypes.any,
  userWorkouts: PropTypes.array
};

export default WorkoutsView;
