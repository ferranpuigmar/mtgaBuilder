import { cardMapper } from '@/modules/deck/mappers/cardMapper'
import { scryfallApi } from './baseApi'
import type { SearchResponse, SearchResponseAPI } from './types'

export const cardsApi = scryfallApi.injectEndpoints({
  endpoints: (build) => ({
    searchCards: build.query<
      SearchResponse,
      {
        q: string
        page?: number
      }
    >({
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}|q=${(queryArgs.q ?? '').trim().toLowerCase()}`
      },
      transformResponse: ((response: SearchResponseAPI) => ({
        ...response,
        data: response.data.map(cardMapper),
      })),
      merge: (currentCache, newCache) => {
        const seenIds = new Set(currentCache.data.map(c => c.id))
        const newCacheData = [
          ...currentCache.data,
          ...newCache.data.filter(c => !seenIds.has(c.id)),
        ]
        currentCache.data = newCacheData
        currentCache.has_more = newCache.has_more
        currentCache.total_cards = newCache.total_cards
        currentCache.next_page = newCache.next_page
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        const cq = currentArg?.q?.trim().toLowerCase()
        const pq = previousArg?.q?.trim().toLowerCase()
        const cp = currentArg?.page ?? 1
        const pp = previousArg?.page ?? 1
        return cq !== pq || cp !== pp
      },
      query: ({ q, page = 1 }) => {
        return {
          url: 'cards/search',
          params: { q: q.trim(), page },
        }
      },
      providesTags: (_res, _err, args) => [
        { type: 'Cards', id: `search:${args.q.trim().toLowerCase()}` },
      ],
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: false,
})

export const { useSearchCardsQuery } = cardsApi