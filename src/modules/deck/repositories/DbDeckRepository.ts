import { Deck } from '../types/deck';
import { DeckRepository } from './deckRepository.interface'

// Ejemplo: implementación ficticia en memoria
export class DbDeckRepository implements DeckRepository {
  private decks: Deck[] = [];

  async save(deck: Deck): Promise<void> {
    const idx = this.decks.findIndex(d => d.id === deck.id);
    if (idx >= 0) {
      this.decks[idx] = deck;
    } else {
      this.decks.push(deck);
    }
  }

  async getAll(): Promise<Deck[]> {
    return [...this.decks];
  }

  async getById(id: string): Promise<Deck | null> {
    return this.decks.find(d => d.id === id) ?? null;
  }

  async delete(id: string): Promise<void> {
    this.decks = this.decks.filter(d => d.id !== id);
  }
}
