import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from '@src/Root';
import '@src/state';
import { version, name } from '../package.json';

if (import.meta.env.PROD) {
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

ReactDOM.render(<Root />, document.getElementById('app'));
