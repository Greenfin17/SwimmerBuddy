// GroupFormDiv.js
// Displays groups and sets in the workout form

import React from 'react';
import PropTypes from 'prop-types';
// import GroupFormCard from './GroupFormCard';
import SetGroupForm from '../forms/SetGroupForm';

const GroupFormDiv = ({
  workout,
  localGroupArr,
  setLocalGroupArr
}) => (
  <div className='form-group-listing'>
    <div className='form-listing-wrapper'>
    { localGroupArr.map((group, key) => <SetGroupForm
        key={key}
        index={key}
        group={group}
        localGroupArr={localGroupArr}
        setLocalGroupArr={setLocalGroupArr}
        workoutId={workout.id}
      />)}
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
