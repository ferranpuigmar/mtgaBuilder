import { RootState } from '@/lib/store';
import React from 'react'
import { useSelector } from 'react-redux'

const DeckBarFooter = ({ onSave }: { onSave: () => Promise<void> }) => {

    const loading = useSelector((state: RootState) => state.deckEditor.loading);

    return (
        <div className='mt-auto p-4 border-t'>
            <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => onSave()} disabled={loading}>
                {loading ? 'Saving...' : 'Save Deck'}
            </button>
        </div>
    )
}

export default DeckBarFooter