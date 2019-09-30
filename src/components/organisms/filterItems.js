import React, { useEffect, useState } from 'react';
import { Menu, Icon, Checkbox, Popover, Button, Select } from 'antd';
import withStore from '../utils/withStore';
import Store from '../utils/filter.store';
import withStyles, { useStyles } from '../utils/withStyles';
import {
  getAllColors,
  getAllTags,
  getSortParams
} from '../../services/services';
import MetaContent from '../molecules/meta.content';
import NumericInput from '../molecules/numericInput';

const { Divider, SubMenu, Item } = Menu;
const { Option } = Select;

const FilterItems = ({
  store: {
    filter,
    filter: { price, sortBy },
    onFilterChange
  },
  classes: { menu, noPaddingItems, sortStyle }
}) => {
  const [filterData, setFilterData] = useState({
    colors: [],
    tags: [],
    sortParams: []
  });
  const { colors, tags, sortParams } = filterData;
  useEffect(() => {
    let isSubscribed = true;
    const effect = async () => {
      const colors = await getAllColors();
      const tags = await getAllTags();
      const sortParams = await getSortParams();
      if (isSubscribed) {
        setFilterData({
          colors,
          tags,
          sortParams
        });
      }
    };
    effect();
    return () => (isSubscribed = false);
  }, []);

  const onMetaItemClick = ({
    target: {
      name,
      value: [item, checked]
    }
  }) => {
    let array = filter[name];
    if (checked) {
      array.push(item);
    } else {
      array = array.filter(x => x !== item);
    }
    onFilterChange({
      target: {
        name,
        value: array
      }
    });
  };

  const onPriceRangeChange = ({ target: { name, value } }) => {
    const price = { ...filter.price };
    price[name] = value;
    onFilterChange({
      target: {
        name: 'price',
        value: price
      }
    });
  };

  const onSortParamChange = param => {
    onFilterChange({
      target: {
        name: 'sortBy',
        value: param
      }
    });
  };

  const isMetaItemSelected = (name, item) => {
    const array = filter[name];
    return array.indexOf(item) > -1;
  };

  return (
    <Menu
      className={menu}
      mode="inline"
      selectable={false}
      defaultOpenKeys={['sortParamMenu']}
    >
      <SubMenu
        key="sortParamMenu"
        title={
          <span>
            <Icon type="sort-ascending" />
            <span>Sort by</span>
          </span>
        }
      >
        <Item className={noPaddingItems}>
          <Select
            className={sortStyle}
            value={sortBy}
            onChange={onSortParamChange}
            suffixIcon={<Icon type="caret-down" />}
          >
            {sortParams.map(({ value, label }) => {
              return (
                <Option key={value} value={value}>
                  {label}
                </Option>
              );
            })}
          </Select>
        </Item>
      </SubMenu>
      <Divider />
      <SubMenu
        title={
          <span>
            <Icon type="dollar" />
            <span>Price Range</span>
          </span>
        }
      >
        <Item className={noPaddingItems}>
          <NumericInput
            placeholder="Min amount"
            addonBefore="Min ₹"
            name="min"
            value={price.min}
            onChange={onPriceRangeChange}
          />
        </Item>
        <Item className={noPaddingItems}>
          <NumericInput
            placeholder="Max amount"
            addonBefore="Max ₹"
            name="max"
            value={price.max}
            onChange={onPriceRangeChange}
          />
        </Item>
      </SubMenu>
      <Divider />
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
              <Checkbox
                checked={isMetaItemSelected('colors', color)}
                onChange={({ target: { checked } }) => {
                  onMetaItemClick({
                    target: { name: 'colors', value: [color, checked] }
                  });
                }}
              >
                {color}
              </Checkbox>
            </Item>
          );
        })}
        <Item>
          <Popover
            content={
              <MetaContent
                array={colors}
                name="colors"
                onSelect={onMetaItemClick}
                isSelected={isMetaItemSelected}
              />
            }
            title="Colors"
            trigger="click"
            placement="right"
          >
            <Button type="link" block>
              See more <Icon type="right" />
            </Button>
          </Popover>
        </Item>
      </SubMenu>
      <Divider />
      <SubMenu
        title={
          <span>
            <Icon type="tags" />
            <span>Tags</span>
          </span>
        }
      >
        {tags.slice(0, 5).map(tag => {
          return (
            <Item key={tag}>
              <Checkbox
                checked={isMetaItemSelected('tags', tag)}
                onChange={({ target: { checked } }) => {
                  onMetaItemClick({
                    target: { name: 'tags', value: [tag, checked] }
                  });
                }}
              >
                {tag}
              </Checkbox>
            </Item>
          );
        })}
        <Item>
          <Popover
            content={
              <MetaContent
                array={tags}
                name="tags"
                onSelect={onMetaItemClick}
                isSelected={isMetaItemSelected}
              />
            }
            title="Tags"
            trigger="click"
            placement="right"
          >
            <Button type="link" block>
              See more <Icon type="right" />
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
    border: 'none'
  },
  noPaddingItems: {
    paddingLeft: '16px !important'
  },
  sortStyle: {
    width: '100%'
  }
});

export default withStyles(styles)(withStore(Store)(FilterItems));
