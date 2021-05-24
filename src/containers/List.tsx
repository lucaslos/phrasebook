import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@src/components/Button';
import Card from '@src/components/Card';
import CardEditor from '@src/components/CardEditor';
import TextField from '@src/components/TextField';
import Modal from '@src/containers/Modal';
import { isEqual } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import cardsState, { Card as CardType, exportCardsToSRS, updateCard } from '@src/state/cardsState';
import { centerContent } from '@src/style/modifiers';
import { colorPrimary, colorSecondary } from '@src/style/theme';
import useDebounce from '@src/utils/hooks/useDebounce';
import rgba from '@src/utils/rgba';

const ContainerWrapper = styled.section`
  ${centerContent};
  align-items: flex-start;

  position: absolute;
  padding: 0 8px;
  padding-top: 72px;
  padding-bottom: 120px;
  width: 50%;
  left: 50%;
  height: 100%;
  overflow-y: auto;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
`;

const CardsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px;
`;

const EmptyWarning = styled.div`
  width: 100%;
  text-align: center;
  color: #555;

  span {
    background: #fff;
    padding: 8px 16px;
    border-radius: 8px;
  }
`;

const Filter = styled.select`
  border-radius: 12px;
  border: 1.5px solid ${colorPrimary};
  background: transparent;
  outline: none;
  height: 36px;
  font-size: 14px;
  padding: 0 8px;
  color: ${colorSecondary};

  cursor: pointer;

  option {
    background-color: #fff;
  }
`;

const List = () => {
  const [cards] = cardsState.useStore('cards');
  const [maxItens, setMaxItens] = useState(30);
  const [filter, setFilter] = useState<'archieved' | 'toExport'>('toExport');
  const [editCardId, setEditCardId] = useState<number | undefined>();
  const [showSuccessExportMessage, setShowSuccessExportMessage] = useState(
    false,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const editCard = cards.find(card => card.id === editCardId);

  function saveCard(newProps: CardType) {
    updateCard([newProps]);
    setEditCardId(undefined);
  }

  function validBeforeSave(newProps: CardType) {
    return !isEqual(editCard, newProps);
  }

  function onFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value === 'toExport' ? 'toExport' : 'archieved');
  }

  function onExport() {
    if (!showSuccessExportMessage) {
      exportCardsToSRS().then(() => {
        setShowSuccessExportMessage(true);
        setTimeout(() => setShowSuccessExportMessage(false), 2000);
      });
    }
  }

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const queryRegex = new RegExp(debouncedSearchQuery, 'i');

  const filteredCards = useMemo(
    () =>
      cards.filter(card =>
        (filter === 'toExport'
          ? !card.isArchieved
          : card.isArchieved &&
            (debouncedSearchQuery
              ? `-f=${card.front}-b=${card.back}`.match(queryRegex)
              : true)),
      ),
    [cards, debouncedSearchQuery, filter],
  );

  return (
    <ContainerWrapper>
      <Container>
        <div
          css={css`
            margin-bottom: 24px;
            padding-bottom: 8px;
            width: 100%;

            border-bottom: 1px solid ${rgba(colorSecondary, 0.3)};
          `}
        >
          <TextField
            label="Search for a card..."
            handleChange={value => setSearchQuery(`${value}`)}
            value={searchQuery}
            // disableLabelAnimation
          />
        </div>
        <div
          css={css`
            margin-bottom: 32px;
            width: 100%;
            height: 36px;

            display: grid;
            grid-template-columns: auto 1fr auto;
            column-gap: 12px;
          `}
        >
          <div>
            <span
              css={css`
                color: ${colorSecondary};
                margin-right: 4px;
              `}
            >
              Filter:{' '}
            </span>
            <Filter onChange={onFilterChange}>
              <option value="toExport">To Export</option>
              <option value="archieved">Archieved</option>
            </Filter>
          </div>
          <Button
            label={
              showSuccessExportMessage ? 'Cards copied ✔' : 'Export to SRS'
            }
            onClick={onExport}
            css={css`
              margin: 0;
              grid-column: 3;
            `}
          />
        </div>

        {filteredCards.length === 0 && (
          <EmptyWarning>
            <span>No results</span>
          </EmptyWarning>
        )}
        <CardsWrapper>
          {filteredCards.slice(0, maxItens).map(card => (
            <Card
              card={card}
              key={card.id}
              onClickEdit={() => setEditCardId(card.id)}
            />
          ))}
        </CardsWrapper>
        {filteredCards.length > maxItens && (
          <div
            css={css`
              ${centerContent};
              width: 100%;
              margin-top: 16px;
            `}
          >
            <Button
              label="Show more 20"
              onClick={() => setMaxItens(maxItens + 20)}
            />
          </div>
        )}
      </Container>
      <Modal
        title="Edit Card"
        onClose={() => setEditCardId(undefined)}
        show={!!editCard}
        css={css`
          padding-bottom: 0;
        `}
      >
        <CardEditor
          key={editCardId}
          initialCardProps={editCard}
          onSave={saveCard}
          validBeforeSave={validBeforeSave}
          background="#111827"
          saveButtonLabel="Save Card"
        />
      </Modal>
    </ContainerWrapper>
  );
};

export default List;
