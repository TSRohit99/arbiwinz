"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dices } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useLottery } from "@/context/ContextProvider";

const LotteryRolledTable =  () => {
    
  const { depositStats , currentRollId} = useLottery();
  const totalRolls = currentRollId != null && parseInt(currentRollId.toString()) === 0
  ? 1
  : currentRollId != null
  ? parseInt(currentRollId.toString()) - 1
  : 0; // Fallback in case currentRollId is null or undefined



  return (
    <Card className="bg-blue-900/20 border-blue-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Dices size={20} className="text-blue-400" />
          Total Lottery ROlled ({totalRolls})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-52 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-blue-500/20">
                <TableHead className="text-blue-200">Index</TableHead>
                <TableHead className="text-blue-200">Txn Hash</TableHead>
                <TableHead className="text-blue-200">Rewards</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {depositStats && depositStats.length > 0 ? (
                depositStats.map((participant, _index) => (
                  <TableRow key={_index} className="border-blue-500/20">
                    <TableCell className="text-white">{_index + 1}</TableCell>
                    <TableCell className="font-mono text-white">
                      {participant.address.slice(0, 4)}...{participant.address.slice(-4)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className="bg-green-500/20 text-green-400"
                      >
                        <a
                          href={`https://arbiscan.io/tx/${participant.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click Here
                        </a>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-white">
                    Loading the Roll Draws...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LotteryRolledTable;
