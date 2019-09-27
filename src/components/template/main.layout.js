import React, { Component } from 'react';
import { Layout } from 'antd';
import Appbar from '../molecules/appbar';
import { createUseStyles } from 'react-jss';
import withStyles from '../utils/withStyles';
const { Header, Content, Sider, Footer } = Layout;

class MainLayout extends Component {
  render() {
    const {
      classes: { layout }
    } = this.props;
    return (
      <Layout className={layout}>
        <Header>
          <Appbar />
        </Header>
        <Layout>
          <Sider>Side</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

const styles = createUseStyles({
  layout: {
    minHeight: '100vh'
  }
});

export default withStyles(styles)(MainLayout);
