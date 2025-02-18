'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from '.';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastSuccessMessage = '';
    let toastErrorMessage = '';

    if (searchParams.has('paid')) {
      toastSuccessMessage = 'Order is paid! The information is send to email.';
    } else if (searchParams.has('cancelled')) {
      toastErrorMessage = 'Order is not paid! Return to checkout page and try again.';
    }

    if (searchParams.has('verified')) {
      toastSuccessMessage = 'Email is successfully confirmed!';
    }

    if (toastSuccessMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastSuccessMessage, {
          duration: 3000,
        });
      }, 1000);
    }

    if (toastErrorMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.error(toastErrorMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left part*/}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3"> It couldn't be tastier</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right part*/}
        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSighIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
