import { NextResponse } from 'next/server';
import { DbDeckRepository } from '@/modules/deck/repositories/DbDeckRepository';

const dbRepo = new DbDeckRepository();

export async function GET() {
  const decks = await dbRepo.getAll();
  return NextResponse.json(decks);
}

export async function POST(request: Request) {
  const deckData = await request.json();
  const { id } = await dbRepo.save(deckData);
  
  // Devuelve el mazo actualizado usando el id generado
  const deckWithCards = await dbRepo.getById(id as string);
  return NextResponse.json(deckWithCards);
}
