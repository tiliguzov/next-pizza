import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from '.';
import Image from 'next/image';
import { SheetClose } from '../ui/sheet';
import { Button } from '..';
import { ArrowLeft } from 'lucide-react';

interface Props {
  className?: string;
}

export const CartDrawerEmpty: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center w-72 mx-auto', className)}>
      <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
      <Title size="sm" text="Cart it empty" className="text-center font-bold my-2" />
      <p className="text-center text-neutral-500 mb-5">Add at least one pizza to make an order</p>

      <SheetClose>
        <Button className="w-56 h-12 text-base" size="lg">
          <ArrowLeft className="w-5 mr-2" />
          Return back
        </Button>
      </SheetClose>
    </div>
  );
};
