import * as React from 'react';

import App from '@src/containers/App';
import GlobalStyle from '@src/style/GlobalStyle';

const Root = () => (
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

export default Root;
