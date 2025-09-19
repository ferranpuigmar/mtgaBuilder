
import { Deck } from '../types/deck';

export interface DeckRepository {
  save(deck: Deck): Promise<void>;
  getAll(): Promise<Deck[]>;
  getById(id: string): Promise<Deck | null>;
  delete(id: string): Promise<void>;
}