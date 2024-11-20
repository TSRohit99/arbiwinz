import React from "react";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa"; // Make sure to import FaGithub

const Footer = () => {
  return (
    <footer className="text-center text-blue-200 py-8 border-t border-blue-500/20">
      <p className="text-lg mb-2">
        An initiative by{" "}
        <span className="text-white font-extrabold">
          Arbi
          <span className="font-extrabold bg-gradient-to-r from-blue-500 to-blue-300 0 text-transparent bg-clip-text">
            Winz{" "}
          </span>
        </span>
        team.
      </p>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Badge variant="secondary" className="bg-blue-900/40 text-blue-200">
          <a
            href="https://arbitrum.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Arbitrum{" "}
          </a>
        </Badge>
        <Badge variant="secondary" className="bg-blue-900/40 text-blue-200">
          <a
            href="https://docs.chain.link/vrf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Secured by Chainlink VRF{" "}
          </a>
        </Badge>
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <a
          href="https://github.com/TSRohit99/arbiwinz" // Replace with your GitHub repo URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-200 hover:text-blue-500"
        >
          <FaGithub size={24} className="mr-2" />
          GitHub Documentation
        </a>
      </div>

      <p className="text-sm text-blue-300">
        This platform is a sister project of{" "}
        <a
          href="https://dbkash.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-xl font-extrabold text-[#1199fa]">
            d<span className="text-white">BKash</span>
          </span>
        </a>
        <br />
        Always verify smart contract addresses and interactions before
        participating.
      </p>
    </footer>
  );
};

export default Footer;
