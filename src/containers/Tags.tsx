import React from 'react';
import styled from '@emotion/styled';
import ReactTags from '@src/lib/react-tags/ReactTags';
import {
  colorPrimary,
  colorSecondary,
  colorRed,
  fontDecorative,
  colorBg,
  colorGradient,
} from '@src/style/theme';
import { mqMobile } from '@src/style/mediaQueries';
import { circle } from '@src/style/helpers';
import { centerContent, centerContentCollum } from '@src/style/modifiers';
import rgba from '@src/utils/rgba';
import SectionHeader from '@src/components/SectionHeader';
import { sortByFrequencyAndRemoveDuplicates } from '@src/utils/sortByFrequencyAndRemoveDuplicates';
import cardsState from '@src/state/cardsState';

type Props = {
  tags: string[];
  suggestions?: string[];
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
    display: inline;
  }

  .react-tags__selected-tag {
    ${centerContent};
  }

  .react-tags__selected-tag,
  .react-tags__search input {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 12px;
    margin-right: 8px;
    margin-bottom: 8px;
    border: 0;
    color: #fff;
    outline: 0;
    box-sizing: content-box;

    background: ${colorPrimary};
  }

  .react-tags__delete-button {
    color: #fff;
    margin-left: 8px;

    &:hover {
      color: ${colorSecondary};
    }
  }

  .react-tags__search input {
    border: 1.5px solid ${colorPrimary};
    background: transparent;
    box-shadow: none;
    padding: 8px;
    color: #fff;

    &:focus {
      border-color: ${colorSecondary};
    }
  }

  .react-tags__search, .react-tags__search-wrapper {
    display: inline;
  }

  .react-tags__suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
  }

  @media screen and (min-width: 30em) {
    .react-tags__suggestions {
      width: 240px;
    }
  }

  .react-tags__suggestions ul {
    margin: 4px -1px;
    padding: 0;
    list-style: none;
    background: white;
    border: 1px solid #d1d1d1;
    border-radius: 2px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .react-tags__suggestions li {
    border-bottom: 1px solid #ddd;
    padding: 6px 8px;
  }

  .react-tags__suggestions li mark {
    text-decoration: underline;
    background: none;
    font-weight: 600;
  }

  .react-tags__suggestions li:hover {
    cursor: pointer;
    background: #eee;
  }

  .react-tags__suggestions li.is-active {
    background: #b7cfe0;
  }

  .react-tags__suggestions li.is-disabled {
    opacity: 0.5;
    cursor: auto;
  }
`;

const Tags = ({ tags, setTags }: Props) => {
  const [suggestions] = cardsState.useStore('mostUsedTags');

  function onDelete(i: number) {
    setTags(tags.filter((tag, index) => index !== i));
  }

  function onAddition(tag: { name: string }) {
    setTags([...tags, tag.name]);
  }

  return (
    <Container>
      <SectionHeader name="Tags" />
      <ReactTags
        tags={tags.map((tag, id) => ({ id, name: tag }))}
        suggestions={suggestions.map((suggestion, id) => ({
          id,
          name: suggestion,
        }))}
        minQueryLength={1}
        onDelete={onDelete}
        placeholderText="Add tag"
        onAddition={onAddition}
        allowNew
      />
    </Container>
  );
};

export default Tags;
