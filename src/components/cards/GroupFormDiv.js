// GroupFormDiv.js
// Displays groups and sets in the workout form

import React from 'react';
import PropTypes from 'prop-types';
import GroupFormCard from './GroupFormCard';

const GroupFormDiv = ({
  groupArr,
  workoutId,
  handleInputChange
}) => {
  console.warn(groupArr.length);

  return (
  <div className='form-group-listing'>
    <div className='form-listing-wrapper'>
    { groupArr.map((group) => <GroupFormCard
        key={group.id} workoutId={workoutId} group={group}
        handInputChange={handleInputChange} />)}
    </div>
  </div>
  );
};

GroupFormDiv.propTypes = {
  groupArr: PropTypes.array,
  workoutId: PropTypes.string,
  handleInputChange: PropTypes.func
};

export default GroupFormDiv;
