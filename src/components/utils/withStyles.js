import React from 'react';

const withStyles = styles => Component => props => {
  const classes = styles();
  return <Component classes={classes} {...props} />;
};

export default withStyles;
