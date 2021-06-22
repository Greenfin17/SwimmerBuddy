import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  Form, FormGroup,
  Label, Input,
  Button
} from 'reactstrap';
import { updateUser } from '../../helpers/data/userData';

const UserForm = ({
  user,
  setUser
}) => {
  const [localUser, setLocalUser] = useState({});
  const history = useHistory();

  const handleInputChange = (e) => {
    setLocalUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : '',
    }));
  };

  const handleSubmit = () => {
    if (user.id) {
      updateUser(user.id, localUser).then(() => {
        setUser(localUser);
        history.push('/');
      });
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLocalUser(user);
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
            <Button className='btn btn-info btn-submit-user'
              onClick={handleSubmit}>Submit Profile</Button>
          </FormGroup>
         </div>
      </Form>
    </div>
  );
};

UserForm.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default UserForm;
