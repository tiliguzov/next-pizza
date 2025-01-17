interface Props {
  className?: string;
}

const Skeleton: React.FC<Props> = ({ className }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-muted leading-none">
      ‌
    </span>
    <br />
  </div>
);

const SVGSkeleton: React.FC<Props> = ({ className }) => (
  <svg className={className + ' animate-pulse rounded bg-muted'} />
);

export { Skeleton, SVGSkeleton };
