// TitleBox.js
// Component for title and subtitle
import React from 'react';
import PropTypes from 'prop-types';

const TitleBox = ({
  heading1,
  heading2,
}) => (
  <div className='title-box'>
    <h1 className='title-box-h1'>{heading1}</h1>
    <h2 className='title-box-h2'>{heading2}</h2>
  </div>
);

TitleBox.propTypes = {
  heading1: PropTypes.string,
  heading2: PropTypes.string
};

export default TitleBox;
