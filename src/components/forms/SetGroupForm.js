// SetGroupForm.js

import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label, Input,
  Button
} from 'reactstrap';

const SetGroupForm = ({
  group,
  handleInputChange
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn('submit in SetGroupForm');
  };
  return (
    <div className='form-container'>
      <div className='form-group-container'>
        <FormGroup className='set-group-form-group'>
          <Label for='set-group-title'>Set Group Title</Label>
          <Input type='text' className='form-control' aria-describedby='Set Group Title'
            name='title' value={group.title || ''} onChange={handleInputChange}
            placeholder='Warm / Main Set etc' />
          <Label for='workout-description'>Comment</Label>
          <Input type='text' className='form-control' aria-describedby='Workout Description'
            name='description' value={group.comment || ''} onChange={handleInputChange}
            placeholder='Workout Description' />
          <Button className='btn btn-info'
          onClick={handleSubmit}>Submit SetGroup</Button>
        </FormGroup>
      </div>
    </div>
  );
};

SetGroupForm.propTypes = {
  handleInputChange: PropTypes.func,
  group: PropTypes.object
};

export default SetGroupForm;
