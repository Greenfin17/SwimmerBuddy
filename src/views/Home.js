// Home.js

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import TitleBox from '../components/TitleBox';

const Home = ({
  user,
  searchTerms
}) => {
  const title = 'Swimmer Buddy';
  const subTitle = 'Organize your Workouts';
  const history = useHistory();

  useEffect(() => {
    if (searchTerms.length) {
      history.push('/workouts');
    }
  }, [searchTerms]);

  return (
    <div className='home-page-container'>
    <TitleBox
      heading1={title}
      heading2={subTitle} />
    { user
      && <>
      <p className='home-welcome'>Welcome {user.fullName}!</p>
      </>
    }
    { !user
      && <>
        <h5 className='home-sign-in'>Sign in to view your workouts</h5>
      </>
    }
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.any,
  searchTerms: PropTypes.string
};

export default Home;
