import React from 'react';
import { createUseStyles } from 'react-jss';

const withStyles = styles => Component => props => {
  const classes = styles(props);
  return <Component classes={classes} {...props} />;
};

export default withStyles;
export const useStyles = createUseStyles;
