// Workouts.js
// View of workouts

import React from 'react';
import PropTypes from 'prop-types';
import WorkoutCard from '../components/cards/WorkoutCard';
import TitleBox from '../components/TitleBox';

const WorkoutsView = ({
  user,
  userWorkouts
}) => (
  <>
    <TitleBox heading1='Workouts' />
    <div className='workout-cards-container'>
      { user && userWorkouts.map((workout) => <WorkoutCard
        key={workout.id}
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
