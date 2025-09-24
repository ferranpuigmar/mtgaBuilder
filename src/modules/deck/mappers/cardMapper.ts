import { Card, SearchCardApi } from "@/lib/features/rtk/scryFallApi/types";

export const getMaxCopies = (card: SearchCardApi): number | typeof Infinity => {
 const typeLine = card.type_line ?? "";
  const oracle = card.oracle_text ?? "";

  const isBasicLand = /\bBasic Land\b/i.test(typeLine);
  const anyNumberClause = /\ba deck can have any number of cards named\b/i.test(oracle);

  if (isBasicLand || anyNumberClause) return 0;

  return 4;
};

export const cardMapper = (cardData: SearchCardApi): Card => {
    const { id, name, mana_cost, image_uris, colors, cmc, arena_id } = cardData;

    return {
        id,
        arenaId: arena_id ?? undefined,
        name,
        manaCost: mana_cost ?? "",
        maxCopies: getMaxCopies(cardData),
        colors: colors ?? [],
        cmc: cmc ?? 0,
        imageUris: image_uris ?? { small: "", normal: "", large: "" }
    };
};
