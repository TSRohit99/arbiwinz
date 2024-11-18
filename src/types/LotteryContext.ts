export interface LotteryContextType {
    isInitialized: boolean;
    isConnected?: boolean;
    poolValue: string;
    cpLength: string;
    LOTTERY_ADDRESS: string;
    entryFee: string;
    userAddress?: string | null;
    depositStats: any[] | null;
    winnerStats : any[] | null;
    currentRollId: number;
    loading: boolean;
    error: string | null;
    handleDeposit: () => Promise<void>;
    handleRollDraw: () => Promise<void>;
  }
  
