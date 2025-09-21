'use client'

import React, { useEffect } from 'react'
import { useUnsavedChangesModal } from '@/modules/shared/hooks/useUnsavedChangesModal'
import { DeckRepository } from '../../repositories/deckRepository.interface'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { DbDeckRepository } from '../../repositories/DbDeckRepository'
import { LocalStorageDeckRepository } from '../../repositories/LocalStorageDeckRepository'
import DeckBarheader from './DeckBarheader'
import DeckBarCard from './DeckBarCard'
import { fetchDeck, saveDeck } from '@/lib/features/deckEditor/deckEditor.thunks'
import DeckBarFooter from './DeckBarFooter'
import { Deck } from '../../types/deck'
import { selectCurrentDeck, selectOriginalDeck } from '@/lib/features/deckEditor/deckEditor.selectors'
import DeckModalConfirm from './DeckModalConfirm'
import { setOriginalDeck } from '@/lib/features/deckEditor/deckEditorSlice'

const DeckCardsList = ({ deckId, repositoryType }: { deckId?: string, repositoryType: string }) => {
    const repository: DeckRepository = React.useMemo(() => (
        repositoryType === 'localStorage'
            ? new LocalStorageDeckRepository()
            : new DbDeckRepository()
    ), [repositoryType]);

    const dispatch = useDispatch<AppDispatch>()
    const deck = useSelector(selectCurrentDeck);
    const originalDeck = useSelector(selectOriginalDeck);
    const loading = useSelector((state: RootState) => state.deckEditor.loading)

    useEffect(() => {
        dispatch(fetchDeck({ deckId, repository }));
    }, [deckId, repository, dispatch]);

    const isDeckEqual = (a: Deck, b: Deck) => JSON.stringify(a) === JSON.stringify(b)
    const hasDifferences = !isDeckEqual(deck, originalDeck)

    const {
      showModal,
      handleModalConfirm,
      handleModalCancel,
      refreshAction
    } = useUnsavedChangesModal({ hasDifferences })

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasDifferences && refreshAction) {
                e.preventDefault()
                e.returnValue = ''
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [hasDifferences, refreshAction])

    const handleOnSave = async () => {
       await dispatch(saveDeck({ deckData: deck, repository }));
       dispatch(setOriginalDeck(deck));
    }

    return (
        <div className="flex flex-col h-full">
            {showModal && (
                <DeckModalConfirm onConfirm={handleModalConfirm} onCancel={handleModalCancel} />
            )}
            {!loading && <DeckBarheader />}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <span className="text-gray-400">Cargando deck...</span>
                </div>
            ) : (
                <>
                    <ul className="flex-1 overflow-y-auto">
                        {deck.cards.map(card => (
                            <DeckBarCard key={card.id} card={card} />
                        ))}
                    </ul>
                </>
            )}
            <DeckBarFooter onSave={handleOnSave} />
        </div>
    )
}

export default DeckCardsList