// CollectionForm.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import {
  Form, FormGroup,
  Label, Input,
} from 'reactstrap';
import { getSingleCollection } from '../../helpers/data/collectionData';

const CollectionForm = ({
  user,
}) => {
  const [collection, setCollection] = useState({
    author_uid: user.uid,
    description: '',
    title: ''
  });

  const { id } = useParams();

  const handleInputChange = (e) => {
    setCollection((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : '',
    }));
  };

  useEffect(() => {
    let mounted = true;
    if (id) {
      getSingleCollection(id).then((respObj) => {
        if (mounted) {
          console.warn(respObj);
          setCollection(respObj);
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className='form-container'>
      <Form className='collection-form mb-4'>
        <div className='form-group-container'>
          <FormGroup className='collection-form-group'>
            <Label for='collection-title'>Collection Title</Label>
            <Input type='text' className='form-control' aria-describedby='Workout Title'
              name='title' value={collection.title || ''} onChange={handleInputChange}
              placeholder='Enter Workout Title' />
            <Label for='collection-description'>Description</Label>
            <Input type='text' className='form-control' aria-describedby='Workout Description'
              name='description' value={collection.description || ''} onChange={handleInputChange}
              placeholder='Workout Description' />
          </FormGroup>
         </div>
      </Form>
    </div>
  );
};

CollectionForm.propTypes = {
  user: PropTypes.any
};

export default CollectionForm;
