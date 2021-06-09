// EditWorkouView

import React, {
  useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  Form, FormGroup,
  Label, Input,
  Button,
} from 'reactstrap';
import GroupFormDiv from '../cards/GroupFormDiv';
import { getWorkoutIndex } from '../../helpers/data/workoutGroupSetData';

const WorkoutForm = ({
  user,
  workoutProp
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

  const { id } = useParams();

  const handleInputChange = (e) => {
    setWorkout((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : '',
    }));
    console.warn(e.target.value);
  };

  const handleSubmit = ((e) => {
    e.preventDefault();
    console.warn(id);
  });

  useEffect(() => {
    if (id) {
      const index = getWorkoutIndex(workoutProp, id);
      setWorkout(workoutProp[index]);
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
            <Button className='btn btn-info'
            onClick={handleSubmit}>Submit Workout</Button>
          </FormGroup>
          <GroupFormDiv groupArr={workout.groupArr}
            workoutId={id}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}/>
        </div>
      </Form>
    </div>
  );
};

WorkoutForm.propTypes = {
  user: PropTypes.any,
  workoutProp: PropTypes.array
};

export default WorkoutForm;
