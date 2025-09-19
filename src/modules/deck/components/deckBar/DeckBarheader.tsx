import { setDeckName } from '@/lib/features/deckEditor/deckEditorSlice';
import { RootState } from '@/lib/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DeckBarheader = () => {
  const dispatch = useDispatch();
  const deckName = useSelector((state: RootState) => state.deckEditor.name);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDeckName(e.target.value));
  };

  const placeholder = deckName ? '' : 'Write here your deck name';

  return (
    <div className='p-2 pb-1 border-b border-gray-700'>
      <input className='placeholder:text-gray-500 text-lg font-bold w-full text-white' placeholder={placeholder} value={deckName} onChange={handleOnChange} />
    </div>
  )
}

export default DeckBarheader