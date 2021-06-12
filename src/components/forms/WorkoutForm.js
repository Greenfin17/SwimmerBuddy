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
import { getWorkoutIndex } from '../../helpers/data/workoutGroupSetData';

const WorkoutForm = ({
  user,
  workoutProp,
  submitted,
  setSubmitted
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
    console.warn(deletedGroups);
  };

  const handleSubmit = (() => {
    console.warn('submit');
    history.push('/workouts');
    setSubmitted(!submitted);
  });

  useEffect(() => {
    if (id) {
      const index = getWorkoutIndex(workoutProp, id);
      setWorkout(workoutProp[index]);
      setLocalGroupArr(workoutProp[index].groupArr);
    }
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
          <GroupFormDiv workout={workout}
            setWorkout={setWorkout}
            localGroupArr={localGroupArr}
            setLocalGroupArr={setLocalGroupArr}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
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
  workoutProp: PropTypes.array,
  submitted: PropTypes.bool,
  setSubmitted: PropTypes.func
};

export default WorkoutForm;
