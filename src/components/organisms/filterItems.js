import React, { useEffect, useState } from "react";
import { Menu, Icon, Checkbox, Popover, Button } from "antd";
import withStore from "../utils/withStore";
import Store from "../utils/filter.store";
import withStyles, { useStyles } from "../utils/withStyles";
import { getAllColors } from "../../services/services";

const { Divider, SubMenu, Item } = Menu;

const FilterItems = ({
  store: { filter, onFilterChange },
  classes: { menu }
}) => {
  const [allMenu, setAllMenu] = useState({
    color: false
  });
  const [colors, setColors] = useState([]);
  useEffect(() => {
    let isSubscribed = true;
    getAllColors().then(colors => {
      if (isSubscribed) {
        setColors(colors);
      }
    });
    return () => (isSubscribed = false);
  }, []);
  const onChange = e => {
    console.log(e);
    const event = {
      target: {
        name: e.item.props.name,
        value: ""
      }
    };
  };
  return (
    <Menu className={menu} mode="inline" selectable={false}>
      <SubMenu
        title={
          <span>
            <Icon type="bg-colors" />
            <span>Color</span>
          </span>
        }
      >
        {colors.slice(0, 5).map(color => {
          return (
            <Item key={color}>
              <Checkbox>{color}</Checkbox>
            </Item>
          );
        })}
        <Item>
          <Popover
            content={<span>Hello</span>}
            title="Colors"
            trigger="click"
            placement="right"
            visible={allMenu.color}
          >
            <Button
              type="link"
              block
              onClick={() => setAllMenu({ ...allMenu, color: !allMenu.color })}
            >
              See more
            </Button>
          </Popover>
        </Item>
      </SubMenu>
    </Menu>
  );
};

const styles = useStyles({
  menu: {
    padding: 5,
    border: "none"
  }
});

export default withStyles(styles)(withStore(Store)(FilterItems));
