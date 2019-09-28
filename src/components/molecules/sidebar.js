import React, { useState } from "react";
import { Layout, Icon } from "antd";
import withStyles, { useStyles } from "../utils/withStyles";
import FilterItems from "../organisms/filterItems";
const { Sider } = Layout;

const Sidebar = ({ classes: { sider } }) => {
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
      <FilterItems />
    </Sider>
  );
};

const styles = useStyles({
  sider: {
    background: "#fff"
  }
});

export default withStyles(styles)(Sidebar);
