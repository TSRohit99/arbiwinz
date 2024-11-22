"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  getProvider,
  initContract,
  connectAndFund,
  rollDraw,
  getBalance,
  getDepositStats,
  getLatestWinnerStats,
  LOTTERY_ADDRESS,
  getMinEth,
  getRollID,
  getCurrentParticipantsLength,
} from "../contract/utils/ContractUtils";
import toast from "react-hot-toast";
import { WinnerStats } from "@/types/WinnerStats";
import { LotteryContextType } from "@/types/LotteryContext";
import { useRouter } from "next/router";

const LotteryContext = createContext<LotteryContextType | undefined>(undefined);

export const LotteryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [poolValue, setPoolValue] = useState<string>("0");
  const [entryFee, setEntryFee] = useState<string>("0");
  const [cpLength, setCpLength] = useState<string>("0");
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [depositStats, setDepositStats] = useState<any[] | null>(null);
  const [winnerStats, setWinnerStats] = useState<WinnerStats[] | null>(null);
  const [currentRollId, setCurrentRollId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data
  const fetchData = async () => {
    console.log("fetching all data");
    try {
      const [poolBal, entryFee1, roll, depositStatsData, winnerStatsData, cpl] =
        await Promise.all([
          getBalance(),
          getMinEth(),
          getRollID(),
          getDepositStats(),
          getLatestWinnerStats(),
          getCurrentParticipantsLength(),
        ]);

      setPoolValue(poolBal);
      setEntryFee(entryFee1);
      setCurrentRollId(roll);
      setDepositStats(depositStatsData);
      setCpLength(cpl);
      setWinnerStats(winnerStatsData);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    }
  };

  // Initialize contract and fetch data on component mount
  useEffect(() => {
    const init = async () => {
      try {
        if (!isInitialized) {
          initContract();
          setIsInitialized(true);

          if (typeof window !== "undefined" && window.ethereum) {
            const provider = getProvider() as ethers.BrowserProvider;
            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
              setIsConnected(true);
              setUserAddress(accounts[0].address);
            }
          }
        }
      } catch (err) {
        setError("Failed to initialize lottery contract");
        console.error(err);
      }
    };

    init();
    fetchData();
  }, [isInitialized]);

  // Handle deposit
  const handleDeposit = async () => {
    try {
      setLoading(true);
      setError(null);
      const val = await connectAndFund();
      if (val?.txHash) {
        toast.success("You have successfully deposited!");
        setDepositStats((prevDepositStats) => [
          ...(prevDepositStats ?? []),
          val,
        ]);
        setCpLength((prev) =>
          prev != null && !isNaN(parseInt(prev))
            ? (parseInt(prev) + 1).toString()
            : "1"
        );
        setPoolValue((prev) =>
          (parseFloat(prev) + parseFloat(val.amount)).toString()
        );
      } else {
        toast.error("You need to confirm the transaction!");
      }
    } catch (err) {
      toast.error("Failed to make deposit");
      setError("Failed to make deposit");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle rollDraw and trigger data refresh
  const handleRollDraw = async () => {
    try {
      setLoading(true);
      setError(null);

      const toastId = toast.loading("Executing the rollDraw() function...", {
        duration: 12000,
      });

      const val = await rollDraw();
      if (val !== null) {
        toast.dismiss(toastId);
        toast.success("Draw rolled successfully!");

        toast.loading("Fetching updated stats...", {
          duration: 10000,
        });

        // Wait for blockchain state to update, then refresh data
        setTimeout(async () => {
          try {
            toast.success("Updated stats fetched successfully!");

            // Update deposit stats
            setDepositStats(null);
            setPoolValue((prev) =>
              (parseFloat(prev) - parseFloat(cpLength) * 0.0005).toString()
            );
            setCpLength("0");
            // Fetch and update winner stats
            const winners: WinnerStats[] | null = await getLatestWinnerStats();
            setWinnerStats(winners);
            setCurrentRollId((prev) => parseInt(prev.toString()) + 1);
          } catch (error) {
            console.error("Error updating stats:", error);
            toast.error("Failed to update stats.");
          }
        }, 10000);
      } else {
        console.error("rollDraw() returned null.");
      }
    } catch (err) {
      toast.error("Failed to roll draw");
      setError("Failed to roll draw");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isInitialized,
    isConnected,
    poolValue,
    LOTTERY_ADDRESS,
    userAddress,
    entryFee,
    cpLength,
    depositStats,
    winnerStats,
    currentRollId,
    loading,
    error,
    handleDeposit,
    handleRollDraw,
  };

  return (
    <LotteryContext.Provider value={value}>{children}</LotteryContext.Provider>
  );
};

export const useLottery = () => {
  const context = useContext(LotteryContext);
  if (context === undefined) {
    throw new Error("useLottery must be used within a LotteryProvider");
  }
  return context;
};
