import React from "react";
import { observer } from "mobx-react";

const withStore = store => Component => props => {
  const ObservableComponent = observer(Component);
  return <ObservableComponent store={store} {...props} />;
};

export default withStore;
