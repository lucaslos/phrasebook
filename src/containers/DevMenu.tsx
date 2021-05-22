import { css } from '@emotion/react';
import Button from '@src/components/Button';
import Modal from '@src/containers/Modal';
import React, { useState } from 'react';
import { centerContentCollum } from '@src/style/modifiers';
import { useShortCut } from '@src/utils/hooks/useHotKey';
import {
  importCards,
  undoDelete,
  undoLastExport,
  undoLastImport,
} from '@src/state/cardsState';

const DevMenu = () => {
  const [show, setShow] = useState(false);

  useShortCut('ctrl+m', () => setShow(!show), [show]);

  return (
    <Modal
      title="Commands"
      show={show}
      onClose={() => setShow(false)}
      css={css`
        ${centerContentCollum};
        justify-content: flex-start;

        > * {
          margin-bottom: 8px;
        }
      `}
    >
      <Button label="Import from clipboard" onClick={() => importCards()} />
      <Button
        label="Import from clipboard as To Export"
        onClick={() => importCards(true)}
      />
      <Button label="Undo delete" onClick={undoDelete} />
      <Button label="Undo last export" onClick={undoLastExport} />
      <Button label="Undo last import" onClick={undoLastImport} />
    </Modal>
  );
};

export default DevMenu;
