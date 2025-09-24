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
            console.log({ cardId, quantity });
            if (quantity === 0) {
                state.cards = state.cards.filter(card => card.id !== cardId);
                return;
            }
            state.cards = state.cards.map(card =>
                card.id === cardId
                    ? (quantity > card.maxCopies ? card : { ...card, selectedCopies: quantity })
                    : card
            );

                        console.log(JSON.stringify(state.cards, null, 4));

        },
        addDeckCard: (state, action) => {
            console.log({ 'adding action': action });
            const idx = state.cards.findIndex(card => card.id === action.payload.id);
            if (idx !== -1) {
                state.cards = state.cards.map((card, i) =>
                    i === idx ? { ...card, selectedCopies: card.selectedCopies + 1 } : card
                );
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
