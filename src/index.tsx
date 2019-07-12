import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from 'Root';
import 'state';
import { version, name } from '../package.json';

if (__PROD__) {
  console.log(`${name} v${version}`);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

if (module.hot) {
  module.hot.accept('../package.json', () => {});
}

ReactDOM.render(<Root />, document.getElementById('app'));
