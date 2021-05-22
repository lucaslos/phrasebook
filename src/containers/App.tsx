import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import AddCard from '@src/containers/AddCard';
import styled from '@emotion/styled';
import {
  centerContent,
  fillContainer,
} from '@src/style/modifiers';
import { colorBg } from '@src/style/theme';
import Tabs from '@src/containers/Tabs';
import List from '@src/containers/List';
import appState from '@src/state/appState';
import { loadCardsToState } from '@src/state/cardsState';
import DevMenu from '@src/containers/DevMenu';

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
