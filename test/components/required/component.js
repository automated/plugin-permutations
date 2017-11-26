/* eslint-disable react/no-unused-prop-types, react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const Component = () => <div />;

Component.propTypes = {
  boolProp: PropTypes.bool.isRequired,
  stringProp: PropTypes.string.isRequired,
};

export default Component;
