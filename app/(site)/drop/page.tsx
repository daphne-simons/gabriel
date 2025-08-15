import { Suspense } from 'react';
import { DropPortal } from '../components/DropPortal';

export default function DropPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      }>
        <DropPortal />
      </Suspense>
    </div>
  );
}