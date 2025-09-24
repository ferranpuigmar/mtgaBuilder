import prisma from '@/infra/bdClient/bdClient';
import { Deck } from "../types/deck";
import { deckMapperToDomain } from '../mappers/deckMapper';

export const getByIdDeck = async (id: string): Promise<Deck | null> => {
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