'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useSearchCardsQuery } from '@/lib/features/rtk/scryFallApi/searchCards'
import Card from './Card'

export default function CardList() {
    const sp = useSearchParams()
    const router = useRouter()
    const q = sp.get('q') ?? 'legal:alchemy'
    const page = Number(sp.get('page') ?? 1)

    const { data, isFetching, error } = useSearchCardsQuery({ q, page })

    if (error) return <p className="p-2 text-red-500">Error al buscar.</p>
    if (!data) return <p className="p-2">{isFetching ? 'Cargando…' : 'Sin resultados aún'}</p>

    const loadMore = () => {
        const p = new URLSearchParams(sp)
        p.set('page', String(page + 1))
        router.replace(`?${p.toString()}`)
    }

    return (
        <div className="space-y-3">
            <ul className="grid grid-flow-col grid-rows-2 gap-4">
                {data.data.map(card => (
                    <li key={card.id}>
                        {card.imageUris && <Card card={card} />}
                    </li>
                ))}
            </ul>

            {data.has_more && (
                <button onClick={loadMore} disabled={isFetching} className="border rounded px-3 py-1">
                    {isFetching ? 'Cargando…' : 'Cargar más'}
                </button>
            )}
        </div>
    )
}