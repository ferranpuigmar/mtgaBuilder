'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import type { AppStore, RootState } from '../lib/store'
import { makeStore } from '../lib/store'

type StoreProviderProps = {
  preloadedState?: Partial<RootState>
  init?: (store: AppStore) => void
  children: React.ReactNode
}

export default function StoreProvider({ preloadedState, init, children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | undefined>(undefined)

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState)
    if (init) init(storeRef.current)
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
