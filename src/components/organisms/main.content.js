import React, { Component } from 'react';
import { Input, Divider, Card, Carousel, Typography, Icon } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { getItems } from '../../services/services';
import withStyles, { useStyles } from '../utils/withStyles';
import { isEmpty } from 'lodash';
import Image from '../atoms/image';
import Margin from '../atoms/margin';

const { Search } = Input;
const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;

class MainContent extends Component {
  state = {
    items: [],
    filteredItems: []
  };

  componentDidMount() {
    getItems().then(items => this.setState({ items }));
  }

  onSearch = value => {
    const { items } = this.state;
    const filteredItems = items.filter(
      ({ name }) => name.toLowerCase() === value.trim().toLowerCase()
    );
    this.setState({ filteredItems });
  };

  render() {
    const { items, filteredItems } = this.state;
    const {
      classes: { wrapper, itemsRow, carousel, itemGutter }
    } = this.props;

    const showItems = !isEmpty(filteredItems)
      ? filteredItems
      : !isEmpty(items)
      ? items
      : [];

    return (
      <div className={wrapper}>
        <Row>
          <Col xs={12} md={8} lg={4} xsOffset={0} mdOffset={4} lgOffset={8}>
            <Search placeholder="Search items" size="large" allowClear />
          </Col>
        </Row>
        <Row>
          <Col>
            <Divider />
          </Col>
        </Row>
        <Row gutter={16} className={itemsRow}>
          {showItems.map(
            ({ _id, name, photos, currency, price, description, views }) => {
              return (
                <Col key={_id} xs={12} md={6} lg={3} className={itemGutter}>
                  <Card
                    cover={
                      <Carousel className={carousel}>
                        {photos.map((pic, i) => (
                          <Image key={pic} src={pic} />
                        ))}
                      </Carousel>
                    }
                  >
                    <Meta
                      title={name}
                      description={
                        <Row type="flex" middle="xs">
                          <Col xs={2}>
                            <Text code>{currency}</Text>
                          </Col>
                          <Col xs>
                            <Title className="clear-margin" level={3}>
                              {price}
                            </Title>
                          </Col>
                        </Row>
                      }
                    />
                    <Margin top={16}>
                      <Text strong>Description</Text>
                      <Paragraph>
                        <p dangerouslySetInnerHTML={{ __html: description }} />
                      </Paragraph>
                    </Margin>
                    <Margin top={8}>
                      <Text code>
                        <Margin right={6}>
                          <Icon type="eye" />
                        </Margin>
                        {views}
                      </Text>
                    </Margin>
                  </Card>
                </Col>
              );
            }
          )}
        </Row>
      </div>
    );
  }
}

const styles = useStyles({
  wrapper: {
    padding: 10
  },
  itemsRow: {
    padding: 20
  },
  itemGutter: {
    padding: 16
  },
  carousel: {
    height: 200
  }
});

export default withStyles(styles)(MainContent);
