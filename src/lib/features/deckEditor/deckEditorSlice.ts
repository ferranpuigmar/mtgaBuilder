import { createSlice } from "@reduxjs/toolkit";
import { DeckEditorState } from "./deckEditor.types";
import { initialState } from "./deckEditor.initialState";
import { fetchDeck } from "./deckEditor.thunks";

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeck.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeck.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                if (action.payload) {
                    state.id = action.payload.id;
                    state.name = action.payload.name;
                    state.cards = action.payload.cards;
                }
            })
            .addCase(fetchDeck.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al cargar el deck';
            });
    },
});

export const { addDeckCard, removeDeckCard, setDeckCards, setDeck, setDeckName, setDeckQuantity } = deckEditorSlice.actions;


export default deckEditorSlice.reducer;
