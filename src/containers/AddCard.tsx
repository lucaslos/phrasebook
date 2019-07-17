import styled from '@emotion/styled';
import CardEditor from 'components/CardEditor';
import React, { useState } from 'react';
import { addCard, CardOptionalId } from 'state/cardsState';
import { centerContent } from 'style/modifiers';

const ContainerWrapper = styled.section`
  ${centerContent};
  align-items: flex-start;

  position: absolute;
  padding: 0 8px;
  padding-top: 90px;
  width: 50%;
  left: 0;
  height: 100%;
  overflow-y: auto;
`;

const url = new URL(window.location.href);

const AddCardContainer = () => {
  const [editorKey, setEditorKey] = useState(0);
  const sentence = url.searchParams.get('sentence');
  const initialCardProps = {
    front: url.searchParams.get('front') || '',
    back: url.searchParams.get('back') || '',
    notes: sentence ? [sentence] : [],
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function saveCard({ id, ...card }: CardOptionalId) {
    addCard([card]);
    setEditorKey(editorKey + 1);
  }

  return (
    <ContainerWrapper>
      <CardEditor
        key={editorKey}
        initialCardProps={editorKey === 0 ? initialCardProps : undefined}
        // noteInputDefaultValue={sentence || ''}
        onSave={saveCard}
        saveButtonLabel="Add Card"
      />
    </ContainerWrapper>
  );
};

export default AddCardContainer;
