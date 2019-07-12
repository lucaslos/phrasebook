import css from '@emotion/css';
import Button from 'components/Button';
import Modal from 'containers/Modal';
import React, { useState } from 'react';
import { centerContentCollum } from 'style/modifiers';
import { useShortCut } from 'utils/hooks/useHotKey';
import {
  importCards,
  undoDelete,
  undoLastExport,
  undoLastImport,
} from 'state/cardsState';

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
