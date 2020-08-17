import React from 'react';
import ReactDOM from 'react-dom';
import { AppMarkup, App } from './App';
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

const appState = new App();

ReactDOM.render(<AppMarkup app={appState} />, document.getElementById('app'));
