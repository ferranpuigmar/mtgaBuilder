import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeckRepositoryType } from "@/modules/deck/repositories/deckRepository.interface";
import { Deck } from "@/modules/deck/types/deck";
import { LocalStorageDeckRepository } from "@/modules/deck/repositories/LocalStorageDeckRepository";
import { getRepository } from "@/modules/deck/utils/getRepositoryType";
import { setDeck } from "./deckEditorSlice";


export const fetchDeck = createAsyncThunk<Deck, { deckId?: string; repositoryType: DeckRepositoryType }>(
  'deckEditor/fetchDeck',
  async ({ deckId, repositoryType }) => {
    const repository = getRepository(repositoryType);
    if (repository instanceof LocalStorageDeckRepository) {
      return await repository.getAll();
    } else {
      const url = deckId ? `/api/decks/${deckId}` : '/api/decks';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Error al obtener el deck');

      const response = await res.json();
      
      if(!deckId && response.length !== 0) {
        return response[0];
      }

      return response;
    }
  }
);

export const saveDeck = createAsyncThunk(
  'deckEditor/saveDeck',
  async ({ deckData, repositoryType }: { deckData: Deck, repositoryType: DeckRepositoryType }, { dispatch }) => {
    const repository = getRepository(repositoryType);
    if (repository instanceof LocalStorageDeckRepository) {
      const result = await repository.save(deckData);

      // Refresca el estado con el deck guardado
      dispatch(setDeck(result));
      return result;
    }

    if(deckData.name.trim() === '') {
      deckData.name = 'Untitled Deck';
    }

    const res = await fetch('/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deckData)
      });
    if (!res.ok) throw new Error('Error al guardar el deck');
    const savedDeck = await res.json();

    // Refresca el estado con el deck guardado
    dispatch(setDeck(savedDeck));
    return savedDeck;
  }
);
