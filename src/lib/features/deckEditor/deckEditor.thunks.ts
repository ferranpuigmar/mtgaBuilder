import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeckRepository } from "@/modules/deck/repositories/deckRepository.interface";
import { Deck } from "@/modules/deck/types/deck";
import { setOriginalDeck } from "./deckEditorSlice";

export const fetchDeck = createAsyncThunk(
  'deckEditor/fetchDeck',
  async ({ deckId, repository }: { deckId?: string, repository: DeckRepository }, { dispatch }) => {
    if (deckId) {
      return await repository.getById(deckId);
    }
    const decks = await repository.getAll();
    const selectedDeck = decks[0];
    dispatch(setOriginalDeck(selectedDeck));
    return selectedDeck;
  }
);

export const saveDeck = createAsyncThunk(
  'deckEditor/saveDeck',
  async ({ deckData, repository }: { deckData: Deck, repository: DeckRepository }) => {
    return await repository.save(deckData);
  }
);
