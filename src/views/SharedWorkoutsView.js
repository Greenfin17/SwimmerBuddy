// Workouts.js
// View of workouts

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import WorkoutCard from '../components/cards/WorkoutCard';
import TitleBox from '../components/TitleBox';
import { getPublicWorkouts } from '../helpers/data/workoutData';
import searchWorkouts from '../helpers/data/search';

const SharedWorkoutsView = ({
  user,
  searchTerms
}) => {
  const history = useHistory();
  const [publicWorkouts, setPublicWorkouts] = useState([]);
  const [filterCopy, setFilterCopy] = useState([]);

  const handleAddClick = () => {
    history.push('/add-workout');
  };

  // run search when the search terms change, run when userWorkouts is loaded
  useEffect(() => {
    if (searchTerms) {
      const tmpArr = publicWorkouts.filter((workout) => searchWorkouts(workout, searchTerms));
      setFilterCopy(tmpArr);
    }
  }, [searchTerms, publicWorkouts]);

  useEffect(() => {
    let mounted = true;
    getPublicWorkouts().then((workoutsArr) => {
      if (mounted) {
        setPublicWorkouts(workoutsArr);
        const tmpArr = [];
        workoutsArr.forEach((workout) => {
          let tmpObj = {};
          tmpObj = { ...workout };
          tmpArr.push(tmpObj);
        });
        setFilterCopy(tmpArr);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
  <div className='workouts-view'>
    <TitleBox heading1='Shared Workouts' />
    { user
      && <div className='view-button-container'>
        <Button className='btn btn-info add-workout'
        onClick={handleAddClick} >Add Workout</Button>
      </div>
    }
    <div className='card-container workout-cards-container'>
      { filterCopy.map((workout) => user?.uid !== workout.author_uid
        && <WorkoutCard
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
  user: PropTypes.any,
  searchTerms: PropTypes.string
};

export default SharedWorkoutsView;
