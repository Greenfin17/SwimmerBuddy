// GroupFormDiv.js
// Displays groups and sets in the workout form

import React from 'react';
import PropTypes from 'prop-types';
// import GroupFormCard from './GroupFormCard';
import SetGroupForm from '../forms/SetGroupForm';

const GroupFormDiv = ({
  workout,
  setWorkout,
  localGroupArr,
  setLocalGroupArr
}) => (
  <div className='form-group-listing'>
    <div className='form-listing-wrapper'>
    { workout.groupArr.map((group, key) => <SetGroupForm
        key={group.id}
        index={key}
        group={group}
        localGroupArr={localGroupArr}
        setLocalGroupArr={setLocalGroupArr}
        workout={workout}
        setWorkout={setWorkout} />)}
    </div>
  </div>
);

GroupFormDiv.propTypes = {
  workout: PropTypes.object,
  setWorkout: PropTypes.func,
  localGroupArr: PropTypes.array,
  setLocalGroupArr: PropTypes.func
};

export default GroupFormDiv;
