"use client";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useLottery } from "@/context/ContextProvider";


const WinnersTable = () => {
  const { winnerStats, currentRollId } = useLottery();
  
  const reversedStats = [...(winnerStats || [])].reverse();

  // Ranking icons and colors for top 3 positions
  const getRankingIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return `#${position}`;
    }
  };

  return (
    <Card className="bg-blue-900/20 border-blue-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy size={20} className="text-blue-400" />
          Latest Winners (RollID : {parseInt(currentRollId.toString())-1})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-blue-500/20">
              <TableHead className="text-blue-200">Rank</TableHead>
              <TableHead className="text-blue-200">Address</TableHead>
              <TableHead className="text-blue-200">Prize</TableHead>
              <TableHead className="text-blue-200">Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reversedStats && reversedStats.length > 0 ? (
              reversedStats.map((winner, index) => {
                const position = index + 1;
                return (
                  <TableRow key={index} className="border-blue-500/20">
                    <TableCell className="text-white">
                      <div className="flex items-center justify-center">
                        {getRankingIcon(position)}
                      </div>
                    </TableCell>
                    <TableCell className="text-white">
                      {winner?.address?.slice(0, 4)}...{winner?.address?.slice(-4)}
                    </TableCell>
                    <TableCell className="text-blue-400">{winner.reward} ETH</TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                      >
                        <a
                          href={`https://arbiscan.io/tx/${winner.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-2 py-1"
                        >
                          Click Here
                        </a>
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-white">
                  No winners yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WinnersTable;