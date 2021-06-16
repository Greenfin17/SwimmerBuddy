// CollectionCard.js

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody,
  CardTitle
} from 'reactstrap';

const CollectionCard = ({
  collection
}) => (
  <>
    <Card className='collection-card'>
      <CardBody className='collection-card-body' >
        <CardTitle tag='h5'>
            <div className='collection-title '>{collection.title}</div>
        </CardTitle>
        <div className='collection-title col-8'>{collection.description}</div>
      </CardBody>
    </Card>
  </>
);

CollectionCard.propTypes = {
  collection: PropTypes.object
};

export default CollectionCard;
