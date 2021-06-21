// Shared WorkoutCard.js
// Display individual workout on a card

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody,
  CardTitle, CardSubtitle,
  Button, Label, Input
} from 'reactstrap';
import { getGroups, cmpGroups } from '../../helpers/data/groupData';
import GroupCardDiv from './GroupCardDiv';
import { getSingleWorkout } from '../../helpers/data/workoutData';
import { getUser } from '../../helpers/data/userData';
import {
  getWorkoutCollectionsCheckedArr, deleteWorkoutCollection,
  addWorkoutCollection
} from '../../helpers/data/workoutCollectionData';

const SharedWorkoutCard = ({
  user,
  workout
}) => {
  const [groupArr, setGroupArr] = useState([]);
  const [localWorkout, setLocalWorkout] = useState({});
  const [author, setAuthor] = useState({});
  const [groupDistanceArr, setGroupDistanceArr] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [collectionsArr, setCollectionsArr] = useState([]);
  const [initialCollectionsArr, setInitialCollectionsArr] = useState([]);
  const [toggleAddCollections, setToggleAddCollections] = useState(false);
  const handleCheckboxChange = (e, index) => {
    const tmpArr = [...collectionsArr];
    tmpArr[index].checked = e.target.checked;
    setCollectionsArr(tmpArr);
  };

  const saveCollectionChoices = (workoutId) => {
    for (let i = 0; i < initialCollectionsArr.length; i += 1) {
      if (initialCollectionsArr[i].checked === true && collectionsArr && collectionsArr[i].checked === false) {
        deleteWorkoutCollection(collectionsArr[i].join_id);
      } else if (!initialCollectionsArr[i].checked && collectionsArr && collectionsArr[i].checked === true) {
        const tmpObj = {
          author_uid: collectionsArr[i].author_uid,
          collection_id: collectionsArr[i].id,
          workout_id: workout.id
        };
        if (workoutId) {
          tmpObj.workout_id = workoutId;
        }
        addWorkoutCollection(user.uid, tmpObj);
      }
    }
  };

  const handleToggleCollections = () => {
    setToggleAddCollections(!toggleAddCollections);
    console.warn(toggleAddCollections);
  };

  const handleSubmitChoices = () => {
    saveCollectionChoices();
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
    if (user && workout && mounted) {
      getWorkoutCollectionsCheckedArr(user.uid, workout.id).then((responseArr) => {
        if (mounted) {
          setCollectionsArr(responseArr);
        }
        const tmpArr = [];
        for (let i = 0; i < responseArr.length; i += 1) {
          const tmpObj = { checked: false };
          tmpObj.checked = responseArr[i].checked;
          tmpArr.push(tmpObj);
        }
        setInitialCollectionsArr(tmpArr);
        console.warn(tmpArr);
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

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
        { user
          && <div className='shared-workouts-checkbox'>
            <div className='collection-checkbox-label'
              onClick={handleToggleCollections}>
              Add to Collection(s)</div>
          { toggleAddCollections
            && <>
              <div className='checkbox-container'>
                <ul className='collection-ul'>
                  { collectionsArr.map((collection, index) => <li key={collection.id}><div
                    className='form-check' key={collection.id} >
                    <Input type='checkbox' className='form-check-input' aria-describedby='Add to Collecton'
                      name='checked' value={collection.id} key={index}
                      onChange={(e) => handleCheckboxChange(e, index)} checked={collection.checked} />
                    <Label for='collection_id'>{collection.title}</Label>
                  </div> </li>)}
                </ul>
              <div className='card-footer mt-auto card-btn-container'>
                <Button className="btn btn-info"
                  onClick={handleSubmitChoices}>Submit Choices</Button>
              </div>
              </div>
            </> }
          </div>
        }
      </Card>
    </>
  );
};

SharedWorkoutCard.propTypes = {
  user: PropTypes.any,
  workout: PropTypes.object,
};

export default SharedWorkoutCard;
