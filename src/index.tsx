import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppState } from './App';
import { mergeStyles } from '@fluentui/react';

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
});

const appState = new AppState();

ReactDOM.render(<App appState={appState} />, document.getElementById('app'));
