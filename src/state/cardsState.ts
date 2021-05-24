import { createStore } from 'hookstated';
import { openDB, DBSchema } from 'idb';
import { sortByFrequencyAndRemoveDuplicates } from '@src/utils/sortByFrequencyAndRemoveDuplicates';

export type Card = {
  id: number;
  front: string;
  back: string;
  notes: string[];
  tags: string[];
  isArchieved: boolean;
  isTopWord: boolean;
};

export type CardOptionalId = Omit<Card, 'id'> & { id?: number };

type CardsState = {
  cards: Card[];
  mostUsedTags: string[];
};

interface MyDB extends DBSchema {
  cards: {
    value: CardOptionalId;
    key: number;
    // indexes: { 'by-archieved': boolean };
  };
}

type Reducers = {
  addCard: Card[];
  updateCard: (Partial<Omit<Card, 'id'>> & { id: number })[];
  deleteCard: { id: number };
};

const cardsState = createStore<CardsState, Reducers>('cards', {
  state: {
    cards: [],
    mostUsedTags: [],
  },
  reducers: {
    addCard: (state, newCards) => ({
      ...state,
      cards: [...state.cards, ...newCards],
    }),
    updateCard: (state, cardsToUpdate) => ({
      ...state,
      cards: state.cards.map((card) => {
        const updatedCard = cardsToUpdate.find(({ id }) => id === card.id);

        return updatedCard ? { ...card, ...updatedCard } : card;
      }),
    }),
    deleteCard: (state, { id }) => ({
      ...state,
      cards: state.cards.filter((card) => id !== card.id),
    }),
  },
});

const cardsStateDb = openDB<MyDB>('cards', 1, {
  upgrade(db) {
    db.createObjectStore('cards', {
      keyPath: 'id',
      autoIncrement: true,
    });
  },
});

export function loadCardsToState() {
  cardsStateDb.then((db) => {
    db.getAll('cards').then((cards: Card[]) => {
      cardsState.setKey('cards', cards);

      let suggestions: string[] = [];

      cards.forEach((card) => {
        if (card.tags && card.tags.length !== 0) {
          suggestions = suggestions.concat(card.tags);
        }
      });

      cardsState.setKey(
        'mostUsedTags',
        sortByFrequencyAndRemoveDuplicates(suggestions),
      );
    });
  });
}

export function addCard(
  newCards: Omit<Card, 'id'>[],
  callback?: (ids: number[]) => void,
) {
  cardsStateDb.then((db) => {
    const tx = db.transaction('cards', 'readwrite');

    const promises = newCards.map((card) =>
      tx.store.add({
        ...card,
      }),
    );

    tx.done.then(() => {
      Promise.all(promises).then((ids) => callback && callback(ids));
      loadCardsToState();
    });
  });
}

export function updateCard(cards: Card[]) {
  cardsStateDb.then((db) => {
    const tx = db.transaction('cards', 'readwrite');

    cards.forEach((card) => tx.store.put(card));

    tx.done.then(() => loadCardsToState());
  });
}

let lastDeletes: undefined | Card[];
export function undoDelete() {
  if (lastDeletes) {
    addCard(lastDeletes);

    alert('last delete undone');
  }
}

export function deleteCard(ids: Card['id'][]) {
  lastDeletes = cardsState
    .getState()
    .cards.filter((card) => ids.includes(card.id));
  cardsStateDb.then((db) => {
    const tx = db.transaction('cards', 'readwrite');

    ids.forEach((id) => tx.store.delete(id));

    tx.done.then(() => loadCardsToState());
  });
}

let lastExport: undefined | Card[];
export function undoLastExport() {
  if (lastExport) {
    updateCard(
      lastExport.map((card) => ({
        ...card,
        isArchieved: false,
      })),
    );

    alert('last export undone');
  }
}

type SRSCard = {
  id: string;
  front: string;
  back: string;
  tags?: string[];
  notes?: string[];
  lastReview?: string;
  createdAt?: number;
  wrongReviews: number;
  repetitions: number;
  lang: 'en';
  diff: number;
};

let lastImport: undefined | number[];
export function undoLastImport() {
  if (lastImport) {
    deleteCard(lastImport);

    alert('last import undone');
  }
}

export function importCards(toExport = false) {
  navigator.clipboard
    .readText()
    .then((text) => {
      const cards: SRSCard[] = JSON.parse(text);

      if (cards.length) {
        addCard(
          cards.map((card) => ({
            front: card.front || '',
            back: card.back || '',
            tags: card.tags || [],
            notes: card.notes || [],
            isArchieved: !toExport,
            isTopWord: false,
          })),
          (ids) => {
            lastImport = ids;
          },
        );
      } else {
        alert('invalid input');
      }
    })
    .catch((err) => {
      console.error('Failed to read clipboard contents: ', err);
    });

  alert('cards imported');
}

export async function exportCardsToSRS() {
  const cardsToExport = cardsState
    .getState()
    .cards.filter((card) => !card.isArchieved && Boolean(card.back));

  lastExport = cardsToExport;

  try {
    await navigator.clipboard.writeText(JSON.stringify(cardsToExport));
    updateCard(
      cardsToExport.map((card) => ({
        ...card,
        isArchieved: true,
      })),
    );
  } catch (err) {
    console.error('Could not copy text', err);
  }
}

export default cardsState;
