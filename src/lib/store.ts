import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { scryfallApi } from './features/rtk/scryFallApi/baseApi'
import deckEditorReducer from './features/deckEditor/deckEditorSlice'

const rootReducer = combineReducers({
  [scryfallApi.reducerPath]: scryfallApi.reducer,
  deckEditor: deckEditorReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(scryfallApi.middleware),
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']
