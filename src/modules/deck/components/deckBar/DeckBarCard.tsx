import React from 'react'
import { DeckCard } from '../../types/deck'
import { useDispatch } from 'react-redux'
import { setDeckQuantity } from '@/lib/features/deckEditor/deckEditorSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const DeckBarCardQuantity = ({ id }: { id: string}) => {
    const dispatch = useDispatch();
    const cardQuantity = useSelector((state: RootState) => state.deckEditor.cards.find((c: DeckCard) => c.id === id)?.selectedCopies || 0);

    const handleQuantity = (newQuantity: number) => {
        dispatch(setDeckQuantity({ cardId: id, quantity: newQuantity }));
    }

    return (
        <div className='flex items-center gap-2 cursor-pointer'>
            <span onClick={() => handleQuantity(cardQuantity + 1)}>+</span>
            <p>{cardQuantity}</p>
            <span onClick={() => handleQuantity(cardQuantity - 1)}>-</span>
        </div>
    )
}

const DeckBarCard = ({ card }: { card: DeckCard}) => {
  return (
    <div>
      <div className='flex items-center gap-2 cursor-pointer'>
        <DeckBarCardQuantity id={card.id} />
        <h3>{card.name}</h3>
        <p>{card.id}</p>
      </div>
    </div>
  )
}

export default DeckBarCard