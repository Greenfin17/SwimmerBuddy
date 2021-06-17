// CollectionForm.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

import {
  Form, FormGroup,
  Label, Input,
  Button
} from 'reactstrap';
import {
  getSingleCollection,
  addCollection,
  updateCollection
} from '../../helpers/data/collectionData';

const CollectionForm = ({
  user,
}) => {
  const [collection, setCollection] = useState({
    author_uid: user.uid,
    description: '',
    title: ''
  });
  const history = useHistory();

  const { id } = useParams();

  const handleInputChange = (e) => {
    setCollection((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : '',
    }));
  };

  const handleSubmit = () => {
    if (id) {
      updateCollection(id, collection).then(() => {
        history.push('/collections');
      });
    } else {
      addCollection(collection).then(() => {
        history.push('/collections');
      });
    }
  };

  useEffect(() => {
    let mounted = true;
    if (id) {
      getSingleCollection(id).then((respObj) => {
        if (mounted) {
          setCollection(respObj);
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className='form-container collection-form-container'>
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
            <Button className='btn btn-info btn-submit-collection'
              onClick={handleSubmit}>Submit Workout</Button>
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
