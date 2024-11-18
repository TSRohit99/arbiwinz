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
import { Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useLottery } from "@/context/ContextProvider";

const ParticipantsTable = () => {
  const { depositStats } = useLottery();
  const{cpLength} = useLottery();

  return (
    <Card className="bg-blue-900/20 border-blue-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users size={20} className="text-blue-400" />
          Current Participants ({cpLength})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-52 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-blue-500/20">
                <TableHead className="text-blue-200">Index</TableHead>
                <TableHead className="text-blue-200">Address</TableHead>
                <TableHead className="text-blue-200">Deposited</TableHead>
                <TableHead className="text-blue-200">Txn</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {depositStats && depositStats.length > 0 ? (
                depositStats.map((participant, _index) => (
                  <TableRow key={_index} className="border-blue-500/20">
                    <TableCell className="text-white">{_index + 1}</TableCell>
                    <TableCell className="font-mono text-white">
                      {participant?.address?.slice(0, 4)}...{participant?.address?.slice(-4)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className="bg-green-500/20 text-green-400"
                      >
                        {participant.amount}
                      </Badge>
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
                    No participants yet
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

export default ParticipantsTable;
