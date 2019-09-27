import { decorate, observable, computed } from 'mobx';

class Store {
  items = [];
  get count() {
    return this.items.length;
  }
  addItem = (item, quantity) => {
    const { quantity: q, ...restItem } = item;
    const newItem = { ...restItem, quantity };
    this.items.push(newItem);
  };
  removeItem = itemId => {
    this.items = this.items.filter(({ _id }) => _id !== itemId);
  };
}

decorate(Store, {
  items: observable,
  count: computed
});

export default Store;
