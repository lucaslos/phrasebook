import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { colorSecondary, fontDecorative } from '@src/style/theme';
import { letterSpacing } from '@src/style/helpers';
import { centerContent } from '@src/style/modifiers';

type Props = {
  name: string;
};

const Container = styled.header`
  text-align: center;
  margin-bottom: 12px;
  margin-top: 24px;
  font-family: ${fontDecorative};
  overflow: hidden;

  h1 {
    font-size: 14px;
    font-weight: 400;
    color: ${colorSecondary};
    ${letterSpacing(50)};
    text-transform: uppercase;
  }
`;

const SectionHeader: FunctionComponent<Props> = ({ name, children }) => (
  <Container>
    <h1>{name}</h1>
    {children}
  </Container>
);

export default SectionHeader;
