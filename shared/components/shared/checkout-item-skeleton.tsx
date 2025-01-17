import React from 'react';
import { Skeleton, SVGSkeleton } from './skeleton';

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 flex-1">
          <SVGSkeleton className="w-[60px] h-[60px]" />
          <div>
            <div className="flex items-center justify-between">
              <div className="flex-1 leading-6">
                <Skeleton className="w-[88px] max-w-full" />
              </div>
            </div>
            <div className="w-[90%]">
              <Skeleton className="w-[410px] max-w-full" />
            </div>
          </div>
        </div>
        <div>
          <Skeleton className="w-[40px] max-w-full" />
        </div>
        <div className="flex items-center gap-5 ml-20">
          <div className="inline-flex items-center justify-between gap-3">
            <div className="inline-flex items-center justify-center active:translate-y-[1px] transition-colors p-0 w-[30px] h-[30px]">
              <SVGSkeleton className="w-[24px] h-[24px]" />
            </div>
            <div>
              <Skeleton className="w-[14px] max-w-full" />
            </div>
            <div className="inline-flex items-center justify-center active:translate-y-[1px] transition-colors p-0 w-[30px] h-[30px]">
              <SVGSkeleton className="w-[24px] h-[24px]" />
            </div>
          </div>
          <div>
            <SVGSkeleton className="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
    </>
  );
};
