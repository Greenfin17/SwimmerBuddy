// GroupFormCard.js

import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button
} from 'reactstrap';
import SetGroupForm from '../forms/SetGroupForm';

const GroupFormCard = ({
  group,
  workoutId,
  handleInputChange
}) => {
  // const history = useHistory();
  const [viewForm, setViewForm] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
  };
  const handleEditClick = (e) => {
    e.preventDefault();
    setViewForm(!viewForm);
  };

  return (
    <div className='form-group-data'>
      <div className='row form-group-header'>
        <div className='col-4 form-group-title'>
          {group.title}</div>
        <div className='col-5 group-repetitions'>x {group.repetitions}</div>
        <div className='col-3 interval-header'>Interval</div>
      </div>
      { group.setArr.map((set) => <div key={set.id} className='set-data row' >
          <div className='col-4'>{set.distance} x {set.repetitions} {set.stroke}</div>
          <div className='col-5'>{set.comment}</div>
          <div className='col-3 set-interval'>{set.interval}</div>
        </div>)}
        <Button className="btn btn-info btn-sm"
          onClick={handleEditClick} >Edit SetGroup</Button>
        <Button className="btn btn-danger btn-sm"
          onClick={handleDeleteClick} >Delete SetGroup</Button>
        { viewForm && <SetGroupForm group={group}
          handleInputChange={handleInputChange} /> }
      </div>
  );
};

GroupFormCard.propTypes = {
  group: PropTypes.object,
  workoutId: PropTypes.string,
  handleInputChange: PropTypes.func,
};

export default GroupFormCard;
