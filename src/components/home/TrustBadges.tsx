import React from "react";
import { Shield, Lock, Zap, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const TrustBadges = () => {
  const badges = [
    {
      Icon: BadgeCheck,
      title: "Verified SC",
      description: "Open Sourced Smart Contract",
      animationDelay: "delay-0"
    },
    {
      Icon: Shield,
      title: "100% Fair",
      description: "Powered by Chainlink VRF",
      animationDelay: "delay-0"
    },
    {
      Icon: Lock,
      title: "Secure",
      description: "Built on Arbitrum Network",
      animationDelay: "delay-150"
    },
    {
      Icon: Zap,
      title: "Fast",
      description: "Instant Payouts",
      animationDelay: "delay-300"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {badges.map(({ Icon, title, description, animationDelay }, index) => (
        <Card 
          key={index}
          className={`
            bg-blue-900/20 border-blue-500/20 backdrop-blur-sm 
            group relative overflow-hidden
            hover:scale-105 hover:bg-blue-800/30
            transform transition-all duration-300 ease-in-out
            ${animationDelay}
            hover:shadow-lg hover:shadow-blue-500/20
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          
          <CardContent className="pt-6 text-center relative">
            <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
              <Icon className="w-12 h-12 text-blue-400 mx-auto mb-4 
                             group-hover:text-blue-300 
                             transition-all duration-300 ease-in-out" />
            </div>
            
            <div className="relative inline-block">
              <h3 className="text-lg font-semibold text-white mb-2 
                           group-hover:text-blue-100
                           transition-colors duration-300">
                {title}
              </h3>
              <div className="absolute bottom-0 left-0 w-full h-0.5 
                           bg-blue-400 scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300" />
            </div>
            
            <p className="text-blue-200 group-hover:text-blue-100 
                         transition-colors duration-300">
              {description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TrustBadges;