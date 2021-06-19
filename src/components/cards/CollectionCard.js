// CollectionCard.js

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Card, CardBody,
  CardTitle, Button
} from 'reactstrap';
import { deleteCollection } from '../../helpers/data/collectionData';
import { deleteJoinND, getCollectionWorkoutJoins } from '../../helpers/data/workoutCollectionData';

const CollectionCard = ({
  user,
  collection,
  setCollectionArray
}) => {
  const history = useHistory();

  const handleEditClick = () => {
    if (collection && collection.id) {
      history.push(`/edit-collection/${collection.id}`);
    }
  };

  const handleDeleteClick = () => {
    if (collection && collection.id) {
      getCollectionWorkoutJoins(collection.id).then((joinArr) => {
        joinArr.forEach((join) => {
          console.warn(join);
          deleteJoinND(join.id);
        });
      });
      deleteCollection(user.uid, collection.id).then((respCollectionArr) => {
        setCollectionArray(respCollectionArr);
        history.push('/collections');
      });
    }
  };

  const handleCardClick = () => {
    if (collection && collection.id) {
      history.push(`/collection-workouts/${collection.id}`);
    }
  };

  return (
    <>
      <Card className='collection-card'>
        <CardBody className='collection-card-body' onClick={handleCardClick} >
          <CardTitle tag='h5'>
              <div className='collection-title '>{collection.title}</div>
          </CardTitle>
          <div className='collection-description'>{collection.description}</div>
          <div className='collection-card-instructions'>Click to view workouts</div>
        </CardBody>
        <hr />
        <div className='card-btn-container'>
          <Button className="btn btn-info"
            onClick={handleEditClick} >Edit Collection</Button>
          <Button className="btn btn-danger"
            onClick={handleDeleteClick}>Delete Collection</Button>
        </div>
      </Card>
    </>
  );
};

CollectionCard.propTypes = {
  user: PropTypes.any,
  collection: PropTypes.object,
  setCollectionArray: PropTypes.func
};

export default CollectionCard;
