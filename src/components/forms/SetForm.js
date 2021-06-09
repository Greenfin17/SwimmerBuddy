// SetForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Input
} from 'reactstrap';

const SetForm = ({
  set,
}) => {
  const [localSet, setLocalSet] = useState({
    comment: '',
    distance: '',
    group_id: '',
    interval: '',
    repetitions: '',
    sequence: '',
    stroke: ''
  });
  const handleInputChange = (e) => {
    setLocalSet((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : '',
    }));
    console.warn(e.target.value);
  };
  useEffect(() => {
    setLocalSet(set);
  }, []);

  return (
    <div className='row'>
      <div className='col-4'>
        <Input type='text' className='form-control' aria-describedby='Set Group Title'
          name='distance' value={localSet.distance || ''} onChange={handleInputChange}
          placeholder='100/200 etc' />
      </div>
      <div className='col-8'>
        <Input type='text' className='form-control' aria-describedby='Workout Description'
          name='repetitions' value={localSet.repetitions || ''} onChange={handleInputChange}
          placeholder='' />
      </div>
    </div>
  );
};

SetForm.propTypes = {
  set: PropTypes.object,
  handleInputChange: PropTypes.func
};

export default SetForm;
