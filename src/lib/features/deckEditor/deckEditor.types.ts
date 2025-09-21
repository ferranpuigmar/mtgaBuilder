import { Deck } from "@/modules/deck/types/deck";

export interface DeckEditorState extends Deck {
  originalDeck: Deck;
  loading: boolean;
  error: string | null;
}
