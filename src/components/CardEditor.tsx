import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@src/components/Button';
import SectionHeader from '@src/components/SectionHeader';
import TextField from '@src/components/TextField';
import Notes from '@src/containers/Notes';
import Tags from '@src/containers/Tags';
import ccaeList from '@src/data/CCAE.json';
import oxfordList from '@src/data/oxford3000-5000.json';
import { isEqual } from 'lodash-es';
import React, { useMemo, useRef, useState } from 'react';
import cardsState, { Card, CardOptionalId } from '@src/state/cardsState';
import { centerContent } from '@src/style/modifiers';
import { colorBgSecondary, colorPrimary, colorSecondary } from '@src/style/theme';
import useDebounce from '@src/utils/hooks/useDebounce';
import { openPopup } from '@src/utils/openPopup';
import rgba from '@src/utils/rgba';
import Fuse from 'fuse.js';

type Props = {
  initialCardProps?: Partial<Card>;
  background?: string;
  noteInputDefaultValue?: string;
  validBeforeSave?: (card: CardOptionalId) => boolean;
  onSave: (card: CardOptionalId) => void;
  saveButtonLabel: string;
};

type fieldsCommumProps = {
  isValid: boolean;
  forceRequired: boolean;
  required: boolean;
};

type fields = {
  front: { value: string } & fieldsCommumProps;
  back: { value: string } & fieldsCommumProps;
};

const cefrLeves = {
  a1: 'A1 Begginer',
  a2: 'A2 Elementary',
  b1: 'B1 Intermediate',
  b2: 'B2 Upper Intermediate',
  c1: 'C1 Advanced',
} as const;

const ccaeListWithRank = ccaeList.map((word, i) => ({
  word,
  pos: i + 1,
}));

const tagsSuggestions = [
  {
    p: 'verb',
  },
  {
    p: 'adjective',
  },
  {
    p: 'noun',
  },
];

