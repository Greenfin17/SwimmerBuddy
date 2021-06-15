// Workouts.js
// View of workouts

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import WorkoutCard from '../components/cards/WorkoutCard';
import TitleBox from '../components/TitleBox';
import { getUserWorkouts } from '../helpers/data/workoutData';

const WorkoutsView = ({
  user
}) => {
  const history = useHistory();
  const [userWorkouts, setUserWorkouts] = useState([]);

  const handleAddClick = () => {
    history.push('/add-workout');
  };

  useEffect(() => {
    let mounted = true;
    if (user) {
      getUserWorkouts(user.uid).then((workoutsArr) => {
        if (mounted) {
          setUserWorkouts(workoutsArr);
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

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
  user: PropTypes.any
};

export default WorkoutsView;
