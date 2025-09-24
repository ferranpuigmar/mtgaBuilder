import { Deck } from '../types/deck';
import { DeckRepository } from './deckRepository.interface'

export class LocalStorageDeckRepository implements DeckRepository {
  private key = 'deck';

  async save(deck: Deck): Promise<{ id: string | void }> {
    localStorage.setItem(this.key, JSON.stringify(deck));
    return { id: deck.id };
  }

  async getAll(): Promise<Deck[]> {
    const deck = localStorage.getItem(this.key);
    return deck ? [JSON.parse(deck)] : [];
  }

  async getById(id: string): Promise<Deck | null> {
    const deck = localStorage.getItem(this.key);
    if (!deck) return null;
    const parsed = JSON.parse(deck);
    return parsed.id === id ? parsed : null;
  }

  async delete(id: string): Promise<void> {
    const deck = localStorage.getItem(this.key);
    if (!deck) return;
    const parsed = JSON.parse(deck);
    if (parsed.id === id) localStorage.removeItem(this.key);
  }
}
