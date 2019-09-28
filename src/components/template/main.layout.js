import React, { Component } from "react";
import { Layout } from "antd";
import Appbar from "../molecules/appbar";
import withStyles, { useStyles } from "../utils/withStyles";
import Sidebar from "../molecules/sidebar";
import MainContent from "../organisms/main.content";
const { Content, Footer } = Layout;

class MainLayout extends Component {
  render() {
    const {
      classes: { layout, footer }
    } = this.props;
    return (
      <Layout className={layout}>
        <Appbar />
        <Layout>
          <Sidebar />
          <Content>
            <MainContent />
          </Content>
        </Layout>
        <Footer className={footer}>Footer</Footer>
      </Layout>
    );
  }
}

const styles = useStyles({
  layout: {
    minHeight: "100vh"
  },
  header: {
    background: "#03A9F4"
  },
  footer: {
    borderTop: "10px solid #03A9F4"
  }
});

export default withStyles(styles)(MainLayout);
