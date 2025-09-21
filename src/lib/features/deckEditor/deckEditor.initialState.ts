import { DeckEditorState } from "./deckEditor.types";

const initialDeck = {
  id: '',
  name: '',
  cards: [],
};

export const initialState: DeckEditorState = {
  ...initialDeck,
  originalDeck: initialDeck,
  loading: true,
  error: null,
};
