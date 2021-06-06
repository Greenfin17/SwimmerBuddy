// Home.js

import React from 'react';
import PropTypes from 'prop-types';
import TitleBox from '../components/TitleBox';

const Home = ({ user }) => (
  <>
  <TitleBox />
  { user
    && <>
    <p className='home-welcome'>Welcome {user.fullName}!</p>
    </>
  }
  { !user
    && <>
      <h5>Sign in to view your workouts</h5>
    </>
  }
  </>
);

Home.propTypes = {
  user: PropTypes.any
};

export default Home;
