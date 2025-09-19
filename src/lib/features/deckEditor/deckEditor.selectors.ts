import { RootState } from '@/lib/store';

export const selectDeckEditor = (state: RootState) => state.deckEditor;
export const selectDeckName = (state: RootState) => state.deckEditor.name;
export const selectDeckCards = (state: RootState) => state.deckEditor.cards;
export const selectDeckLoading = (state: RootState) => state.deckEditor.loading;
export const selectDeckError = (state: RootState) => state.deckEditor.error;
