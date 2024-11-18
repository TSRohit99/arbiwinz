import useAnimatedBackground from '@/hooks/background';
import React from 'react';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { backgroundElements } = useAnimatedBackground();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 relative overflow-hidden">
      {backgroundElements}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;