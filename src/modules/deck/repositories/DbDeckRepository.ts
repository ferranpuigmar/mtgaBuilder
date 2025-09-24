import prisma from '@/infra/bdClient/bdClient';
import { Deck } from '../types/deck';
import { DeckRepository } from './deckRepository.interface'
import { deckMapperToDomain } from '../mappers/deckMapper';

// TODO: Implement with a real data base
export class DbDeckRepository implements DeckRepository {
  async save(deck: Deck): Promise<{ id: string | void } > {
    return await prisma.$transaction(async (tx) => {
      const isNew = !deck.id || String(deck.id).trim() === '';
      let savedDeck;
      if (isNew) {
        savedDeck = await tx.deck.create({
          data: { name: deck.name, description: deck.description ?? '' }
        });
      } else {
        savedDeck = await tx.deck.upsert({
          where: { id: String(deck.id) },
          update: { name: deck.name, description: deck.description ?? '' },
          create: { id: String(deck.id), name: deck.name, description: deck.description ?? '' }
        });
      }
      await tx.card.deleteMany({ where: { deck_id: savedDeck.id } });
      if (deck.cards && deck.cards.length > 0) {
        await tx.card.createMany({
          data: deck.cards.map(card => ({
            id: card.id,
            arena_id: card.arenaId ?? null,
            name: card.name,
            mana_cost: card.manaCost,
            max_copies: card.maxCopies,
            selected_copies: card.selectedCopies,
            deck_id: savedDeck.id
          }))
        });
      }
      return { id: savedDeck.id };
    });
  }

  async getAll(): Promise<Deck[]> {
    const decks = await prisma.deck.findMany({
      include: { cards: true }
    });
    return decks.map(deck => deckMapperToDomain(deck));
  }

  async getById(id: string): Promise<Deck | null> {
    const deck = await prisma.deck.findUnique({
      where: { id },
      include: { cards: true }
    });
    return deck ? deckMapperToDomain(deck) : null;
  }

  async delete(id: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.card.deleteMany({ where: { deck_id: id } });
      await tx.deck.delete({ where: { id } });
    });
  }
}
