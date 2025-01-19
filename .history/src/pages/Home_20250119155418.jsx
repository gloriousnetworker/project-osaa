import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const Home = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access from MetaMask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Set the connected account
        setAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);

        // Fetch balance after account is connected
        await fetchBalance(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  // Function to fetch balance of the connected account
  const fetchBalance = async (accountAddress) => {
    if (window.ethereum) {
      try {
        // Use JsonRpcProvider instead of Web3Provider
        const provider = new ethers.JsonRpcProvider(window.ethereum);
        const balanceBigInt = await provider.getBalance(accountAddress);
        const balanceInEth = ethers.formatEther(balanceBigInt);
        setBalance(balanceInEth);
        console.log("Account balance:", balanceInEth);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  // Automatically fetch balance if account is set
  useEffect(() => {
    if (account) {
      console.log("Fetching balance for:", account);
      fetchBalance(account);
    }
  }, [account]); // Trigger fetchBalance when account changes

  // Function to copy address to clipboard
  const copyToClipboard = () => {
    if (account) {
      navigator.clipboard.writeText(account).then(
        () => {
          alert("Address copied to clipboard!");
        },
        (err) => {
          alert("Failed to copy address: " + err);
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-animation relative">
      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-5"></div>

      {/* Content Section */}
      <div className="z-10 text-center text-white px-6 sm:px-8 lg:px-12">
        {/* Display account address and balance above the welcome message */}
        {account && balance !== null && (
          <div className="mb-6 sm:mb-8">
            <div className="text-sm sm:text-lg font-medium">
              <strong>Wallet Address:</strong>{" "}
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
            <button
              onClick={copyToClipboard}
              className="mt-2 bg-gray-800 text-white py-2 px-4 rounded-lg text-sm sm:text-lg font-semibold"
            >
              Copy Address
            </button>
            <p className="text-sm sm:text-lg font-medium">
              <strong>Balance:</strong> {balance} ETH
            </p>
          </div>
        )}

        {/* App Name */}
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-wide mb-4 sm:mb-6">
          Welcome to <span className="text-blue-400">Project OSAA</span>
        </h1>

        {/* Description with Typing Animation */}
        <p className="text-base sm:text-lg lg:text-2xl font-medium max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="typing-effect">
            Seamlessly interact with blockchain technology. Mint tokens, transfer tokens, and view real-time balances with ease, all in one platform.
          </span>
        </p>

        {/* Feature Buttons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <a
            href="/mint"
            className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Mint Tokens
          </a>
          <a
            href="/transfer"
            className="bg-gradient-to-r from-green-500 to-lime-400 hover:from-lime-400 hover:to-green-500 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Transfer Tokens
          </a>
          <a
            href="/balance"
            className="bg-gradient-to-r from-purple-500 to-indigo-400 hover:from-indigo-400 hover:to-purple-500 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            View Balances
          </a>
        </div>

        {/* Wallet Integration Section */}
        <div className="mt-8 sm:mt-12">
          <p className="text-base sm:text-lg lg:text-xl font-semibold">
            Connect your wallet and dive into the world of blockchain!
          </p>
          <button
            onClick={connectWallet} // Trigger connectWallet function
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 sm:py-3 px-8 sm:px-10 rounded-lg text-sm sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all"
          >
            {account ? "Connected" : "Connect Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
