import React, { useState } from 'react';
import { Menu, Button, Layout, Icon } from 'antd';
import withStyles, { useStyles } from '../utils/withStyles';
const { Item, SubMenu, Divider } = Menu;
const { Sider } = Layout;

const Sidebar = ({ classes: { menu, sider } }) => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => setCollapsed(!collapsed);
  return (
    <Sider
      className={sider}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu className={menu}>
        <div>
          <Icon type="left" rotate={collapsed ? 180 : 0} />
        </div>
        <Divider />
      </Menu>
    </Sider>
  );
};

const styles = useStyles({
  menu: {
    padding: 5,
    border: 'none'
  },
  sider: {
    background: '#fff'
  }
});

export default withStyles(styles)(Sidebar);
