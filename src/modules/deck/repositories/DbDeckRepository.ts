import prisma from '@/infra/bdClient/bdClient';
import { Deck } from '../types/deck';
import { DeckRepository } from './deckRepository.interface'
import { deckMapperToDomain } from '../mappers/deckMapper';

// TODO: Implement with a real data base
export class DbDeckRepository implements DeckRepository {
  async save(deck: Deck): Promise<{ id: string | void }> {
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
      await tx.deckCard.deleteMany({ where: { deck_id: savedDeck.id } });
      if (deck.cards && deck.cards.length > 0) {
        // Crear las cartas (si no existen)
        await tx.card.createMany({
          data: deck.cards.map(card => ({
            id: card.id,
            arena_id: card.arenaId ?? null,
            name: card.name,
            mana_cost: card.manaCost,
            max_copies: card.maxCopies
          })),
          skipDuplicates: true // Evita error si la carta ya existe
        });

        // Crear las relaciones en DeckCard
        await tx.deckCard.createMany({
          data: deck.cards.map(card => ({
            deck_id: savedDeck.id,
            card_id: card.id,
            selected_copies: card.selectedCopies
          }))
        });
      }
      return { id: savedDeck.id };
    });
  }

  async getAll(): Promise<Deck[]> {
    const decks = await prisma.deck.findMany({
      include: {
        cards: {
          select: { selected_copies: true, card: true },
        },
      }
    });
    
    return decks.map(deck => {
      const flatDeck = {
        ...deck,
        cards: deck.cards.map(cardWithSelected => ({
          ...cardWithSelected.card,
          selected_copies: cardWithSelected.selected_copies,
          deckId: deck.id,
          cardId: cardWithSelected.card.id
        }))
      };
      return deckMapperToDomain(flatDeck);
    });
  }

  async getById(id: string): Promise<Deck | null> {
    const deck = await prisma.deck.findUnique({
      where: { id },
      include: {
        cards: {
          select: { selected_copies: true, card: true },
        },
      },
    });
    if (!deck) return null;
    const flatDeck = {
      ...deck,
      cards: deck.cards.map(cardWithSelected => ({
        ...cardWithSelected.card,
        selected_copies: cardWithSelected.selected_copies,
        deckId: deck.id,
        cardId: cardWithSelected.card.id
      }))
    };
    return deckMapperToDomain(flatDeck);
  }

  async delete(id: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.deckCard.deleteMany({ where: { deck_id: id } });
      await tx.deck.delete({ where: { id } });
    });
  }
}
