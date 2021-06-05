import React from 'react';
import { useHistory } from 'react-router-dom';
import signOut from '../../helpers/auth/signOut';

const LogoutButton = () => {
  const history = useHistory();
  const handleClick = () => {
    signOut().then(() => {
      history.push('/');
    });
  };

  return (
    <div>
    <button id="google-auth" className="btn btn-danger ml-2"
      onClick={handleClick}>
      <i className="fas fa-sign-out-alt logout"
        onClick={handleClick}></i><br />Log Out</button>
    </div>
  );
};

export default LogoutButton;
