import React from 'react';
import {Component} from 'react';
import { Stack, Text, Link, FontWeights } from '@fluentui/react';
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'

import logo from './fabric.png';

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

export class AppState {
  @observable
  toggled: boolean = false;
}

@observer
export class App extends Component<{appState: AppState}> {
  render() {
    const {appState} = this.props;
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={{
          root: {
            width: '960px',
            margin: '0 auto',
            textAlign: 'center',
            color: '#605e5c'
          }
        }}
        gap={15}
      >
        <img src={logo} alt="logo" />
        <Text variant="xxLarge" styles={boldStyle}>
          Welcome to Your UI Fabric App { `${ appState.toggled }` }
        </Text>
        <Text variant="large" onClick={() => {appState.toggled = !appState.toggled}}>For a guide on how to customize this project, check out the UI Fabric documentation.</Text>
        <Text variant="large" styles={boldStyle}>
          Essential Links
        </Text>
        <Stack horizontal gap={15} horizontalAlign="center">
          <Link href="https://developer.microsoft.com/en-us/fabric">Docs</Link>
          <Link href="https://stackoverflow.com/questions/tagged/office-ui-fabric">Stack Overflow</Link>
          <Link href="https://github.com/officeDev/@fluentui/react/">Github</Link>
          <Link href="https://twitter.com/officeuifabric">Twitter</Link>
        </Stack>
        <Text variant="large" styles={boldStyle}>
          Design System
        </Text>
        <Stack horizontal gap={15} horizontalAlign="center">
          <Link href="https://developer.microsoft.com/en-us/fabric#/styles/icons">Icons</Link>
          <Link href="https://developer.microsoft.com/en-us/fabric#/styles/typography">Typography</Link>
          <Link href="https://developer.microsoft.com/en-us/fabric#/styles/themegenerator">Theme</Link>
        </Stack>
      </Stack>
    );
  }
};
