import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Balance = () => {
  const [balance, setBalance] = useState(1000); // Simulated wallet balance
  const [transactions, setTransactions] = useState([
    { id: 1, type: "incoming", amount: 200, from: "0x123...789" },
    { id: 2, type: "outgoing", amount: 100, to: "0x456...321" },
  ]); // Sample transactions
  const [isMinting, setIsMinting] = useState(false); // Minting state
  const navigate = useNavigate();

  // Handle minting
  const handleMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      const mintedAmount = 500;
      setBalance((prevBalance) => prevBalance + mintedAmount);
      toast.success(`${mintedAmount} tokens minted successfully!`, {
        position: "bottom-right",
        className: "toast-success",
        autoClose: 5000,
      });
      setIsMinting(false);
    }, 2000);
  };

  // Display transactions
  const displayTransactions = () => {
    transactions.forEach((transaction) => {
      const message =
        transaction.type === "incoming"
          ? `Incoming: +${transaction.amount} tokens from ${transaction.from}`
          : `Outgoing: -${transaction.amount} tokens to ${transaction.to}`;
      toast.info(message, {
        position: "bottom-right",
        autoClose: 5000,
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-animation relative">
      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10"></div>

      {/* Content Section */}
      <div className="z-10 text-center text-white px-6 lg:px-12 max-w-4xl w-full">
        {/* Page Header */}
        <h1 className="text-4xl lg:text-5xl font-bold tracking-wide mb-4">
          Token <span className="text-teal-400">Balance</span>
        </h1>
        <p className="text-lg lg:text-xl font-medium mb-6">
          View your token balance and transaction history in real-time.
        </p>

        {/* Wallet Balance */}
        <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg mb-10">
          <p className="text-lg lg:text-xl font-medium">
            Current Wallet Balance:{" "}
            <span className="text-teal-400 font-semibold">{balance} Tokens</span>
          </p>
        </div>

        {/* Mint Tokens */}
        <div className="mb-10">
          <button
            onClick={handleMint}
            disabled={isMinting}
            className={`py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition-all ${
              isMinting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-400 text-white"
            }`}
          >
            {isMinting ? "Minting..." : "Mint Tokens"}
          </button>
        </div>

        {/* Display Transactions */}
        <div className="mb-10">
          <button
            onClick={displayTransactions}
            className="py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Show Transaction History
          </button>
        </div>

        {/* Back to Home Button */}
        <div>
          <button
            onClick={() => navigate("/")} // Navigate back to the home page
            className="text-teal-400 hover:text-teal-600 flex items-center justify-center space-x-2 text-lg font-medium transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Toastr Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="z-50"
      />
    </div>
  );
};

export default Balance;
