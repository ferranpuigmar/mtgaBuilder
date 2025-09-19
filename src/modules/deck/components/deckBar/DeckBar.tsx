'use client'

import React, { useEffect } from 'react'
import { DeckRepository } from '../../repositories/deckRepository.interface'
import { Deck } from '../../types/deck'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setDeck } from '@/lib/features/deckEditor/deckEditorSlice'
import { RootState } from '@/lib/store'
import { DbDeckRepository } from '../../repositories/DbDeckRepository'
import { LocalStorageDeckRepository } from '../../repositories/LocalStorageDeckRepository'
import DeckBarheader from './DeckBarheader'

const deckMock: Deck = {
    id: '1',
    name: 'My Deck',
    cards: [
        { id: '1', name: 'Card 1', manaCost: '{1}{G}', maxCopies: 4, selectedCopies: 0 },
        { id: '2', name: 'Card 2', manaCost: '{2}{G}', maxCopies: 4, selectedCopies: 0 },
        { id: '3', name: 'Card 3', manaCost: '{3}{G}', maxCopies: 4, selectedCopies: 0 },
    ],
}

const DeckCardsList = ({ deckId, repositoryType }: { deckId?: string, repositoryType: string }) => {

    const repository: DeckRepository = React.useMemo(() => (
        repositoryType === 'localStorage'
            ? new LocalStorageDeckRepository()
            : new DbDeckRepository()
    ), [repositoryType]);

    const dispatch = useDispatch()
    const deck = useSelector((state: RootState) => state.deckEditor)

    useEffect(() => {
        const loadDeck = async () => {
            let deck: Deck | undefined = undefined;
            if (deckId) {
                deck = await repository.getById(deckId) ?? undefined;
            } else {
                const decks = await repository.getAll();
                deck = decks[0];
            }

            // if(!deck) {
            //     await repository.save(deckMock);
            //     const decks = await repository.getAll();
            //     deck = decks[0];
            // }
            if (!deck) {
                dispatch(setDeck(deck));
            }
            
        };
        loadDeck();
    }, [deckId, repository, dispatch]);

    return (
        <div>
            <DeckBarheader />
            <ul>
                {deck.cards.map(card => (
                    <li key={card.id}>{card.name} {card.selectedCopies}</li>
                ))}
            </ul>
        </div>
    )
}

export default DeckCardsList