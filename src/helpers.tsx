import {Component} from 'react';
import React from 'react';

export function genArray<T>(generator: () => Generator<T>): Array<T> {
    return Array.from(generator());
}

export class CommandBarItemWrapper extends Component {
  render() {
    return <div style={{ display: 'flex', alignItems: 'center' }}>
      {this.props.children}
    </div>
  }
}