const dictionaryUrls = {
  cambridgeTranslation: (query: string) =>
    `http://dictionary-beta.cambridge.org/us/search/english-portuguese/direct/?q=${encodeURI(
      query,
    )}`,
  contextReverso: (query: string) =>
    `http://context.reverso.net/traducao/ingles-portugues/${encodeURI(query)}`,
  googleTranslate: (query: string) =>
    `https://translate.google.com/?source=gtx_m#en/pt/${encodeURI(query)}`,
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const BottomButtons = styled.div`
  ${centerContent};
  justify-content: flex-end;
  width: 100%;
  margin: 28px 0 16px;
`;

const Row = styled.div`
  ${centerContent};
  width: 100%;
`;

const translateButtonsStyle = css`
  font-size: 11px;
  text-transform: none;
  flex-grow: 2;
`;

const initialFields = (front: string = '', back: string = '') => ({
  front: {
    value: front,
    isValid: !!front.trim(),
    required: true,
    forceRequired: false,
  },
  back: {
    value: back,
    isValid: !!back.trim(),
    required: false,
    forceRequired: false,
  },
});

const defaultCardProps: CardOptionalId = {
  id: undefined,
  front: '',
  back: '',
  tags: [],
  notes: [],
  isArchieved: false,
  isTopWord: false,
};

const TagSuggestion = styled.button`
  margin-left: 12px;
  display: inline;
  color: ${colorPrimary};
  text-decoration: underline;

  &::after {
    display: inline-block;
    content: '·';
    margin-left: 12px;
  }

  &:last-of-type::after {
    display: none;
  }
`;

const SimilarCardsWrapper = styled.div`
  width: 100%;
  background: ${colorBgSecondary};
  margin-top: 4px;
  font-size: 14px;
  border-radius: 12px;
  margin-bottom: 8px;
  color: #ddd;
  padding: 4px 16px;

  > div {
    margin: 8px 0;
    line-height: 1.4;

    > span {
      span {
        color: #fff;
        font-weight: 600;
        white-space: nowrap;
      }

      &::after {
        content: ' · ';
        padding: 0 4px;
        color: ${rgba(colorSecondary, 0.5)};
      }

      &:last-of-type::after {
        display: none;
      }
    }
  }
`;

function getHightlightedText(value: string) {
  if (!value) return '';

  const start = value.indexOf('***');
  const end = value.indexOf('***', start + 3);
  if (end === -1) return value;

  const hightLighted = value.substring(start + 3, end);

  return hightLighted;
}

const CardEditor = ({
  initialCardProps = {},
  onSave: saveAction,
  saveButtonLabel,
  background,
  noteInputDefaultValue,
  validBeforeSave = () => true,
}: Props) => {
  const initialProps = { ...defaultCardProps, ...initialCardProps };

  const [fields, setFields] = useState<fields>(
    initialFields(initialProps.front, initialProps.back),
  );
  const [tags, setTags] = useState<string[]>(initialProps.tags);
  const [notes, setNotes] = useState<string[]>(initialProps.notes);

  const newCardProps: CardOptionalId = {
    id: initialProps.id,
    front: fields.front.value.trim(),
    back: fields.back.value.trim(),
    tags,
    notes,
    isArchieved: initialProps.isArchieved,
    isTopWord: initialProps.isTopWord,
  };

  function handleChange(
    value: string | number,
    isValid: boolean,
    fieldId: keyof fields,
  ) {
    setFields({
      ...fields,
      [fieldId]: { value, isValid, forceRequired: false },
    });
  }

  function resetFields() {
    setFields(initialFields(initialProps.front, initialProps.back));
    setTags(initialProps.tags);
    setNotes(initialProps.notes);
  }

  function onClickSaveAction() {
    saveAction(newCardProps);
  }

  function addTag(tag: string) {
    setTags([...tags, tag]);
  }

  const debouncedFront = useDebounce(fields.front.value.trim(), 700);
  const debouncedBack = useDebounce(fields.back.value.trim(), 700);

  const oxfordListWord = useMemo(() => {
    const text = getHightlightedText(debouncedFront);

    return text && oxfordList.filter((word) => word.w === text);
  }, [debouncedFront]);

  const ccaeListWord = useMemo(() => {
    const text = getHightlightedText(debouncedFront);

    return text && ccaeListWithRank.filter((word) => word.word === text);
  }, [debouncedFront]);

  const frontIsDuplicated = useMemo(() => {
    if (!debouncedFront) return [];

    const fuse = new Fuse(cardsState.getState().cards, {
      keys: ['front'],
      threshold: 0.1,
      getFn: (v) => getHightlightedText(v.front),
      shouldSort: true,
    });
    return fuse
      .search(getHightlightedText(debouncedFront))
      .filter((card) => card.id !== initialProps.id);
  }, [debouncedFront]);

  const backIsDuplicated = useMemo(() => {
    if (!debouncedBack) return [];

    const fuse = new Fuse(cardsState.getState().cards, {
      keys: ['back'],
      threshold: 0.1,
      shouldSort: true,
    });
    return fuse
      .search(debouncedBack)
      .filter((card) => card.id !== initialProps.id);
  }, [debouncedBack]);

  const inputRef = useRef<HTMLInputElement>(null);

  function highlightText() {
    const input = inputRef.current;

    console.log(input);

    if (!input) return;

    const { value, selectionStart, selectionEnd } = input;

    if (selectionStart === null || selectionEnd === null) return;

    const selectedText = value
      .substring(selectionStart, selectionEnd)
      .trimEnd();

    const newValue = `${value.substring(
      0,
      selectionStart,
    )}***${selectedText}***${value.substring(
      selectionStart + selectedText.length,
    )}`;

    input.value = newValue;
    handleChange(newValue, true, 'front');
  }

  return (
    <Container>
      <TextField
        id="front"
        label="Front"
        background={background}
        handleChange={handleChange}
        value={fields.front.value}
        required
        inputRef={inputRef}
        disableLabelAnimation
        multiline
      />
      <Button
        label="Highlight text"
        small
        css={[
          translateButtonsStyle,
          { marginBottom: 20, marginTop: -8, alignSelf: 'flex-end' },
        ]}
        onClick={highlightText}
        disabled={!fields.front.isValid}
      />

      <TextField
        id="back"
        label="Back"
        background={background}
        handleChange={handleChange}
        value={fields.back.value}
        disableLabelAnimation
        multiline
      />
      {(oxfordListWord.length > 0 || ccaeListWord.length > 0) && (
        <SimilarCardsWrapper>
          {oxfordListWord && (
            <div>
              CERF Level:&nbsp;&nbsp;
              {oxfordListWord.map((word, i) => (
                <span key={i}>
                  <span>
                    {cefrLeves[word.c as 'a1'] || ''} ({word.p})
                  </span>
                </span>
              ))}
            </div>
          )}
          {ccaeListWord && (
            <div>
              CCAE Rank:&nbsp;&nbsp;
              {ccaeListWord.map((word, i) => (
                <span key={i}>
                  <span>{word.pos}</span>
                </span>
              ))}
            </div>
          )}
        </SimilarCardsWrapper>
      )}
      <Row>
        <Button
          label="Cambridge translation"
          small
          css={translateButtonsStyle}
          onClick={() =>
            openPopup(
              dictionaryUrls.cambridgeTranslation(
                getHightlightedText(fields.front.value),
              ),
            )
          }
          disabled={!fields.front.isValid}
        />
        <Button
          label="Context Reverso"
          small
          css={translateButtonsStyle}
          onClick={() =>
            openPopup(
              dictionaryUrls.contextReverso(
                getHightlightedText(fields.front.value),
              ),
            )
          }
          disabled={!fields.front.isValid}
        />
        <Button
          label="Google translate"
          small
          css={translateButtonsStyle}
          onClick={() =>
            openPopup(
              dictionaryUrls.googleTranslate(
                getHightlightedText(fields.front.value),
              ),
            )
          }
          disabled={!fields.front.isValid}
        />
      </Row>
      <Notes
        defaultValue={noteInputDefaultValue}
        tags={notes}
        setTags={setNotes}
      />
      <Tags tags={tags} setTags={setTags} />
      <Row
        css={css`
          color: #fff;
          font-size: 14px;
          justify-content: flex-start;
        `}
      >
        Suggestions:
        {(oxfordListWord && oxfordListWord.length > 0
          ? oxfordListWord
          : tagsSuggestions
        ).map((word, i) => (
          <TagSuggestion key={i} onClick={() => addTag(word.p)}>
            {word.p}
          </TagSuggestion>
        ))}
      </Row>
      {(frontIsDuplicated.length > 0 || backIsDuplicated.length > 0) && (
        <>
          <SectionHeader name="Similar cards" />
          <SimilarCardsWrapper>
            {frontIsDuplicated.length > 0 && (
              <div>
                Similar Front:&nbsp;&nbsp;
                {frontIsDuplicated.slice(0, 4).map((card, i) => (
                  <span key={i} title={`back: ${card.back.substr(0, 30)}`}>
                    <span>
                      {card.front.length > 30
                        ? `${card.front.substr(0, 30)}...`
                        : card.front}
                    </span>
                  </span>
                ))}
                {frontIsDuplicated.length > 4 && (
                  <span>
                    <span>+ {frontIsDuplicated.length - 4}...</span>
                  </span>
                )}
              </div>
            )}
            {backIsDuplicated.length > 0 && (
              <div>
                Similar Back:&nbsp;&nbsp;
                {backIsDuplicated.slice(0, 4).map((card, i) => (
                  <span key={i} title={`back: ${card.back.substr(0, 30)}`}>
                    <span>
                      {card.front.length > 30
                        ? `${card.front.substr(0, 30)}...`
                        : card.front}
                    </span>
                  </span>
                ))}
                {backIsDuplicated.length > 4 && (
                  <span>
                    <span>+ {backIsDuplicated.length - 4}...</span>
                  </span>
                )}
              </div>
            )}
          </SimilarCardsWrapper>
        </>
      )}
      <BottomButtons>
        <Button
          label="Reset"
          onClick={resetFields}
          css={{ marginRight: 8 }}
          disabled={isEqual(newCardProps, initialProps)}
        />
        <Button
          label={saveButtonLabel}
          onClick={onClickSaveAction}
          disabled={!fields.front.isValid || !validBeforeSave(newCardProps)}
        />
      </BottomButtons>
    </Container>
  );
};

export default CardEditor;
