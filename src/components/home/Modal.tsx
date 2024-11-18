import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { changeNetworkToArbitrumOne } from "@/contract/utils/ContractUtils";
import toast from "react-hot-toast";

interface modal {
    isOpen : boolean;
    onClose : ()=> void;
}

const ArbitrumNetworkModal : React.FC<modal> = ({isOpen,onClose}) => {
  const handleChangeNetwork = async () => {
    // Implement network change logic here
    console.log("Changing network to Arbitrum");
    try {
        const res = await changeNetworkToArbitrumOne()
        if(res){
            toast.success("Successfully chnaged the network!")
            onClose();
        }
    } catch (error) {
        console.error("Error at modal" , error)
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-[#011D48] text-white p-8 rounded-lg shadow-xl">
        <div className="text-center">
          <DialogHeader>
            <span className="text-white font-extrabold">
              Arbi
              <span className="font-extrabold bg-gradient-to-r from-blue-500 to-blue-300 0 text-transparent bg-clip-text">
                Winz{" "}
              </span>
            </span>
            <DialogTitle className="text-2xl font-bold">
              Welcome to ArbiWinz
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-base mb-6 mt-2">
            Metamask detected! You should switch to the Arbitrum network to use this app.
          </DialogDescription>
          <Button
            onClick={handleChangeNetwork}
            className="w-full bg-[#4A90E2] hover:bg-[#3D78C8] text-white font-medium py-3 px-6 rounded"
          >
            Change to Arbitrum
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArbitrumNetworkModal;
