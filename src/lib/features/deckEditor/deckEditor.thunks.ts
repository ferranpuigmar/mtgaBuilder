import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeckRepository } from "@/modules/deck/repositories/deckRepository.interface";

export const fetchDeck = createAsyncThunk(
  'deckEditor/fetchDeck',
  async ({ deckId, repository }: { deckId?: string, repository: DeckRepository }) => {
    if (deckId) {
      return await repository.getById(deckId);
    }
    const decks = await repository.getAll();
    return decks[0];
  }
);
