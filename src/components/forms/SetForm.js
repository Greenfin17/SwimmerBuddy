// SetForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Input
} from 'reactstrap';

const SetForm = ({
  set,
  index,
  localGroup,
  setLocalGroup,
  deleteSet,
  trigger
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
  };

  const removeSetClick = () => {
    deleteSet(index);
    console.warn(localSet);
  };

  // Update parent component localGroup hook
  useEffect(() => {
    const groupObj = { ...localGroup };
    groupObj.setArr[index] = { ...localSet };
    setLocalGroup(groupObj);
  }, [localSet]);

  useEffect(() => {
    setLocalSet(set);
  }, [trigger]);

  return (
    <div className='row'>
      <div className='col-1 set-distance'>
        <Input type='text' className='form-control' aria-describedby='Set Group Title'
          name='distance' value={localSet.distance || ''} onChange={handleInputChange}
          placeholder='100/200 etc' />
      </div>
      <div className='col-1 set-multiplier'> x </div>
      <div className='col-1'>
        <Input type='text' className='form-control' aria-describedby='Set Repetitions'
          name='repetitions' value={localSet.repetitions || ''} onChange={handleInputChange}
          placeholder='' />
      </div>
      <div className='col-3'>
        <Input type='text' className='form-control' aria-describedby='Set Stroke'
          name='stroke' value={localSet.stroke || ''} onChange={handleInputChange}
          placeholder='' />
      </div>
      <div className='col-4'>
        <Input type='text' className='form-control' aria-describedby='Set Comment'
          name='comment' value={localSet.comment || ''} onChange={handleInputChange}
          placeholder='' />
      </div>
      <div className='col-1'>
        <Input type='text' className='form-control' aria-describedby='Set Interval'
          name='interval' value={localSet.interval || ''} onChange={handleInputChange}
          placeholder='' />
      </div>
      <div className='col-1'>
        <span className='remove-set-icon'><i onClick={removeSetClick} className='fas fa-trash '></i></span>
      </div>
    </div>
  );
};

SetForm.propTypes = {
  set: PropTypes.object,
  index: PropTypes.number,
  localGroup: PropTypes.object,
  setLocalGroup: PropTypes.func,
  deleteSet: PropTypes.func,
  trigger: PropTypes.bool
};

export default SetForm;
