"use client";
import React, { useState, useEffect } from "react";
import MainContent from "@/components/layouts/MainContentLayout";
import Navbar from "@/components/home/Navbar";
import SecBadge from "@/components/home/SecBadge";
import PrizePool from "@/components/home/PrizePool";
import PrizeDistribution from "@/components/home/PrizeDistribution";
import RollDraw from "@/components/home/RollDraw";
import ParticipationCard from "@/components/home/ParticipationCard";
import TrustBadges from "@/components/home/TrustBadges";
import Footer from "@/components/home/Footer";
import StatsGrid from "@/components/home/StatsGrid";
import PageLayout from "@/components/layouts/PageLayout";
import { LotteryProvider } from "@/context/ContextProvider";
import { Toaster } from "react-hot-toast";
import ArbitrumNetworkModal from "@/components/home/Modal";
import { checkIfItsArbitrumone } from "@/contract/utils/ContractUtils";

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        const res = await checkIfItsArbitrumone();
        if (res) {
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error at Home", error);
      }
    };

    checkNetwork();
  }, []);

  return (
    <LotteryProvider>
      <ArbitrumNetworkModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
      <PageLayout>
        <Navbar />
        <MainContent>
          <SecBadge />
          <PrizePool />
          <PrizeDistribution />
          <ParticipationCard />
          <RollDraw />
          <StatsGrid />
          <TrustBadges />
          <Footer />
        </MainContent>
      </PageLayout>
    </LotteryProvider>
  );
};

export default Home;