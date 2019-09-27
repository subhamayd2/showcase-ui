import React from 'react';
import withStyles, { useStyles } from '../utils/withStyles';

const Image = ({ classes: { img } }) => {
  return <div className={img} />;
};

const styles = useStyles({
  img: ({ src }) => ({
    width: '100%',
    height: 200,
    background: `url(${src}) 25% 0 no-repeat`,
    backgroundSize: 'cover'
  })
});

export default withStyles(styles)(Image);
