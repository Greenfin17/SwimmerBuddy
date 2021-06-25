import React from 'react';
import { useHistory } from 'react-router-dom';
import signIn from '../../helpers/auth/signIn';

const LoginButton = () => {
  const history = useHistory();
  const handleClick = () => {
    signIn();
    history.push('/');
  };

  return (
    <div>
      <button name='google-auth' className='btn btn-danger'
        onClick={handleClick}>GOOGLE LOGIN
      </button>
    </div>
  );
};

export default LoginButton;
