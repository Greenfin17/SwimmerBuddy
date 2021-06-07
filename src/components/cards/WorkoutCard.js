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
  workout,
}) => {
  const history = useHistory();
  const handleEditClick = () => {
    history.push(`/edit-workout/${workout.id}`);
  };

  const handleDeleteClick = () => {
    console.warn('click-delete');
  };

  const distanceFunc = (workoutObj) => {
    let returnVal = 0;
    let reps = 0;
    let groupTotal = 0;
    workoutObj.groupArr.forEach((unit) => {
      reps = Number(unit.repetitions);
      groupTotal = unit.groupDistance;
      if (Number.isInteger(reps)) {
        groupTotal *= reps;
      }
      returnVal += groupTotal;
      groupTotal = 0;
    });
    return returnVal;
  };
  const totalDistance = distanceFunc(workout);

  return (
    <>
      <Card className='workout-card'>
        <CardBody className='workout-card-body' >
          <CardTitle tag='h5'><div className='workout-heading row'>
            <div className='workout-title col-8'>{workout.title}</div>
            <div className='col-4'>Distance: {totalDistance}</div></div></CardTitle>
          <CardSubtitle tag='h6' className='mb-2 text-muted'>{user.fullName}</CardSubtitle>
          { workout.groupArr.map((group) => <div key={group.id} className='group-data'>
            <div className='row group-header'>
              <div className='col-4 group-title'>
                {group.title}</div>
              <div className='col-3 group-repetitions'>x {group.repetitions}</div>
              <div className='col-5 interval-header'>Interval</div>
            </div>
              { group.setArr.map((set) => <div key={set.id} className='set-data row' >
                  <div className='col-4'>{set.distance} x {set.repetitions} {set.stroke}</div>
                  <div className='col-6'>{set.comment}</div>
                  <div className='col-2 set-interval'>{set.interval}</div></div>)} </div>)}
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
  workout: PropTypes.object,
};

export default WorkoutCard;
