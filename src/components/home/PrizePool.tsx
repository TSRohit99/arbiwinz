
import { useLottery } from "@/context/ContextProvider";
import React from "react";

const PrizePool = () => {
  const { 
    poolValue
  } = useLottery();

  return(
  <div className="text-center mb-12 relative px-4">
            {/* Glowing background */}
            <div className="absolute inset-0 -top-20 bg-blue-500/10 blur-[100px] rounded-full" />

            {/* Main content */}
            <div className="relative">
              <div className="inline-block">
                <p className="text-blue-200/80 text-lg font-medium mb-2">
                  Current Prize Pool
                </p>

                <h1 className="text-5xl sm:text-6xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-white text-transparent bg-clip-text">
                    {parseFloat(poolValue).toFixed(10)} ETH
                  </span>
                </h1>

                {/* Live indicator */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-blue-300/80 text-sm">
                    Live Ethereum prize pool
                  </span>
                </div>

                <p className="text-blue-100 text-xl font-medium mb-2">
                  Join now and become the next big winner!
                </p>

                <p className="text-blue-300/80 text-sm max-w-md mx-auto">
                  Winners are selected randomly using <a href="https://docs.chain.link/vrf" target="_blank" rel="noopener noreferrer">Chainlink VRF technology</a>.
                   Do not miss your chance to win big in this secure and fair crypto lottery!</p>
              </div>
            </div>
          </div>
  )
};

export default PrizePool;
