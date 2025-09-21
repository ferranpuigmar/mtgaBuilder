import React from 'react'

interface DeckModalConfirmProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeckModalConfirm = ({ onConfirm, onCancel }: DeckModalConfirmProps) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-2">Cambios sin guardar</h2>
                <p className="mb-4">Tienes cambios sin guardar. ¿Seguro que quieres salir?</p>
                <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onConfirm}>Salir</button>
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default DeckModalConfirm