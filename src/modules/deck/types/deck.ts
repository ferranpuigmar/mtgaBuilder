import { Card } from "@/lib/features/rtk/scryFallApi/types";

export type DeckCard = Omit<Card, 'imageUris' | 'colors' | 'cmc'> & {
    selectedCopies: number;
};

export type Deck = {
    id: string;
    name: string;
    description?: string;
    cards: Array<DeckCard>;
}