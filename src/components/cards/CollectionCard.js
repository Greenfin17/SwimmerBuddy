// CollectionCard.js

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Card, CardBody,
  CardTitle, Button
} from 'reactstrap';
import { deleteCollection } from '../../helpers/data/collectionData';

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
      deleteCollection(user.uid, collection.id).then((respCollectionArr) => {
        setCollectionArray(respCollectionArr);
        history.push('/collections');
      });
    }
  };

  return (
    <>
      <Card className='collection-card'>
        <CardBody className='collection-card-body' >
          <CardTitle tag='h5'>
              <div className='collection-title '>{collection.title}</div>
          </CardTitle>
          <div className='collection-title col-8'>{collection.description}</div>
        </CardBody>
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
