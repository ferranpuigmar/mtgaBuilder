// Update the import path below to the correct relative path if needed

import { cardsApi } from "@/lib/features/rtk/scryFallApi/searchCards";
import { makeStore } from "@/lib/store";
import StoreProvider from "./StoreProvider";
import SearchBox from "@/modules/search/components/searchBox";
import CardList from "@/modules/search/components/CardList";
import DeckCardsList from "@/modules/deck/components/deckBar/DeckBar";

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const params = await searchParams
  const query = params.q ?? 'legal:alchemy'

  const page = Number(params.page ?? 1)

  const store = makeStore()

  store.dispatch(
    cardsApi.endpoints.searchCards.initiate({ q: query, page })
  )

  await Promise.all(store.dispatch(cardsApi.util.getRunningQueriesThunk()))

  const preloadedState = store.getState()

  return (
    <StoreProvider preloadedState={preloadedState}>
      <div className="grid grid-cols-[70%_30%] h-screen">
        <div className="flex flex-col h-full">
          {/* Fila 1: alto automático */}
          <div className="p-2 shrink-0">
            <SearchBox />
          </div>
          {/* Fila 2: ocupa el resto */}
          <div className="bg-blue-700 p-2 flex-1 overflow-y-auto scrollbar-hide">
            <CardList />
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="bg-gray-800 p-2 shrink-0 h-full">
            <DeckCardsList repositoryType="localStorage" />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}
