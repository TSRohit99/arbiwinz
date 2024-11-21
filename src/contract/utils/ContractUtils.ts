import { ethers, EventLog } from 'ethers';
import { LOTTERY_ABI } from '@/contract/ContractABI';
import toast from 'react-hot-toast';
import axios from 'axios';
import { WinnerStats } from '@/types/WinnerStats';
import { BaseRes } from '@/types/BaseRes';

export const LOTTERY_ADDRESS = '0xFbcF67B034Fbd73F0a5E2e9c6e01249E84AD7d7d';

let lotteryContract: ethers.Contract | null = null;

const ARBITRUM_MAINNET_RPC = "https://arb1.arbitrum.io/rpc";

export async function checkIfItsArbitrumone(){
  if(!(typeof window !== "undefined" && window.ethereum)){
    return true; // for devices wirh no MM
  }
  else if (typeof window !== "undefined" && window.ethereum && window.ethereum.chainId.toString() == "0xa4b1" ){
    return true;
  }
  return false;
}

export async function changeNetworkToArbitrumOne() {
  try {
    // Check if the user has MetaMask or another compatible wallet provider
    if (typeof window.ethereum !== 'undefined') {
      // Request access to the user's wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the current provider
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Switch the network to Arbitrum One
      await provider.send('wallet_switchEthereumChain', [{ chainId: '0xA4B1' }]);

      return true;
    } else {
      console.error('No compatible wallet provider found');
      return false;
    }
  } catch (error) {
    console.error('Error changing network to Arbitrum One:', error);
    return false;
  }
}

export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum  && window.ethereum.chainId.toString() == "0xa4b1" ) {
    return new ethers.BrowserProvider(window.ethereum);
  } else {
    return new ethers.JsonRpcProvider(ARBITRUM_MAINNET_RPC);
  }
};

export const initContract = () => {
    const provider = getProvider();
    lotteryContract = new ethers.Contract(LOTTERY_ADDRESS, LOTTERY_ABI, provider);
};

// Helper function to ensure the contract is initialized
export const getContract = (): ethers.Contract => {
  if (!lotteryContract) {
    initContract();
  }
  return lotteryContract as ethers.Contract;
};




export async function connectAndFund() : Promise<BaseRes | null> {
  try {
      // Initialize provider and signer
      const provider = getProvider();
      const signer = await provider.getSigner();

      // Request wallet connection
      await provider.send("eth_requestAccounts", []);
      const addr = await signer.getAddress();
      console.log("Connected wallet:", addr);

      // Check if the network is Arbitrum Mainnet
      const network = await provider.getNetwork();
      const arbitrumMainnetChainId = 42161;

      if (network.chainId.toString() !== arbitrumMainnetChainId.toString()) {
          // Prompt user to switch to Arbitrum
          await provider.send("wallet_switchEthereumChain", [{ chainId: ethers.toQuantity(arbitrumMainnetChainId) }]);
          console.log("Switched to Arbitrum Mainnet");
      } else {
          console.log("Already on Arbitrum Mainnet");
      }

      const amountWei = ethers.parseEther(await getMinEth());
        const tx = { to: LOTTERY_ADDRESS, value: amountWei };
        const transaction = await signer.sendTransaction(tx);
        


      // Wait for confirmation
      const receipt = await transaction.wait();
      console.log("Transaction confirmed:", receipt);
      return {
        address : addr,
        amount : ethers.formatUnits(amountWei, 18),
        txHash : receipt?.hash,

      }
      
  } catch (error) {
      console.error("Error in connecting or funding:", error);
      return null;
  }
}



export const getBalance = async (): Promise<any> => {
  try {
    const provider = getProvider();
    const balance = await provider.getBalance(LOTTERY_ADDRESS);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error fetching contract balance:', error);
    return null;
  }
};

export const getMinEth = async (): Promise<any> => {
  try {
    const contract = getContract();
    const minEntry = await contract.getFunction('getMinEthAmount').call(null); 
    return ethers.formatEther(minEntry);
  } catch (error) {
    console.error('Error fetching getMinEth balance:', error);
    return null;
  }
};

export const getRollID = async (): Promise<any> => {
  try {
    const contract = getContract();
    const rollId = await contract.getFunction("getTotalRolls").call(null);
    return rollId;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getCurrentParticipantsLength = async (): Promise<any> => {
  try {
    const contract = getContract();
    const cp = await contract.getFunction("getCurrentParticipants").call(null);
    const length = cp.length.toString();
    return length;
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Contract read functions
export const getDepositStats = async (): Promise<BaseRes[] | []> => {
  try {
    const contract = getContract();
    const rollId = await getRollID();
    const filter = contract.filters.DepositReceived(null, null, null);
    const events = await contract.queryFilter(filter);
    const filteredEvents = events.filter((event) => {
      const typedEvent = event as EventLog; // Casting to EventLog for access to `args`
      return typedEvent.args?.rollId === rollId; // Ensure the rollId matches the one passed
    });
    
    return filteredEvents.map((event : any) => {
      const typedEvent = event as EventLog; // Casting to EventLog for access to `args`
      return {
        address: typedEvent.args?.sender,
        amount: ethers.formatEther(typedEvent.args?.amount),
        txHash: typedEvent.transactionHash,
      };
    });
  } catch (error) {
    console.error('Error fetching deposit events:', error);
    return [];
  }
};
// Fetching internal transaction logs for winners (internal logs)



export const getLatestWinnerStats = async () : Promise<WinnerStats[] | null> => {
  const CONTRACT_ADDRESS = LOTTERY_ADDRESS;
  const ARBISCAN_API_KEY = process.env.NEXT_PUBLIC_ARBISCAN_API_KEY;
  
  try {
    // First, get internal transactions
    const response = await axios.get('https://api.arbiscan.io/api', {
      params: {
        module: 'account',
        action: 'txlistinternal',
        address: CONTRACT_ADDRESS,
        apikey: ARBISCAN_API_KEY,
        sort: 'desc'
      }
    });

    if (response.data.status !== '1' || !response.data) {
      console.log('No records Found. Failed to fetch events from Arbiscan');
      return null;
    }

    const simplifiedTransactions = response.data.result
      .slice(1, 4)
      .map((tx: any) => ({
        txHash: tx.hash,
        address: tx.to,
        reward: ethers.formatEther(tx.value) // Convert from wei to ether
      }));

    return simplifiedTransactions;

  } catch (error) {
    console.error('Error fetching lottery events:', error);
    return null;
}
};

// Function to deposit funds to the contract

export const rollDraw = async (): Promise<any> => {
  try {
    const provider = getProvider();
    const signer = await provider.getSigner(); 
    const contract = getContract().connect(signer);
    const response = await contract.getFunction("rollDraw").call(null);
    return response;
  } catch (error) {
    toast.error("COuldnt roll the draw")
    console.error('Error rolling draw:', error);
    return null;
  }
};
