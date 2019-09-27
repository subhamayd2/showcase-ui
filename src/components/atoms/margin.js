import React from 'react';
import withStyles, { useStyles } from '../utils/withStyles';

const Margin = ({
  all,
  top,
  right,
  bottom,
  left,
  children,
  classes: { div }
}) => {
  if (all > 0) {
    return (
      <div className={div} style={{ margin: all }}>
        {children}
      </div>
    );
  }
  return (
    <div
      className={div}
      style={{
        marginTop: top,
        marginRight: right,
        marginBottom: bottom,
        marginLeft: left
      }}
    >
      {children}
    </div>
  );
};

Margin.defaultProps = {
  all: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const styles = useStyles({
  div: {
    display: 'inline',
    margin: 0,
    padding: 0
  }
});

export default withStyles(styles)(Margin);
