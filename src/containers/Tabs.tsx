import React from 'react';
import styled from '@emotion/styled';
import { centerContent } from 'style/modifiers';
import { colorGradient, fontDecorative, colorSecondary, colorPrimary, colorBg } from 'style/theme';
import appState from 'state/appState';
import rgba from 'utils/rgba';

const ContainerWrapper = styled.div`
  ${centerContent};
  position: absolute;
  width: 100%;
  height: 48px;
  top: 0;
  background: ${colorBg};
`;

const Container = styled.nav`
  ${centerContent};
  position: absolute;
  bottom: 0;
  height: 42px;
  width: 100%;
  max-width: 500px;

  border-bottom: 1px solid ${rgba(colorSecondary, 0.3)};
`;

const Tab = styled.button<{ disabled: boolean }>`
  ${centerContent};
  width: 50%;
  height: 100%;
  padding: 8px 0;
  text-align: center;
  /* font-family: ${fontDecorative}; */
  letter-spacing: 0.04em;
  transition: 160ms;
  color: ${colorSecondary};
  /* opacity: ${p => (p.disabled ? 1 : 0.8)}; */
  pointer-events: ${p => (p.disabled ? 'none' : 'auto')};

  span {
    /* background: ${colorGradient()};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent; */
  }
`;

const ActiveTab = styled.div`
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 50%;
  height: 2.5px;
  border-radius: 10px;
  pointer-events: none;
  transition: 240ms ease-out;

  background: ${colorGradient()};
`;

const Tabs = () => {
  const [activeTab, setActiveTab] = appState.useStore('activeTab');

  return (
    <ContainerWrapper>
      <Container>
        <Tab disabled={activeTab === 'add'} onClick={() => setActiveTab('add')}><span>Add Card</span></Tab>
        <Tab disabled={activeTab === 'list'} onClick={() => setActiveTab('list')}><span>List</span></Tab>
        <ActiveTab style={{ transform: `translate3d(${activeTab === 'add' ? '0' : '100%'}, 0, 0)` }} />
      </Container>
    </ContainerWrapper>
  );
};

export default Tabs;
