import React from "react";
import { Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLottery } from "@/context/ContextProvider";

const Navbar = () => {
  const { handleDeposit } = useLottery();

  return (
    <nav className="backdrop-blur-md bg-blue-950/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 md:ml-6">
          <Sparkles className="text-blue-400 w-8 h-6 md:h-8" />
          <span className="text-white font-extrabold text-2xl md:text-3xl">
            Arbi
            <span className="font-extrabold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Winz{" "}
            </span>{" "}
          </span>
        </div>
        <Button
          onClick={async () => {
            await handleDeposit();
          }}
          variant="outline"
          className="md:mr-8 md:mt-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none hover:from-blue-600 hover:to-blue-700"
        >
          <Wallet size={20} className="mr-2" />
          Connect Wallet
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
