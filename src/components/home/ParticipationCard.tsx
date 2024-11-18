"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Info, Check, Copy } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useLottery } from "@/context/ContextProvider";
import toast from "react-hot-toast";

const ParticipationCard = () => {
  const [copied, setCopied] = useState(false);

  const { LOTTERY_ADDRESS, entryFee, handleDeposit,currentRollId } = useLottery();
  const contractAddress = LOTTERY_ADDRESS;

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const trimAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  return (
    <Card className="max-w-3xl mx-auto mb-16 bg-blue-900/20 border-blue-500/20 backdrop-blur-sm">
  <CardHeader>
    <CardTitle className="text-2xl text-white text-center">
      Enter the Lottery
    </CardTitle>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mx-auto max-w-[90%] sm:max-w-none">
  {/* Minimum Entry */}
  <div className="bg-blue-950/40 rounded-full py-2 px-4 shadow-md">
    <span className="text-blue-200 text-sm sm:text-base">
      Minimum entry: {entryFee} ETH {" "}
    </span>


  {/* Info Tooltip */}

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info
            size={16}
            className="text-blue-400 hover:text-blue-300 transition-colors pt-1"
          />
        </TooltipTrigger>
        <TooltipContent className="bg-blue-950 border-blue-500/50 text-blue-100">
          <p>Protocol fees cover Chainlink VRF operations</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    </div>


  {/* Current RollId */}
  <div className="bg-blue-950/40 rounded-full py-2 px-4 shadow-md flex items-center gap-1 text-center">
    <span className="text-blue-200 text-sm sm:text-base">🎲 Current RollId:</span>
    <span className="text-blue-100 font-semibold text-sm sm:text-base">
      {currentRollId}
    </span>
  </div>
</div>

  </CardHeader>
  <CardContent className="space-y-6">
    <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/30 transition-colors">
      <p className="text-sm text-blue-300 mb-2">Contract Address:</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-white font-mono text-sm sm:text-base">
          <span className="hidden sm:inline">{contractAddress}</span>
          <span className="inline sm:hidden">
            {trimAddress(contractAddress)}
          </span>
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="hover:bg-blue-800/20 h-8 w-8 p-0"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-blue-400" />
          )}
        </Button>
      </div>
    </div>
    <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
      <p className="text-yellow-200 text-sm flex items-center gap-2">
        <span className="text-yellow-500 text-lg">⚠️</span>
        Directly send funds from your wallet to this address or
        connect your wallet to send!
      </p>
    </div>

    <Button 
      onClick={async ()=>{ await handleDeposit(); }}
      className="w-full py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-xl">
      Connect Wallet and Send
    </Button>
  </CardContent>
</Card>

  );
};

export default ParticipationCard;
