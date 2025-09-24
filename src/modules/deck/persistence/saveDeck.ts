import prisma from '@/infra/bdClient/bdClient';
import { Deck } from '../types/deck';

export async function saveDeck(deck: Deck): Promise<{ id: string | void }> {
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
        skipDuplicates: true
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
