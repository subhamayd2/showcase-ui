import React, { Component } from 'react';
import { Input } from 'antd';

class NumericInput extends Component {
  onChange = e => {
    const { name, value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange({ target: { name, value } });
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      onChange(value.slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const { onChange, ...rest } = this.props;
    return <Input {...rest} onChange={this.onChange} onBlur={this.onBlur} />;
  }
}

NumericInput.defaultProps = {
  name: '',
  onChange: () => {}
};

export default NumericInput;
