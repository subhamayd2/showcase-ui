import React, { useEffect, useState } from 'react';
import {
  Input,
  Divider,
  Card,
  Carousel,
  Typography,
  Icon,
  Affix,
  Pagination
} from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { getItems } from '../../services/services';
import withStyles, { useStyles } from '../utils/withStyles';
import Image from '../atoms/image';
import Margin from '../atoms/margin';
import withStore from '../utils/withStore';
import Store from '../utils/cart.store';
import FilterStore from '../utils/filter.store';

const { Search } = Input;
const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;

const MainContent = ({
  // store: { addItem },
  classes: { wrapper, itemsRow, carousel, itemGutter, price: priceClass }
}) => {
  const [state, setState] = useState({
    items: [],
    total: 0,
    page: 1
  });
  const { items, total, page } = state;

  const { filter } = FilterStore;

  useEffect(() => {
    let isSubscribed = true;
    const effect = async () => {
      const { items, total } = await getItems(page, filter);
      if (isSubscribed) {
        setState({ ...state, items, total });
      }
    };
    effect();
    return () => (isSubscribed = false);
  }, [filter]);

  const onPageChange = newPage => {
    setState({ ...state, page: newPage });
    getItems(newPage).then(({ items, total }) =>
      setState({ ...state, items, total })
    );
  };

  const onSearch = value => {
    console.log(value);
  };

  // const addToCart = item => () => {
  //   addItem(item);
  // };

  return (
    <div className={wrapper}>
      <Row>
        <Col xs={12} md={8} lg={4} xsOffset={0} mdOffset={4} lgOffset={8}>
          <Affix offsetTop={10}>
            <Search
              placeholder="Search items"
              size="large"
              allowClear
              onSearch={onSearch}
            />
          </Affix>
        </Col>
      </Row>
      <Row>
        <Col>
          <Divider />
        </Col>
      </Row>
      <Row gutter={16} className={itemsRow}>
        {items.map(item => {
          const {
            _id,
            name,
            photos,
            currency,
            price,
            description,
            views
          } = item;
          return (
            <Col key={_id} xs={12} md={4} lg={3} className={itemGutter}>
              <Card
                cover={
                  <Carousel className={carousel} autoplay>
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
                        <Title className={priceClass} level={3}>
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
                {/* <Margin top={16}>
                    <Button block type="primary" onClick={addToCart(item)}>
                      Add to cart
                    </Button>
                  </Margin> */}
                <Margin top={8} bottom={8}>
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
        })}
      </Row>
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col>
              <Pagination
                total={total}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                onChange={onPageChange}
                pageSize={20}
                current={page}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const styles = useStyles({
  wrapper: {
    padding: 10
  },
  itemsRow: {
    padding: 20
  },
  itemGutter: {
    padding: 16,
    borderBottom: '1px solid #d6d6d6'
  },
  carousel: {
    height: 200
  },
  price: {
    margin: '0 !important',
    color: ['#03A9F4', '!important']
  }
});

export default withStyles(styles)(withStore(Store)(MainContent));
