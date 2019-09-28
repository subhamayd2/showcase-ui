import { decorate, observable } from "mobx";

class FilterStore {
  filter = {
    tags: [],
    price: "",
    colors: [],
    sortBy: ""
  };

  onFilterChange = ({ target: { name, value } }) => {
    this.filter[name] = value;
  };
}

decorate(FilterStore, {
  filter: observable
});

export default new FilterStore();
