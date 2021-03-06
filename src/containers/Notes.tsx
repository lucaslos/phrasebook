import styled from '@emotion/styled';
import SectionHeader from '@src/components/SectionHeader';
import ReactTags from '@src/lib/react-tags/ReactTags';
import React from 'react';
import { centerContent } from '@src/style/modifiers';
import { colorBgSecondary, colorPrimary, colorRed, colorSecondary } from '@src/style/theme';

type Props = {
  tags: string[];
  suggestions?: string[];
  defaultValue?: string;
  setTags: (tags: string[]) => void;
};

const Container = styled.div`
  margin-top: 12px;
  width: 100%;
  min-height: 0;
  font-size: 14px;

  .react-tags {
    position: relative;
    width: 100%;
  }

  .react-tags.is-focused {
    border-color: #b1b1b1;
  }

  .react-tags__selected {
    width: 100%;
  }

  .react-tags__selected-tag {
    ${centerContent};
    cursor: auto;
    user-select: text;
  }

  .react-tags__selected-tag,
  .react-tags__search input {
    width: 100%;
    padding: 8px 28px 8px 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    border: 0;
    text-align: center;
    outline: 0;
    color: #fff;

    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    background: ${colorBgSecondary};
  }

  .react-tags__delete-button {
    position: absolute;
    right: 12px;
    color: #fff;
    margin-left: 8px;

    &:hover {
      color: ${colorRed};
    }
  }

  .react-tags__search input {
    border: 1.5px solid ${colorPrimary};
    background: transparent;
    box-shadow: none;
    padding-right: 12px;
    /* font-size: 12px; */

    &:focus {
      border-color: ${colorSecondary};
    }
  }

  .react-tags__search,
  .react-tags__search-wrapper {
    width: 100%;
  }
`;

const Notes = ({ tags, suggestions = [], setTags, defaultValue }: Props) => {
  function onDelete(i: number) {
    setTags(tags.filter((tag, index) => index !== i));
  }

  function onAddition(tag: { name: string }) {
    setTags([...tags, tag.name]);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();

    if (e.dataTransfer.types.includes('text/plain')) {
      onAddition({ name: e.dataTransfer.getData('Text') });
    }
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy';
  }

  return (
    <Container onDragOver={onDragOver} onDrop={onDrop}>
      <SectionHeader name="Notes" />
      <ReactTags
        tags={tags.map((tag, id) => ({ id, name: tag }))}
        suggestions={suggestions.map((suggestion, id) => ({
          id,
          name: suggestion,
        }))}
        onDelete={onDelete}
        defaultValue={defaultValue}
        placeholderText="Add note"
        onAddition={onAddition}
        autoresize={false}
        allowNew
      />
    </Container>
  );
};

export default Notes;
