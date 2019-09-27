import React from 'react';
import { PageHeader, Typography, Button, Badge, Icon } from 'antd';
import withStyles, { useStyles } from '../utils/withStyles';
import { observer } from 'mobx-react';
import Store from '../utils/cart.store';
const { Title } = Typography;

const Appbar = ({ classes: { appbar, title, badge } }) => {
  const store = new Store();
  return (
    <PageHeader
      className={appbar}
      title={
        <Title className={title} level={3}>
          Showcase
        </Title>
      }
      extra={[
        <div key="shopping-cart-button">
          <Button type="default" size="large">
            <Icon type="shopping-cart" />
            <Badge className={badge} count={store.count} />
          </Button>
        </div>
      ]}
    />
  );
};

const styles = useStyles({
  appbar: {
    background: '#03A9F4'
  },
  badge: {
    verticalAlign: ['text-bottom', '!important']
  },
  title: {
    color: ['#fff', '!important']
  }
});

export default withStyles(styles)(observer(Appbar));
