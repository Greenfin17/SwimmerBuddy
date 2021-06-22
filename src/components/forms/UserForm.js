import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Form, FormGroup,
  Label, Input,
  Button
} from 'reactstrap';
import { getUser, updateUser } from '../../helpers/data/userData';

const UserForm = ({}) => {
  const [localUser, setLocalUser] = useState({});
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
      updateUser(id, localUser).then(() => {
        history.push('/account');
      });
  };

  useEffect(() => {
    let mounted = true;
    if (id) {
      getUser(id).then((respObj) => {
        if (mounted) {
          setLocalUser(respObj);
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className='form-container user-form-container'>
      <Form className='user-form mb-4'>
        <div className='form-group-container'>
          <FormGroup className='user-form-group'>
            <Label for='display-name'>Display Name</Label>
            <Input type='text' className='form-control' aria-describedby='Workout Title'
              name='displayName' value={localUser.displayName || ''} onChange={handleInputChange}
              placeholder='Enter display name to change from default Google full name' />
            <Label for='club'>Club or Facility</Label>
            <Input type='text' className='form-control' aria-describedby='Collection Description'
              name='club' value={localUser.club || ''} onChange={handleInputChange}
              placeholder='Club or facility name' />
            <Label for='location'>Location</Label>
            <Input type='text' className='form-control' aria-describedby='Collection Description'
              name='location' value={localUser.location || ''} onChange={handleInputChange}
              placeholder='Location'/>
            <Button className='btn btn-info btn-submit-collection'
              onClick={handleSubmit}>Submit Collection</Button>
          </FormGroup>
         </div>
      </Form>
    </div>
  );
};

export default CollectionForm;
