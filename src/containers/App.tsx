import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { mqMobile } from 'style/mediaQueries';

export const appContainerStyle = css`
  position: relative;
  width: 100%;
  min-height: 100%;
`;

const App = () => (
  <>
    Hello word!
  </>
);

export default App;
