import prisma from '@/infra/bdClient/bdClient';
import { saveDeck } from '../persistence/saveDeck';
import { Deck } from '../types/deck';
import { DeckRepository } from './deckRepository.interface'
import { getAllDecks } from '../persistence/getAllDecks';
import { getByIdDeck } from '../persistence/getByIdDeck';

// TODO: Implement with a real data base
export class DbDeckRepository implements DeckRepository {
  async save(deck: Deck): Promise<{ id: string | void }> {
    return saveDeck(deck);
  }

  async getAll(): Promise<Deck[]> {
    return getAllDecks();
  }

  async getById(id: string): Promise<Deck | null> {
    return getByIdDeck(id);
  }

  async delete(id: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.deckCard.deleteMany({ where: { deck_id: id } });
      await tx.deck.delete({ where: { id } });
    });
  }
}
