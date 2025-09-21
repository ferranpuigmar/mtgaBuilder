import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./deckEditor.initialState";
import { deckEditorExtraReducers } from "./deckEditor.extraReducers";

const deckEditorSlice = createSlice({
    name: "deckEditor",
    initialState,
    reducers: {
        setDeck: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.cards = action.payload.cards;
        },
        setOriginalDeck: (state, action) => {
            state.originalDeck = action.payload;
        },
        setDeckName: (state, action) => {
            state.name = action.payload;
        },
        setDeckCards: (state, action) => {
            state.cards = action.payload;
        },
        setDeckQuantity: (state, action) => {
            const { cardId, quantity } = action.payload;
            if (quantity === 0) {
                state.cards = state.cards.filter(card => card.id !== cardId);
                return;
            }
            const card = state.cards.find(card => card.id === cardId);

            if (card && quantity > card.maxCopies) {
                return;
            }

            if (card && card.selectedCopies !== quantity) {
                card.selectedCopies = quantity;
            }
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
    extraReducers: deckEditorExtraReducers,
});

export const { addDeckCard, removeDeckCard, setDeckCards, setDeck, setDeckName, setDeckQuantity, setOriginalDeck } = deckEditorSlice.actions;


export default deckEditorSlice.reducer;
