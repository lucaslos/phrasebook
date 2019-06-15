import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import App from 'containers/App';
import GlobalStyle from 'style/GlobalStyle';

const Root = () => (
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

export default hot(Root);
