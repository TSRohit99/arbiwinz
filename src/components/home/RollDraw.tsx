
import { LucideDice1 } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useLottery } from '@/context/ContextProvider'
import toast from 'react-hot-toast';

function RollDraw() {
  const{cpLength, handleRollDraw} = useLottery();
  return (
    <div className="text-center mb-16 space-y-6">
    {/* Requirements Box */}
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-lg mx-auto backdrop-blur-sm">
      <div className="flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <p className="text-red-400 text-sm font-medium">
          Requirements to Roll Draw:
        </p>
      </div>
      <ul className="text-red-300/90 text-sm mt-2 space-y-1 text-justify ml-12">
        <li>• Connect your wallet first</li>
        <li>• Minimum 3 participants needed <br />
          {" "}Current Participants: {cpLength}</li>
        <li>• Any users can roll the draw</li>
      </ul>
    </div>

    {/* Roll Button */}
    <Button
    onClick={async ()=>{ 

      if(parseInt(cpLength) >=  3){
        await handleRollDraw();
       
      } else {
        toast.error("Not Enough Particpants yet!")
        return;
      }
      }}
      variant="outline"
      className="group relative inline-flex items-center justify-center gap-3 rounded-full p-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
    >
      <LucideDice1
        size={32}
        className="text-white transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce"
      />
      <span className="text-white text-xl font-semibold tracking-wide">
        Roll the Draw
      </span>
    </Button>
  </div>
  )
}

export default RollDraw