import { Deck } from "@/modules/deck/types/deck";
import { DeckEditorState } from "../deckEditor.types";

export const deckToDB = (deck: DeckEditorState): Deck => {
    return {
        id: deck.id,
        name: deck.name,
        cards: deck.cards,
        description: deck.description,
    };
};
