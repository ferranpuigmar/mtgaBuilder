import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchDeck, saveDeck } from './deckEditor.thunks';
import { DeckEditorState } from './deckEditor.types';

export const deckEditorExtraReducers = (builder: ActionReducerMapBuilder<DeckEditorState>) => {
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
        })
        .addCase(saveDeck.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(saveDeck.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(saveDeck.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error al guardar el deck';
        });
};
