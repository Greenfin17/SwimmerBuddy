// Workouts.js
// View of workouts

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import SharedWorkoutCard from '../components/cards/SharedWorkoutCard';
import TitleBox from '../components/TitleBox';
import { getPublicWorkouts } from '../helpers/data/workoutData';

const SharedWorkoutsView = ({
  user
}) => {
  const history = useHistory();
  const [publicWorkouts, setPublicWorkouts] = useState([]);

  const handleAddClick = () => {
    history.push('/add-workout');
  };

  useEffect(() => {
    let mounted = true;
    getPublicWorkouts().then((workoutsArr) => {
      if (mounted) {
        setPublicWorkouts(workoutsArr);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
  <div className='workouts-view'>
    <TitleBox heading1='Workouts' />
    { user
      && <div className='view-button-container'>
        <Button className='btn btn-info add-workout'
        onClick={handleAddClick} >Add Workout</Button>
      </div>
    }
    <div className='card-container workout-cards-container'>
      { publicWorkouts.map((workout) => user?.uid !== workout.author_uid
        && <SharedWorkoutCard
        key={workout.id}
        workout={workout}
        user={user}
        setUserWorkouts={setPublicWorkouts}
        />)
      }
    </div>
  </div>
  );
};

SharedWorkoutsView.propTypes = {
  user: PropTypes.any
};

export default SharedWorkoutsView;
