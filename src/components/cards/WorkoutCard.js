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
import { deleteGroupND, getGroups, cmpGroups } from '../../helpers/data/groupData';
import GroupCardDiv from './GroupCardDiv';
import { deleteSetND, getSets } from '../../helpers/data/setData';
import { deleteWorkout } from '../../helpers/data/workoutData';

const WorkoutCard = ({
  user,
  workout,
  setUserWorkouts
}) => {
  const [groupArr, setGroupArr] = useState([]);
  const [groupDistanceArr, setGroupDistanceArr] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const history = useHistory();
  let mounted = true;
  const handleEditClick = () => {
    if (workout && workout.id) {
      history.push(`/edit-workout/${workout.id}`);
    }
  };

  const handleDeleteClick = () => {
    groupArr.forEach((groupObj) => {
      getSets(groupObj.id).then((setArr) => {
        setArr.forEach((setObj) => {
          deleteSetND(setObj.id);
        });
      });
      deleteGroupND(groupObj.id);
    });
    if (workout) {
      deleteWorkout(workout.author_uid, workout.id).then((workoutsArr) => {
        setUserWorkouts(workoutsArr);
      });
    }
  };

  useEffect(() => {
    const tmpArr = [];
    // create empty array for child groups to
    // populate their distances
    groupArr.forEach(() => tmpArr.push(''));
  }, [groupArr]);

  useEffect(() => {
    let tmpTotalDistance = 0;
    groupDistanceArr.forEach((distance) => {
      tmpTotalDistance += distance;
    });
    setTotalDistance(tmpTotalDistance);
  }, [groupDistanceArr]);

  useEffect(() => {
    if (workout && workout.id) {
      getGroups(workout.id).then((respGroupArr) => {
        respGroupArr.sort(cmpGroups);
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
            <div className='col-4'>{totalDistance}
              { workout.meters === 'true' ? ' Meters' : ' Yards' }</div></div></CardTitle>
          <CardSubtitle tag='h6' className='mb-2 text-muted'>{user.fullName}</CardSubtitle>
          { groupArr && groupArr.map((group, index) => <GroupCardDiv key={group.id}
            index={index} id={group.id} group={group}
            groupDistanceArr={groupDistanceArr}
            setGroupDistanceArr={setGroupDistanceArr} />)}
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
