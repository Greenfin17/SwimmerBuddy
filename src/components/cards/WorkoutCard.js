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
import { deleteWorkout, getSingleWorkout } from '../../helpers/data/workoutData';
import { deleteJoinND, getWorkoutCollectionJoins } from '../../helpers/data/workoutCollectionData';
import { getUser } from '../../helpers/data/userData';

const WorkoutCard = ({
  user,
  workout,
  setUserWorkouts
}) => {
  const [groupArr, setGroupArr] = useState([]);
  const [localWorkout, setLocalWorkout] = useState({});
  const [author, setAuthor] = useState({});
  const [groupDistanceArr, setGroupDistanceArr] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const history = useHistory();
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
        getWorkoutCollectionJoins(workout.id).then((joinArr) => {
          joinArr.forEach((join) => {
            deleteJoinND(join.id);
          });
        });
        setUserWorkouts(workoutsArr);
      });
    }
  };

  useEffect(() => {
    let mounted = true;
    let tmpTotalDistance = 0;
    groupDistanceArr.forEach((distance) => {
      tmpTotalDistance += distance;
    });
    if (mounted) {
      setTotalDistance(tmpTotalDistance);
    }
    return function cleanup() {
      mounted = false;
    };
  }, [groupDistanceArr]);

  useEffect(() => {
    let mounted = true;
    if (workout && workout.id) {
      getSingleWorkout(workout.id).then((workoutObj) => {
        setLocalWorkout(workoutObj);
      });
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

  useEffect(() => {
    let mounted = true;
    // needed for author name
    getUser(localWorkout.author_uid).then((authorArr) => {
      if (authorArr && mounted) {
        setAuthor(authorArr[0]);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, [localWorkout]);

  return (
    <>
      <Card className='workout-card'>
        <CardBody className='workout-card-body' >
          <CardTitle tag='h5'><div className='workout-heading row'>
            <div className='workout-title col-8'>{localWorkout.title}</div>
            <div className='col-4'>{totalDistance}
              { workout.meters === 'true' ? ' Meters' : ' Yards' }</div></div></CardTitle>
          <CardSubtitle tag='h6' className='mb-2 col-4 text-muted'>
            {author?.fullName}</CardSubtitle>
          { groupArr && groupArr.map((group, index) => <GroupCardDiv key={group.id}
            index={index} id={group.id} group={group}
            groupDistanceArr={groupDistanceArr}
            setGroupDistanceArr={setGroupDistanceArr} />)}
        </CardBody>
        { user && user.uid === localWorkout.author_uid
          && <div className='card-footer mt-auto card-btn-container'>
            <Button className="btn btn-info"
              onClick={handleEditClick} >Edit Workout</Button>
            <Button className="btn btn-danger"
              onClick={handleDeleteClick}>Delete Workout</Button>
          </div>
        }
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
