import React, { Component } from 'react';

class MyComponent extends Component {
  static defaultProps = {
    name: '기본이름',
  };

  render() {
    return (
      <div>
        안녕하세요!! 저는 {this.props.name}입니다. childeren 값은{' '}
        {this.props.children}
      </div>
    );
  }
}

export default MyComponent;
