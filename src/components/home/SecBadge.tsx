import React from 'react';

import { Shield } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

const SecBadge = () => {
  return (
    <Alert className="mb-8 bg-blue-900/50 border-blue-500/50">
            <Shield className="h-5 w-5 -mt-1.5 text-blue-400" />
            <AlertDescription className="text-blue-100">
              Guaranteed Fair Play: Powered by <a href="https://docs.chain.link/vrf" target="_blank" rel="noopener noreferrer"> <span className='font-bold '>Chainlink VRF</span> </a> for verifiable
              random outcomes
            </AlertDescription>
          </Alert>

  );
};

export default SecBadge;