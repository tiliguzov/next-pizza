import { cn } from '@/shared/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui';
import Image from 'next/image';
import { Title } from '..';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const CheckoutCartEmpty: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center w-72 m-auto', className)}>
      <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
      <Title size="sm" text="Cart it empty" className="text-center font-bold my-2" />
      <p className="text-center text-neutral-500 mb-5">Add at least one pizza to make an order</p>

      <Link href={`/`}>
        <Button className="w-56 h-12 text-base" size="lg">
          <ArrowLeft className="w-5 mr-2" />
          Return to home
        </Button>
      </Link>
    </div>
  );
};
