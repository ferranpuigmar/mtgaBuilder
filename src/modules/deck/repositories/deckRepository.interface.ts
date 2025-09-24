
import { Deck } from '../types/deck';

export enum DeckRepositoryType {
  LOCAL_STORAGE = 'LOCAL_STORAGE',
  DATABASE = 'DATABASE'
}

export interface DeckRepository {
  save(deck: Deck): Promise<{ id: string | void }>;
  getAll(): Promise<Deck[]>;
  getById(id: string): Promise<Deck | null>;
  delete(id: string): Promise<void>;
}