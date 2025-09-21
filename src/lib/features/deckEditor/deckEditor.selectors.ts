import { RootState } from '@/lib/store';

export const selectDeckEditor = (state: RootState) => state.deckEditor;
export const selectDeckName = (state: RootState) => state.deckEditor.name;
export const selectDeckCards = (state: RootState) => state.deckEditor.cards;
export const selectDeckLoading = (state: RootState) => state.deckEditor.loading;
export const selectDeckError = (state: RootState) => state.deckEditor.error;
export const selectCurrentDeck = (state: RootState) => {
    const deck = {
        id: state.deckEditor.id,
        name: state.deckEditor.name,
        cards: state.deckEditor.cards,
        description: state.deckEditor.description,
    }
    return deck
}
export const selectOriginalDeck = (state: RootState) => {
    const deck = {
        id: state.deckEditor.originalDeck.id,
        name: state.deckEditor.originalDeck.name,
        cards: state.deckEditor.originalDeck.cards,
        description: state.deckEditor.originalDeck.description,
    }
    return deck
}
