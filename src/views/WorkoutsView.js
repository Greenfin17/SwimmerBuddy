// Workouts.js
// View of workouts

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import WorkoutCard from '../components/cards/WorkoutCard';
import TitleBox from '../components/TitleBox';
import { getPublicWorkouts, getUserWorkouts } from '../helpers/data/workoutData';

const WorkoutsView = ({
  user,
  searchTerms,
}) => {
  const history = useHistory();
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [filterCopy, setFilterCopy] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleAddClick = () => {
    history.push('/add-workout');
  };

  const searchWorkouts = (workout) => {
    const lowerCaseSearchTerms = searchTerms.toLowerCase();
    let returnVal = workout.description.toLowerCase().includes(lowerCaseSearchTerms);
    returnVal = returnVal || workout.title.toLowerCase().includes(lowerCaseSearchTerms);
    returnVal = returnVal || workout.title.toLowerCase().includes(lowerCaseSearchTerms);

    if (searchTerms.toLowerCase().includes('Longcourse'.toLowerCase())) {
      if (workout.longcourse === 'true') {
        returnVal = true;
      } else returnVal = returnVal || false;
    }
    if (searchTerms.toLowerCase().includes('Shortcourse'.toLowerCase())) {
      if (workout.longcourse === 'false') {
        returnVal = true;
      } else returnVal = returnVal || false;
    }
    if (searchTerms.toLowerCase().includes('Meter'.toLowerCase())) {
      if (workout.meters === 'true') {
        returnVal = true;
      } else returnVal = returnVal || false;
    }
    if (searchTerms.toLowerCase().includes('Yard'.toLowerCase())) {
      if (workout.meters === 'false') {
        returnVal = true;
      } else returnVal = returnVal || false;
    }
    return returnVal;
    // return workout.description.includes(searchTerms);
  };

  // run search when the search terms change, run when userWorkouts is loaded
  useEffect(() => {
    const tmpArr = userWorkouts.filter((workout) => searchWorkouts(workout));
    setFilterCopy(tmpArr);
  }, [searchTerms, userWorkouts]);

  useEffect(() => {
    let mounted = true;
    if (user) {
      getUserWorkouts(user.uid).then((workoutsArr) => {
        if (mounted) {
          setUserWorkouts(workoutsArr);
          const tmpArr = [];
          workoutsArr.forEach((workout) => {
            let tmpObj = {};
            tmpObj = { ...workout };
            tmpArr.push(tmpObj);
          });
          setFilterCopy(tmpArr);
          setLoaded(true);
        }
      });
    } else {
      getPublicWorkouts().then((workoutsArr) => {
        if (mounted) {
          setUserWorkouts(workoutsArr);
          setLoaded(true);
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
      { !loaded && <Spinner className='workout-view-spinner' color='primary' /> }
      { filterCopy.map((workout) => <WorkoutCard
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
  searchTerms: PropTypes.string,
};

export default WorkoutsView;
