// CollectionWorkoutsView.js

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button
} from 'reactstrap';
import TitleBox from '../components/TitleBox';
import WorkoutCard from '../components/cards/WorkoutCard';
import { getCollectionWorkoutJoins } from '../helpers/data/workoutCollectionData';
// import { getSingleWorkout } from '../helpers/data/workoutData';

const CollectionWorkoutsView = ({
  user
}) => {
  const [collectionWorkouts, setCollectionWorkouts] = useState([]);
  const history = useHistory();

  const { id } = useParams();

  const handleAddClick = () => {
    history.push('/add-workout');
  };

  useEffect(() => {
    getCollectionWorkoutJoins(id).then((joinArr) => {
      const tmpArr = [];
      let tmpObj = {};
      joinArr.forEach((join) => {
        tmpObj = { id: join.workout_id };
        tmpArr.push(tmpObj);
      });
      setCollectionWorkouts(tmpArr);
      console.warn(collectionWorkouts);
    });
  }, []);

  return (
    <div className='workouts-view'>
    <TitleBox heading1='Workouts' />
    <div className='view-button-container'>
      <Button className='btn btn-info add-workout'
      onClick={handleAddClick} >Add Workout</Button>
    </div>
    <div className='workout-cards-container'>
      { user && collectionWorkouts.map((workout) => <WorkoutCard
        key={workout.id}
        workout={workout}
        user={user}
        setUserWorkouts={setCollectionWorkouts}
        />)
      }
    </div>
  </div>
  );
};

CollectionWorkoutsView.propTypes = {
  user: PropTypes.any
};

export default CollectionWorkoutsView;
