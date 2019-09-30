import { decorate, observable } from 'mobx';

class FilterStore {
  filter = {
    tags: [],
    price: { min: '', max: '' },
    colors: [],
    sortBy: 'date'
  };

  onFilterChange = ({ target: { name, value } }) => {
    this.filter[name] = value;
  };
}

decorate(FilterStore, {
  filter: observable
});

export default new FilterStore();
