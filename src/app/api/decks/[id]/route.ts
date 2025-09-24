import { NextResponse } from 'next/server';
import { DbDeckRepository } from '@/modules/deck/repositories/DbDeckRepository';

const dbRepo = new DbDeckRepository();

export async function GET({ params }: { params: { id: string } }) {
  const deck = await dbRepo.getById(params.id);
  if (!deck) {
    return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
  }
  return NextResponse.json(deck);
}
