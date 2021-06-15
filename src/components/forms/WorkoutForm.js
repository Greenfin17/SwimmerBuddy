// EditWorkouView

import React, {
  useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import {
  Form, FormGroup,
  Label, Input,
  Button,
} from 'reactstrap';
import GroupFormDiv from '../cards/GroupFormDiv';
// import { getWorkoutIndex } from '../../helpers/data/workoutGroupSetData';
import {
  getSets, deleteSetND,
  updateSet, addSet
} from '../../helpers/data/setData';
import {
  getSingleWorkout, updateWorkout,
  addWorkout, getUserWorkouts
} from '../../helpers/data/workoutData';
import {
  updateGroup, deleteGroupND,
  addGroup
} from '../../helpers/data/groupData';

const WorkoutForm = ({
  user,
  setUserWorkouts
}) => {
  const [workout, setWorkout] = useState({
    author_uid: user.uid,
    date: '',
    description: '',
    id: '',
    longcourse: 'true',
    meters: 'true',
    public: 'false',
    title: '',
    groupArr: []
  });
  const [localGroupArr, setLocalGroupArr] = useState([]);
  const [formSetArr, setFormSetArr] = useState([]);
  // trigger re-render on click for deleting group
  const [triggerGroup, setTriggerGroup] = useState(false);
  const [deletedGroups, setDeletedGroups] = useState([]);
  const [deletedSets, setDeletedSets] = useState([]);
  const history = useHistory();

  const { id } = useParams();

  const handleInputChange = (e) => {
    setWorkout((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : '',
    }));
  };

  const addGroupClick = () => {
    const sequence = localGroupArr.length;
    const tempArr = [...localGroupArr];
    const blankSetGroupObj = {
      comment: '',
      id: '',
      repetitions: '',
      sequence,
      title: '',
      workout_id: workout.id,
      setArr: []
    };
    tempArr.push(blankSetGroupObj);
    setLocalGroupArr(tempArr);
  };

  const removeGroup = (index) => {
    const tempGroupArr = [...localGroupArr];
    const groupId = localGroupArr[index].id;
    // Save to list of deleted groups if it has an id
    // i.e. it was not just added on this form.
    if (groupId) {
      const tempDeletedGroups = [...deletedGroups];
      tempDeletedGroups.push(groupId);
      setDeletedGroups(tempDeletedGroups);
    }
    tempGroupArr.splice(index, 1);
    setLocalGroupArr(tempGroupArr);
    setTriggerGroup(!triggerGroup);
  };

  const handleSubmit = ((e) => {
    e.preventDefault();
    // retain workout id for new workouts history push
    // delete removed sets and groups
    deletedSets.forEach((setId) => deleteSetND(setId));
    deletedGroups.forEach((groupId) => {
      getSets(groupId).then((setArr) => {
        setArr.forEach((set) => deleteSetND(set.id));
        deleteGroupND(groupId);
      });
    });
    // prepare object for saving
    const tempWorkoutObj = { ...workout };
    // remove groupArr as the data has changed
    // and is stored separately in the database
    delete tempWorkoutObj.groupArr;
    setWorkout(tempWorkoutObj);
    // update if there is an Id
    if (workout.id) {
      updateWorkout(workout.id, tempWorkoutObj).then(() => {
        let groupSequence = 0;
        let setSequence = 0;
        localGroupArr.forEach((groupObj) => {
          // remove setArr from object before saving
          // add sequence number
          const tempGroupObj = { ...groupObj };
          delete tempGroupObj.setArr;
          tempGroupObj.sequence = groupSequence;
          groupSequence += 1;
          // update Group
          if (tempGroupObj.id) {
            updateGroup(tempGroupObj.id, tempGroupObj);
            setSequence = 0;
            groupObj.setArr.forEach((setObj) => {
              // add sequence number.
              const tmpSetObj = { ...setObj };
              tmpSetObj.sequence = setSequence;
              setSequence += 1;
              if (setObj.id) {
                updateSet(setObj.id, tmpSetObj);
              } else addSet(tmpSetObj);
            });
          // add group and any associated sets
          } else {
            addGroup(tempGroupObj).then((newGroup) => {
              setSequence = 0;
              groupObj.setArr.forEach((setObj) => {
                const tmpSetObj = { ...setObj };
                tmpSetObj.sequence = setSequence;
                tmpSetObj.group_id = newGroup.id;
                setSequence += 1;
                addSet(tmpSetObj);
              });
            });
          } // else addGroup
        });
      }).then(() => {
        getUserWorkouts(user.uid).then((workoutsArr) => {
          setUserWorkouts(workoutsArr);
          history.push('/workouts');
        });
      });
    // add if there is no id, we are adding a workout
    } else {
      addWorkout(tempWorkoutObj).then((workoutObj) => {
        let groupSequence = 0;
        let setSequence = 0;
        localGroupArr.forEach((groupObj) => {
          // remove setArr from object before saving
          // add sequence number
          const tempGroupObj = { ...groupObj };
          delete tempGroupObj.setArr;
          tempGroupObj.sequence = groupSequence;
          tempGroupObj.workout_id = workoutObj.id;
          groupSequence += 1;
          addGroup(tempGroupObj).then((group) => {
            setSequence = 0;
            groupObj.setArr.forEach((setObj) => {
              // add sequence number.
              const tmpSetObj = { ...setObj };
              tmpSetObj.sequence = setSequence;
              tmpSetObj.group_id = group.id;
              setSequence += 1;
              addSet(tmpSetObj);
            });
          });
        });
      }).then(() => {
        getUserWorkouts(user.uid).then((workoutsArr) => {
          setUserWorkouts(workoutsArr);
          history.push('/workouts');
        });
      });
    } // if else
  }); // handleSubmit

  useEffect(() => {
    let mounted = true;
    if (id) {
      getSingleWorkout(id).then((workoutObj) => {
        if (mounted) {
          setWorkout(workoutObj);
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className='form-container'>
      <Form className='workout-form mb-4'>
        <div className='form-group-container'>
          <FormGroup className='workout-form-group'>
            <Label for='workout-title'>Workout Title</Label>
            <Input type='text' className='form-control' aria-describedby='Workout Title'
              name='title' value={workout.title || ''} onChange={handleInputChange}
              placeholder='Enter Workout Title' />
            <Label for='workout-description'>Description</Label>
            <Input type='text' className='form-control' aria-describedby='Workout Description'
              name='description' value={workout.description || ''} onChange={handleInputChange}
              placeholder='Workout Description' />
            <Label for='longcourse'>Pool Configuration</Label>
            <Input type='select' className='form-control' aria-describedby='Pool Configuration'
              name='longcourse' value={workout.longcourse || ''} onChange={handleInputChange}
              placeholder='Pool Configuration' >
              <option defaultValue='true'>Select longcourse or shortcourse</option>
              <option value='true'>Longcourse</option>
              <option value='false'>Shortcourse</option>
            </Input>
            <Label for='meters'>Unit</Label>
            <Input type='select' className='form-control' aria-describedby='Yard or Meters'
              name='meters' value={workout.meters} onChange={handleInputChange}>
              <option defaultValue='true'>Select yards or meters</option>
              <option value='true'>Meters</option>
              <option value='false'>Yards</option>
            </Input>
            <div className='add-set-group-icon' onClick={addGroupClick}>Add Set Group<i className='fas fa-plus'></i></div>
            <Button className='btn btn-info'
            onClick={handleSubmit}>Submit Workout</Button>
          </FormGroup>
          <GroupFormDiv workoutId={id}
            setWorkout={setWorkout}
            localGroupArr={localGroupArr}
            setLocalGroupArr={setLocalGroupArr}
            formSetArr={formSetArr}
            setFormSetArr={setFormSetArr}
            removeGroup={removeGroup}
            triggerGroup={triggerGroup}
            deletedSets={deletedSets}
            setDeletedSets={setDeletedSets} />
        </div>
      </Form>
    </div>
  );
};

WorkoutForm.propTypes = {
  user: PropTypes.any,
  setUserWorkouts: PropTypes.func
};

export default WorkoutForm;
