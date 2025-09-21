import React from 'react'
import { CardSymbol } from '@/lib/features/rtk/scryFallApi/types'
import BlackManaIcon from '@/assets/manaIcons/blackManaIcon.svg';
import BlueManaIcon from '@/assets/manaIcons/blueManaIcon.svg';
import GreenManaIcon from '@/assets/manaIcons/greenManaIcon.svg';
import RedManaIcon from '@/assets/manaIcons/redManaIcon.svg';
import WhiteManaIcon from '@/assets/manaIcons/whiteManaIcon.svg';
import clsx from 'clsx';

const manaSvgMap: Record<CardSymbol, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [CardSymbol.Black]: BlackManaIcon,
  [CardSymbol.Blue]: BlueManaIcon,
  [CardSymbol.Green]: GreenManaIcon,
  [CardSymbol.Red]: RedManaIcon,
  [CardSymbol.White]: WhiteManaIcon,
};

export const ManaIcon = ({ symbol }: { symbol: CardSymbol | string }) => {
  const Icon =
    Object.values(CardSymbol).includes(symbol as CardSymbol)
      ? manaSvgMap[symbol as CardSymbol]
      : undefined;
  const manaWrapperClasses = clsx(
    'w-[20px] h-[20px] rounded-full flex items-center justify-center',
    {
      'bg-white': !Icon,
    }
  );

  return (
    <div className={manaWrapperClasses}>
      {Icon ? <Icon className="w-full h-full" /> : <span className="text-sm">{symbol}</span>}
    </div>
  )
}
