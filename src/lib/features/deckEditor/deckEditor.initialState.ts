import { DeckEditorState } from "./deckEditor.types";

export const initialState: DeckEditorState = {
  id: '',
  name: '',
  cards: [],
  loading: true,
  error: null,
};
