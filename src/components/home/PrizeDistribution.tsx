
import React from "react";
import { Star, Medal, Award, DollarSign, Trophy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PrizeDistribution = () => (
  <Card className="max-w-3xl mx-auto mb-8 bg-blue-900/20 border-blue-500/20 backdrop-blur-sm animate-fadeIn">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Trophy size={20} className="text-blue-400" />
                Prize Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* First Place */}
                <div className="text-center p-4 bg-blue-950/30 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-800/40">
                  <Trophy size={24} className="text-yellow-400 mx-auto mb-2" />{" "}
                  {/* First Place Icon */}
                  <div className="text-2xl font-bold text-white mb-1">50%</div>
                  <div className="text-blue-200 text-sm">First Place</div>
                </div>

                {/* Second Place */}
                <div className="text-center p-4 bg-blue-950/30 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-800/40">
                  <Medal size={24} className="text-gray-400 mx-auto mb-2" />{" "}
                  {/* Second Place Icon */}
                  <div className="text-2xl font-bold text-white mb-1">20%</div>
                  <div className="text-blue-200 text-sm">Second Place</div>
                </div>

                {/* Third Place */}
                <div className="text-center p-4 bg-blue-950/30 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-800/40">
                  <Award size={24} className="text-orange-400 mx-auto mb-2" />{" "}
                  {/* Third Place Icon */}
                  <div className="text-2xl font-bold text-white mb-1">15%</div>
                  <div className="text-blue-200 text-sm">Third Place</div>
                </div>

                {/* Protocol Fee */}
                <div className="text-center p-4 bg-blue-950/30 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-800/40">
                  <DollarSign
                    size={24}
                    className="text-green-400 mx-auto mb-2"
                  />{" "}
                  {/* Protocol Fee Icon */}
                  <div className="text-2xl font-bold text-white mb-1">15%</div>
                  <div className="text-blue-200 text-sm">Protocol Fee</div>
                </div>
              </div>
            </CardContent>
          </Card>
);

export default PrizeDistribution;
