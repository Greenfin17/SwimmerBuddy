// SetGroupForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label, Input,
} from 'reactstrap';
import SetForm from './SetForm';

const SetGroupForm = ({
  group,
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
    console.warn(e.target.value);
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
            <Input type='text' className='form-control' aria-describedby='Workout Description'
              name='comment' value={localGroup.comment || ''} onChange={handleInputChange}
              placeholder='Workout Description' />
          </div>
        </div>
        <div className='row'>
          <Label className='col-4' for='workout-description'>Distance</Label>
          <Label className='col-8' for='workout-description'>Repetitions</Label>
        </div>
        { localGroup.setArr.map((set) => <SetForm
          key={set.id} set={set} />) }
      </FormGroup>
    </div>
  );
};

SetGroupForm.propTypes = {
  group: PropTypes.object,
};

export default SetGroupForm;
