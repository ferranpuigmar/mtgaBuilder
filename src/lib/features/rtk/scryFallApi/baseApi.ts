import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const scryfallApi = createApi({
  reducerPath: 'api',                 // único reducerPath
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.scryfall.com', // o tu BFF (/api)
  }),
  tagTypes: ['Cards', 'Card'],
  endpoints: () => ({}),              // sin endpoints aquí
})