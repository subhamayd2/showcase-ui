// import * as axios from 'axios';
import { isEmpty } from 'lodash';
import { getDummyItems, dummyTags } from './dummy.data';

const items = getDummyItems(100);
const pageSize = 20;

export const getItems = (page, filter = {}) => {
  if (isEmpty(filter)) {
    filter.sortBy = 'date';
    filter.tags = [];
    filter.colors = [];
    filter.price = { min: '', max: '' };
  }
  const end = pageSize * page;
  const start = end - pageSize;
  return new Promise(resolve =>
    resolve({ items: items.slice(start, end), total: items.length })
  );
};

export const getSortParams = () => {
  return new Promise(resolve =>
    resolve([
      { value: 'price-low-high', label: 'Price: Low to High' },
      { value: 'price-high-low', label: 'Price: High to Low' },
      { value: 'date', label: 'Newest first' }
    ])
  );
};

export const getAllColors = () => {
  return new Promise(resolve =>
    resolve([
      'black',
      'white',
      'red',
      'blue',
      'green',
      'purple',
      'blue green',
      'brown',
      'reddish',
      'orange',
      'pink'
    ])
  );
};

export const getAllTags = () => {
  return new Promise(resolve => resolve(dummyTags));
};
