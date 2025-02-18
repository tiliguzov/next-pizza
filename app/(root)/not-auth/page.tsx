import { InfoBlock } from '@/shared/components';

export default function UnathorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Access is forbidden"
        text="This page might be only saw by authrized users"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
