import { CardSymbol } from "@/lib/features/rtk/scryFallApi/types";

const parseMana = (s: string): string[] =>
  Array.from(s.matchAll(/\{([^}]+)\}/g), m => m[1]);

export const getManaTokens = (manaCost: string): (CardSymbol | string)[] => {
  const tokens = parseMana(manaCost);
  return tokens.filter(
    t => Object.values(CardSymbol).includes(t as CardSymbol) || /^\d+$/.test(t)
  );
};