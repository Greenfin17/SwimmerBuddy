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
import { getSingleCollection } from '../helpers/data/collectionData';
// import { getSingleWorkout } from '../helpers/data/workoutData';

const CollectionWorkoutsView = ({
  user
}) => {
  const [collectionWorkouts, setCollectionWorkouts] = useState([]);
  const [collection, setCollection] = useState({});
  const history = useHistory();

  const { id } = useParams();

  const handleAddClick = () => {
    history.push('/add-workout');
  };

  useEffect(() => {
    // retrieving collection title
    getSingleCollection(id).then((collectionObj) => {
      setCollection(collectionObj);
    });
    const tmpArr = [];
    getCollectionWorkoutJoins(id).then((joinArr) => {
      joinArr.forEach((join) => {
        const tmpObj = {
          id: join.workout_id
        };
        tmpArr.push(tmpObj);
      });
      setCollectionWorkouts(tmpArr);
    });

    // getting the collection workouts
  }, []);

  return (
    <div className='workouts-view'>
    <TitleBox heading1={collection.title} />
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
