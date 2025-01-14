// SetForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Input
} from 'reactstrap';

const SetForm = ({
  set,
  index,
  groupIndex,
  deleteSet,
  localGroupArr,
  setLocalGroupArr,
  trigger,
  setTrigger,
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
    setTrigger(!trigger);
  };

  // send data back to base form
  useEffect(() => {
    let mounted = true;
    const tempGroupArr = [...localGroupArr];
    tempGroupArr[groupIndex].setArr[index] = { ...localSet };
    if (mounted) {
      setLocalGroupArr(tempGroupArr);
    }
    return function cleanup() {
      mounted = false;
    };
  }, [localSet]);

  useEffect(() => {
    setLocalSet(set);
  }, [trigger]);
  return (
    <div className='row set-input'>
      <div className='col-1 set-distance'>
        <Input type='text' className='form-control' aria-describedby='Set Group Title'
          name='distance' value={localSet.distance || ''} onChange={handleInputChange}
        />
      </div>
      <div className='col-1 set-multiplier'> x </div>
      <div className='col-1'>
        <Input type='text' className='form-control' aria-describedby='Set Repetitions'
          name='repetitions' value={localSet.repetitions || ''} onChange={handleInputChange}
        />
      </div>
      <div className='col-3'>
        <Input type='text' className='form-control' aria-describedby='Set Stroke'
          name='stroke' value={localSet.stroke || ''} onChange={handleInputChange}
          placeholder='' />
      </div>
      <div className='col-4 set-comment'>
        <Input type='text' className='form-control' aria-describedby='Set Comment'
          name='comment' value={localSet.comment || ''} onChange={handleInputChange}
          placeholder='' />
      </div>
      <div className='col-1 col-set-interval'>
        <Input type='text' className='form-control set-interval' aria-describedby='Set Interval'
          name='interval' value={localSet.interval || ''} onChange={handleInputChange}
          placeholder='' />
      </div>
      <div className='col-1 col-set-trash'>
        <span className='remove-set-icon'><i onClick={removeSetClick} className='fas fa-trash '></i></span>
      </div>
    </div>
  );
};

SetForm.propTypes = {
  index: PropTypes.number,
  groupIndex: PropTypes.number,
  deleteSet: PropTypes.func,
  trigger: PropTypes.bool,
  setTrigger: PropTypes.func,
  localGroupArr: PropTypes.array,
  setLocalGroupArr: PropTypes.func,
  set: PropTypes.object

};

export default SetForm;
