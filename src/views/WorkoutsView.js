// Workouts.js
// View of workouts

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import WorkoutCard from '../components/cards/WorkoutCard';
import TitleBox from '../components/TitleBox';

const WorkoutsView = ({
  user,
  userWorkouts,
  setUserWorkouts
}) => {
  const history = useHistory();

  const handleAddClick = () => {
    history.push('/add-workout');
  };

  return (
  <>
    <TitleBox heading1='Workouts' />
    <div className='view-button-container'>
      <Button className='btn btn-info add-workout'
      onClick={handleAddClick} >Add Workout</Button>
    </div>
    <div className='workout-cards-container'>
      { user && userWorkouts.map((workout) => <WorkoutCard
        key={workout.id}
        workout={workout}
        user={user}
        setUserWorkouts={setUserWorkouts}
        />)
      }
    </div>
  </>
  );
};

WorkoutsView.propTypes = {
  user: PropTypes.any,
  userWorkouts: PropTypes.array,
  setUserWorkouts: PropTypes.func,
};

export default WorkoutsView;
