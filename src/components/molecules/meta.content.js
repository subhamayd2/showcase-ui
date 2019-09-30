import React from 'react';
import { Checkbox } from 'antd';
import withStyles, { useStyles } from '../utils/withStyles';

const MetaContent = ({
  name,
  array,
  onSelect,
  classes: { container, item: itemClass },
  isSelected
}) => {
  const onSelectHandler = item => e => {
    onSelect({ target: { name, value: [item, e.target.checked] } });
  };
  return (
    <div className={container}>
      {array.map(item => {
        return (
          <div key={item} className={itemClass}>
            <Checkbox
              checked={isSelected(name, item)}
              onChange={onSelectHandler(item)}
            >
              {item}
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
};

const style = useStyles({
  container: {
    width: '100%',
    maxWidth: 600,
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    padding: 5
  }
});

export default withStyles(style)(MetaContent);
