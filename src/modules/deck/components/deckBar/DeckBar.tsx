'use client'

import React, { useEffect } from 'react'
import { DeckRepository } from '../../repositories/deckRepository.interface'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { DbDeckRepository } from '../../repositories/DbDeckRepository'
import { LocalStorageDeckRepository } from '../../repositories/LocalStorageDeckRepository'
import DeckBarheader from './DeckBarheader'
import DeckBarCard from './DeckBarCard'
import { fetchDeck } from '@/lib/features/deckEditor/deckEditor.thunks'
import DeckBarFooter from './DeckBarFooter'

const DeckCardsList = ({ deckId, repositoryType }: { deckId?: string, repositoryType: string }) => {

    const repository: DeckRepository = React.useMemo(() => (
        repositoryType === 'localStorage'
            ? new LocalStorageDeckRepository()
            : new DbDeckRepository()
    ), [repositoryType]);

    const dispatch = useDispatch<AppDispatch>()
    const deck = useSelector((state: RootState) => state.deckEditor)
    const loading = useSelector((state: RootState) => state.deckEditor.loading)

    useEffect(() => {
        dispatch(fetchDeck({ deckId, repository }));
    }, [deckId, repository, dispatch]);

    const handleOnSave = async () => {
        try {
            await repository.save(deck);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col h-full">
            {!loading && <DeckBarheader />}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <span className="text-gray-400">Cargando deck...</span>
                </div>
            ) : (
                <ul className="flex-1 overflow-y-auto">
                    {deck.cards.map(card => (
                        <DeckBarCard key={card.id} card={card} />
                    ))}
                </ul>
            )}
            <DeckBarFooter onSave={handleOnSave} />
        </div>
    )
}

export default DeckCardsList