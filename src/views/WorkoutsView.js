// Workouts.js
// View of workouts

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import WorkoutCard from '../components/cards/WorkoutCard';
import TitleBox from '../components/TitleBox';
import { getPublicWorkouts, getUserWorkouts } from '../helpers/data/workoutData';

const WorkoutsView = ({
  user,
  searchTerms
}) => {
  const history = useHistory();
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [filterCopy, setFilterCopy] = useState([]);

  const handleAddClick = () => {
    history.push('/add-workout');
  };

  const searchWorkouts = (workout) => {
    console.warn(workout.description);
    workout.description.includes(searchTerms);
  };

  useEffect(() => {
    const tmpArr = userWorkouts.filter(searchWorkouts);
    setFilterCopy(tmpArr);
    console.warn(filterCopy);
  });

  useEffect(() => {
    let mounted = true;
    if (user) {
      getUserWorkouts(user.uid).then((workoutsArr) => {
        if (mounted) {
          setUserWorkouts(workoutsArr);
        }
      });
    } else {
      getPublicWorkouts().then((workoutsArr) => {
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
  <div className='workouts-view'>
    <TitleBox heading1='Workouts' />
    { user
      && <div className='view-button-container'>
        <Button className='btn btn-info add-workout'
        onClick={handleAddClick} >Add Workout</Button>
      </div>
    }
    <div className='card-container workout-cards-container'>
      { userWorkouts.map((workout) => <WorkoutCard
        key={workout.id}
        workout={workout}
        user={user}
        setUserWorkouts={setUserWorkouts}
        />)
      }
    </div>
  </div>
  );
};

WorkoutsView.propTypes = {
  user: PropTypes.any,
  searchTerms: PropTypes.string
};

export default WorkoutsView;
