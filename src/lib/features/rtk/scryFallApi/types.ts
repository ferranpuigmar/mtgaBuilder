export enum CardColor {
  White = 'W',
  Blue = 'U',
  Black = 'B',
  Red = 'R',
  Green = 'G',
}

export type Card = {
  id: string;
  name: string;
  maxCopies: number;
  manaCost: string;
  imageUris: { small: string; normal: string; large: string };
  colors?: Array<'W'|'U'|'B'|'R'|'G'>;
  cmc?: number;
}

export type SearchCardApi = {
  id: string; 
  name: string; 
  mana_cost?: string; 
  cmc?: number;
  colors?: Array<'W'|'U'|'B'|'R'|'G'>;
  image_uris?: { small: string; normal: string; large: string };
  type_line: string;
  oracle_text: string;
}

export type SearchResponse = Omit<SearchResponseAPI, 'data'> & {
  data: Card[];
}

export type SearchResponseAPI = {
  object: 'list'; 
  total_cards: number; 
  has_more: boolean; 
  next_page?: string;
  data: SearchCardApi[];
}