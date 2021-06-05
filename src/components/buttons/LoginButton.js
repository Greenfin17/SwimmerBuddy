import React from 'react';
import signIn from '../../helpers/auth/signIn';

const LoginButton = () => {
  const handleClick = () => {
    signIn();
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
