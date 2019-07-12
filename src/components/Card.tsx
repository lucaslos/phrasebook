import css from '@emotion/css';
import styled from '@emotion/styled';
import Button from 'components/Button';
import { ellipsis } from 'polished';
import React, { useState } from 'react';
import { Card as CardProps, deleteCard, updateCard } from 'state/cardsState';
import { hide, show } from 'style/modifiers';
import { colorPrimary, colorSecondary } from 'style/theme';
import rgba from 'utils/rgba';

type Props = {
  card: CardProps;
  onClickEdit: (id: number) => void;
};

const Container = styled.div`
  border-radius: 8px;
  text-align: center;
  font-size: 12px;
  color: ${colorSecondary};
  padding: 8px;
  max-width: 100%;
  padding-right: 32px;
  cursor: pointer;
  transition: 240ms;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  background: #fff;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Faces = styled.div`
  width: 100%;
  ${ellipsis()};
`;

const menuButtonStyle = css`
  position: absolute;
  height: 100%;
  width: 32px;
  padding: 0;
  margin: 0;
  right: 0;
  top: 0;

  &::before {
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    opacity: 0;
    width: 16px;
    height: 28px;
  }

  &:hover::before {
    opacity: 0.08;
  }
`;

const CardMenu = styled.div`
  ${hide};
  position: absolute;
  top: calc(100% - 12px);
  right: -8px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px 0;
  height: 0;
  overflow: hidden;
  cursor: auto;
`;

const MenuOption = styled.div`
  text-align: left;
  padding: 8px 16px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: 160ms;

  &:hover {
    background: ${rgba(colorPrimary, 0.05)};
  }
`;

const showMenuStyle = css`
  ${show};
  height: auto;
`;

const Card = ({ card, onClickEdit }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  function toggleIsArchieved(e: React.MouseEvent) {
    e.stopPropagation();
    updateCard([{
      ...card,
      isArchieved: !card.isArchieved,
    }]);
    setShowMenu(false);
  }

  function onDelete(e: React.MouseEvent) {
    e.stopPropagation();
    deleteCard([card.id]);
    setShowMenu(false);
  }

  function onEdit(e: React.MouseEvent) {
    e.stopPropagation();
    onClickEdit(card.id);
    setShowMenu(false);
  }

  return (
    <Container
      style={{ zIndex: showMenu ? 1000 - card.id : undefined }}
      onClick={onEdit}
    >
      <Faces
        css={css`
          margin-bottom: 4px;
          padding-bottom: 4px;
          border-bottom: 1px solid ${rgba(colorSecondary, 0.2)};
        `}
      >
        {card.front}
      </Faces>
      <Faces>{card.back}</Faces>
      <Button
        icon="moreVert"
        iconSize={20}
        css={menuButtonStyle}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
      />
      <CardMenu css={showMenu && showMenuStyle}>
        <MenuOption onClick={toggleIsArchieved}>
          <span>{!card.isArchieved ? 'Archieve' : 'Send to export'}</span>
        </MenuOption>
        <MenuOption onClick={onEdit}>
          <span>Edit</span>
        </MenuOption>
        <MenuOption onClick={onDelete}>
          <span>Delete</span>
        </MenuOption>
      </CardMenu>
    </Container>
  );
};

export default Card;
