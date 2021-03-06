import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@src/components/Button';
import { ellipsis } from 'polished';
import React, { useRef, useState } from 'react';
import { Card as CardProps, deleteCard, updateCard } from '@src/state/cardsState';
import { hide, show } from '@src/style/modifiers';
import { colorBgSecondary, colorPrimary, colorSecondary } from '@src/style/theme';
import useOnClickOutside from '@src/utils/hooks/useOnClickOutside';
import rgba from '@src/utils/rgba';

type Props = {
  card: CardProps;
  onClickEdit: (id: number) => void;
};

const Container = styled.div`
  border-radius: 8px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  padding: 8px;
  max-width: 100%;
  padding-right: 32px;
  cursor: pointer;
  transition: 240ms;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  background: ${colorBgSecondary};

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
  font-weight: 400;
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
  const [highlight, setHighlight] = useState(false);

  function toggleIsArchieved(e: React.MouseEvent) {
    e.stopPropagation();
    updateCard([
      {
        ...card,
        isArchieved: !card.isArchieved,
      },
    ]);
    setShowMenu(false);
  }

  function onDelete(e: React.MouseEvent) {
    e.stopPropagation();
    deleteCard([card.id]);
    setShowMenu(false);
  }

  function toggleHighlight(e: React.MouseEvent) {
    e.stopPropagation();
    setHighlight(!highlight);
    setShowMenu(false);
  }

  function onEdit(e: React.MouseEvent) {
    e.stopPropagation();
    onClickEdit(card.id);
    setShowMenu(false);
  }

  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  return (
    <Container
      style={{
        zIndex: showMenu ? 1000 : undefined,
        color: highlight ? colorPrimary : undefined,
        fontWeight: highlight ? 600 : undefined,
      }}
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
      <CardMenu css={showMenu && showMenuStyle} ref={menuRef}>
        <MenuOption onClick={toggleIsArchieved}>
          <span>{!card.isArchieved ? 'Archieve' : 'Send to export'}</span>
        </MenuOption>
        <MenuOption onClick={onEdit}>
          <span>Edit</span>
        </MenuOption>
        <MenuOption onClick={toggleHighlight}>
          <span>{highlight ? 'Undo hightlight' : 'Highlight'}</span>
        </MenuOption>
        <MenuOption onClick={onDelete}>
          <span>Delete</span>
        </MenuOption>
      </CardMenu>
    </Container>
  );
};

export default Card;
