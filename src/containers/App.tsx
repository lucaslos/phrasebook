import { css } from '@emotion/core';
import React, { useEffect } from 'react';
import AddCard from 'containers/AddCard';
import styled from '@emotion/styled';
import {
  centerContent,
  fillContainer,
} from 'style/modifiers';
import { colorBg } from 'style/theme';
import Tabs from 'containers/Tabs';
import List from 'containers/List';
import appState from 'state/appState';
import { loadCardsToState } from 'state/cardsState';
import DevMenu from 'containers/DevMenu';

export const appContainerStyle = css`
  ${fillContainer};
  ${centerContent};
  overflow: hidden;

  background: ${colorBg};
`;

const SectionsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200%;
  transition: 240ms ease-out;

  display: flex;
  align-items: flex-start;
`;

const App = () => {
  const [activeTab] = appState.useStore('activeTab');

  useEffect(() => {
    loadCardsToState();
  }, []);

  return (
    <>
      <SectionsContainer
        style={{
          transform: `translate3d(${activeTab === 'add' ? 0 : -50}%,0,0)`,
        }}
      >
        <AddCard />
        <List />
      </SectionsContainer>
      <Tabs />
      <DevMenu />
    </>
  );
};

export default App;
