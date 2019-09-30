import React from 'react';
import { PageHeader, Typography, Button, Badge, Icon } from 'antd';
import withStyles, { useStyles } from '../utils/withStyles';
import withStore from '../utils/withStore';
import Store from '../utils/cart.store';
const { Title } = Typography;

const Appbar = ({ classes: { appbar, title, badge }, store }) => {
  return (
    <PageHeader
      className={appbar}
      title={
        <Title className={title} level={3}>
          {process.env.REACT_APP_NAME}
        </Title>
      }
      extra={
        [
          // <div key="shopping-cart-button">
          //   <Button type="default" size="large">
          //     <Icon type="shopping-cart" />
          //     <Badge className={badge} count={store.count} />
          //   </Button>
          // </div>
        ]
      }
    />
  );
};

const styles = useStyles({
  appbar: {
    background: '#fff',
    borderBottom: '10px solid #03A9F4'
  },
  badge: {
    verticalAlign: ['text-bottom', '!important']
  },
  title: {
    color: ['#03A9F4', '!important']
  }
});

export default withStyles(styles)(withStore(Store)(Appbar));
