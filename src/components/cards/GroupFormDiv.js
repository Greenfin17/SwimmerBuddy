// GroupFormDiv.js
// Displays groups and sets in the workout form

import React from 'react';
import PropTypes from 'prop-types';

const GroupFormDiv = ({
  groupArr
}) => (
  <div className='form-group-listing'>
    { groupArr.map((group) => <div key={group.id} className='form-group-data'>
      <div className='row form-group-header'>
        <div className='col-4 form-group-title'>
          {group.title}</div>
        <div className='col-3 group-repetitions'>x {group.repetitions}</div>
        <div className='col-5 interval-header'>Interval</div>
      </div>
      { group.setArr.map((set) => <div key={set.id} className='set-data row' >
          <div className='col-4'>{set.distance} x {set.repetitions} {set.stroke}</div>
          <div className='col-6'>{set.comment}</div>
          <div className='col-2 set-interval'>{set.interval}</div>
        </div>)}
    </div>)}
  </div>
);

GroupFormDiv.propTypes = {
  groupArr: PropTypes.array
};

export default GroupFormDiv;
