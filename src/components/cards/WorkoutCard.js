// WorkoutCard.js
// Display individual workout on a card

import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card, CardBody,
  CardTitle, CardSubtitle,
  Button
} from 'reactstrap';

const WorkoutCard = ({
  user,
  workout
}) => {
  const history = useHistory();
  const handleEditClick = () => {
    history.push(`/edit-workout/${workout.id}`);
  };

  const handleDeleteClick = () => {
    console.warn('click-delete');
  };

  return (
    <>
      <Card className='workout-card'>
        <CardBody className='workout-card-body'>
          <CardTitle tag='h5'>{workout.title}</CardTitle>
          <CardSubtitle tag='h6' className='mb-2 text-muted'>{user.fullName}</CardSubtitle>
          { workout.groupArr.map((group, key) => <div key={key} className='group-data'>
            <div className='row group-header'>
              <div className='col-4 group-title'>
            {group.title}</div>
            <div className='col-3 group-repetitions'>x {group.repetitions}</div>
            <div className='col-5 '>Interval</div></div>
              { group.setArr.map((set, key2) => <div className='set-data row col-4' key={key2}>
                  {set.distance} x {set.repetitions} </div>)} </div>)}
          <hr />
          <Button className="btn btn-info"
            onClick={handleEditClick} >Edit Workout</Button>
          <Button className="btn btn-danger"
            onClick={handleDeleteClick}>Delete Workout</Button>
        </CardBody>
      </Card>
    </>
  );
};

WorkoutCard.propTypes = {
  user: PropTypes.any,
  workout: PropTypes.object
};

export default WorkoutCard;
