// SetGroupForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label, Input,
} from 'reactstrap';
import SetForm from './SetForm';

const SetGroupForm = ({
  index,
  group,
  localGroupArr,
  setLocalGroupArr,
}) => {
  const [localGroup, setLocalGroup] = useState({
    comment: '',
    id: '',
    repetitions: '',
    sequence: '',
    title: '',
    workout_id: group.id,
    setArr: []
  });

  const handleInputChange = (e) => {
    setLocalGroup((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : '',
    }));
  };

  useEffect(() => {
    const tempGroupArr = [...localGroupArr];
    tempGroupArr[index] = { ...localGroup };
    setLocalGroupArr(tempGroupArr);
  }, [localGroup]);
  /*
  useEffect(() => {
    const tempWorkout = { ...workout };
    tempWorkout.groupArr = [...localGroupArr];
    setWorkout(tempWorkout);
  }, []);
*/
  useEffect(() => {
    setLocalGroup(group);
  }, []);

  return (
    <div className='set-group-form-container'>
      <FormGroup className='set-localGroup-form-group'>
        <div className='row'>
          <div className='col-4'>
            <Label for='set-localGroup-title'>Set Group Title</Label>
            <Input type='text' className='form-control' aria-describedby='Set Group Title'
              name='title' value={localGroup.title || ''} onChange={handleInputChange}
              placeholder='Warm / Main Set etc' />
          </div>
          <div className='col-8'>
            <Label for='workout-description'>Comment</Label>
            <Input type='text' className='form-control' aria-describedby='Workout Description'
              name='comment' value={localGroup.comment || ''} onChange={handleInputChange}
              placeholder='Workout Description' />
          </div>
        </div>
        <div className='row'>
          <Label className='col-2 set-distance' for='set-distance'>Distance</Label>
          <Label className='col-2 set-reps' for='set-repetitions'>Reps</Label>
          <Label className='col-3' for='set-stroke'>Stroke</Label>
          <Label className='col-2' for='set-comment'>Comment</Label>
          <Label className='col-3 set-interval' for='set-interval'>Interval</Label>
        </div>
        { group.setArr.map((set, key) => <SetForm
          key={set.id} index={key}
          set={set}
          localGroup={localGroup} setLocalGroup={setLocalGroup}
          />) }
      </FormGroup>
    </div>
  );
};

SetGroupForm.propTypes = {
  index: PropTypes.number,
  group: PropTypes.object,
  localGroupArr: PropTypes.array,
  setLocalGroupArr: PropTypes.func,
};

export default SetGroupForm;
