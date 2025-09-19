'use client'

import { cardsApi } from '@/lib/features/rtk/scryFallApi/searchCards'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const SearchBox = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const sp = useSearchParams()

  const handleQuery = (query: string) => {

    const params = new URLSearchParams(sp)
    params.set('q', query)
    params.set('page', '1')
    router.replace(`?${params.toString()}`)
    dispatch(cardsApi.endpoints.searchCards.initiate({ q: query, page: 1 }))
  } 

  return (
    <input 
      className="border border-gray-300 p-2 rounded" 
      placeholder="Buscar cartas..." 
      onInput={(e) => handleQuery((e.target as HTMLInputElement).value)} />
  )
}

export default SearchBox