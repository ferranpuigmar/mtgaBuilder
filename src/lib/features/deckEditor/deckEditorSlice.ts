import { Deck } from "@/modules/deck/types/deck";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Deck = {
  id: '',
  name: '',
  cards: [],
};

const deckEditorSlice = createSlice({
    name: "deckEditor",
    initialState,
    reducers: {
        setDeck: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.cards = action.payload.cards;
        },
        setDeckName: (state, action) => {
            state.name = action.payload;
        },
        setDeckCards: (state, action) => {
            state.cards = action.payload;
        },
        addDeckCard: (state, action) => {
            const existCard = state.cards.find(card => card.id === action.payload.id);
            if (existCard) {
                existCard.selectedCopies += 1;
                return;
            }
            state.cards.push({ ...action.payload, selectedCopies: 1 });
        },
        removeDeckCard: (state, action) => {
            state.cards = state.cards.filter(card => card.id !== action.payload.id);
        },
    },
});

export const { addDeckCard, removeDeckCard, setDeckCards, setDeck, setDeckName } = deckEditorSlice.actions;

export default deckEditorSlice.reducer;
