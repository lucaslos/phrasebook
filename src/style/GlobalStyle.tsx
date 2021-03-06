import { css, Global } from '@emotion/react';
import hotkey from 'hotkeys-js';
import React, { useEffect } from 'react';
import { fillContainer } from '@src/style/modifiers';
import normalize from '@src/style/normalize';
import { fontPrimary } from '@src/style/theme';
import useGetSet from '@src/utils/hooks/useGetSet';
import { appContainerStyle } from '@src/containers/App';
import scrollBar from '@src/style/scrollBar';

const debugLayoutStyle = css`
  *:not(g):not(path) {
    color: hsla(210, 100%, 100%, 0.9) !important;
    background: hsla(210, 100%, 50%, 0.5) !important;
    outline: solid 3px hsla(210, 100%, 100%, 0.5) !important;

    box-shadow: none !important;
    filter: none !important;
  }
`;

const reset = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    height: 100%;
    width: 100%;
    font-family: ${fontPrimary};
  }

  #app {
    ${appContainerStyle};

    * {
      transform: translate3d(0, 0, 0);
    }
  }

  a {
    color: inherit;
    text-decoration: inherit;

    &:visited {
      color: inherit;
    }
  }

  button {
    background: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
  }
`;

const GlobalStyle = () => {
  const [getDebugLayout, setDebugLayout] = useGetSet(false);

  useEffect(() => {
    // OPTIMIZE: refactor this
    if (import.meta.env.DEV) {
      hotkey('shift+d', () => {
        setDebugLayout(!getDebugLayout());
      });
    }
  }, []);

  return (
    <Global
      styles={[
        normalize,
        scrollBar,
        getDebugLayout() && debugLayoutStyle,
        reset,
      ]}
    />
  );
};

export default GlobalStyle;
