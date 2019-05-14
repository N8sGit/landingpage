import React from 'react';
import PropTypes from 'prop-types';
import style from './hello-world.css';
import barrel from './barrel.png';

const HelloWorld = ({ title }) => (
  <div className={style['hello-world']}>
    {title}
    <p>You must be 21 or older to enter</p>
    <img src={barrel} alt="" />
  </div>
);

HelloWorld.propTypes = {
  title: PropTypes.string,
};

export default HelloWorld;
