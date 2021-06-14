// WorkoutCard.js
// Display individual workout on a card

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card, CardBody,
  CardTitle, CardSubtitle,
  Button
} from 'reactstrap';
import { deleteGroupND, getGroups } from '../../helpers/data/groupData';
import GroupCardDiv from './GroupCardDiv';
import { deleteSetND, getSets } from '../../helpers/data/setData';
import { deleteWorkout } from '../../helpers/data/workoutData';

const WorkoutCard = ({
  user,
  workout,
  setUserWorkouts
}) => {
  const [groupArr, setGroupArr] = useState([]);
  const history = useHistory();
  let mounted = true;
  const handleEditClick = () => {
    if (workout && workout.id) {
      history.push(`/edit-workout/${workout.id}`);
    }
  };

  const handleDeleteClick = () => {
    console.warn('click-delete');
    groupArr.forEach((groupObj) => {
      getSets(groupObj.id).then((setArr) => {
        setArr.forEach((setObj) => {
          deleteSetND(setObj.id);
        });
      });
      deleteGroupND(groupObj.id);
    });
    console.warn(workout, user.uid);
    if (workout) {
      deleteWorkout(workout.author_uid, workout.id).then((workoutsArr) => {
        setUserWorkouts(workoutsArr);
      });
    }
  };
  /*
  const distanceFunc = (workoutObj) => {
    let returnVal = 0;
    let reps = 0;
    let groupTotal = 0;
    if (workoutObj) {
      workoutObj.groupArr.forEach((unit) => {
        reps = Number(unit.repetitions);
        groupTotal = unit.groupDistance;
        if (Number.isInteger(reps)) {
          groupTotal *= reps;
        }
        returnVal += groupTotal;
        groupTotal = 0;
      });
    }
    return returnVal;
  };

  const totalDistance = distanceFunc(workout);
  */
  useEffect(() => {
    if (workout && workout.id) {
      getGroups(workout.id).then((respGroupArr) => {
        if (mounted) {
          setGroupArr(respGroupArr);
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Card className='workout-card'>
        <CardBody className='workout-card-body' >
          <CardTitle tag='h5'><div className='workout-heading row'>
            <div className='workout-title col-8'>{workout.title}</div>
            <div className='col-4'>Distance: </div></div></CardTitle>
          <CardSubtitle tag='h6' className='mb-2 text-muted'>{user.fullName}</CardSubtitle>
          { groupArr && groupArr.map((group) => <GroupCardDiv key={group.id}
            id={group.id} group={group} />)}
          <div className='card-btn-container'>
            <Button className="btn btn-info"
              onClick={handleEditClick} >Edit Workout</Button>
            <Button className="btn btn-danger"
              onClick={handleDeleteClick}>Delete Workout</Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

WorkoutCard.propTypes = {
  user: PropTypes.any,
  workout: PropTypes.object,
  setUserWorkouts: PropTypes.func
};

export default WorkoutCard;
