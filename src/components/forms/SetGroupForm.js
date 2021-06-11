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
  workoutId,
}) => {
  const [localGroup, setLocalGroup] = useState({
    comment: '',
    id: '',
    repetitions: '',
    sequence: 0,
    title: '',
    workout_id: workoutId,
    setArr: []
  });

  const handleInputChange = (e) => {
    setLocalGroup((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : '',
    }));
  };

  useEffect(() => {
    const tempLocalGroupArr = [...localGroupArr];
    tempLocalGroupArr[index] = { ...localGroup };
    setLocalGroupArr(tempLocalGroupArr);
  }, [localGroup]);

  const addSetClick = () => {
    // Sequence starts at 1 for readability if needed
    const sequence = localGroup.setArr.length + 1;
    const tempGroup = { ...localGroup };
    const tempGroupArr = [...localGroupArr];
    const blankSetObj = {
      comment: '',
      id: '',
      repetitions: '',
      sequence,
      group_id: group.id,
    };
    tempGroup.setArr.push(blankSetObj);
    setLocalGroup(tempGroup);
    tempGroupArr[index] = { ...tempGroup };
    setLocalGroupArr(tempGroupArr);
  };

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
              <span className='add-set-icon' onClick={addSetClick}>Add Set<i className='fas fa-plus'></i></span>
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
          key={key} index={key}
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
  workoutId: PropTypes.string,
};

export default SetGroupForm;
