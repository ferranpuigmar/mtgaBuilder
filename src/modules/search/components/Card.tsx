'use client'

import { addDeckCard } from '@/lib/features/deckEditor/deckEditorSlice'
import type { Card } from '@/lib/features/rtk/scryFallApi/types'
import type { RootState } from '@/lib/store'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const CardBullets = ({ maxCopies, usedTimes }: { maxCopies: number, usedTimes: number }) => {
  if(maxCopies <= 0) return <div className={`w-4 h-4`}>Infinite</div>;
  return (
    <div className='flex gap-1'>
        {Array.from({ length: maxCopies }, (_, i) => {
          const bulletNumberIsSelected = i + 1 <= usedTimes;
          const selectedClass = bulletNumberIsSelected ? 'bg-green-500' : 'bg-transparent';

          return <div key={i} className={`w-4 h-4 rounded-full border ${selectedClass}`}></div>;
        })}
    </div>
  )
} 

const Card = ({ card }: { card: Card }) => {
  const dispatch = useDispatch();
  const deckCard = useSelector((state: RootState) => state.deckEditor.cards.find((c) => {
    console.log({ equality: c.id?.toString().trim() === card.id?.toString().trim(), cardId: card.id, cId: c.id });
    return c.id?.toString().trim() === card.id?.toString().trim();
  }));
  const usedTimes = deckCard ? deckCard.selectedCopies : 0;

  const handleUsedTimes = () => {
    if(card.maxCopies === 0 || usedTimes < card.maxCopies) {
        dispatch(addDeckCard(card));
    }
  }

  return (
    <div className='flex flex-col items-center gap-2 cursor-pointer' onClick={() => handleUsedTimes()}>
        <div><CardBullets maxCopies={card.maxCopies} usedTimes={usedTimes} /></div>
        <div className='rounded-2xl aspect-[28/39] w-[252px] overflow-hidden'>
            <div className="relative w-full h-full">
                {card.imageUris['normal'] ? (
                  <Image src={card.imageUris['normal']} alt={card.name} fill className='object-contain' sizes="100vw" />
                ) : null}
                <div />
            </div>
        </div>
    </div>
  )
}

export default Card;