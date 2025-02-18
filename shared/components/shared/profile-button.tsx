import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  onClickSighIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSighIn }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button onClick={onClickSighIn} variant="outline" className="flex items-center gap-1">
          <User size={16} />
          Log in
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            {session.user.image ? (
              <img src={session.user.image} className="size-8 rounded-2xl" />
            ) : (
              <CircleUser size={18} />
            )}
            {session.user.name}
          </Button>
        </Link>
      )}
    </div>
  );
};
