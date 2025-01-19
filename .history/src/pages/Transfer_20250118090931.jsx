import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TransferTokens = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(1000); // Simulated wallet balance
  const navigate = useNavigate();

  const handleTransfer = (e) => {
    e.preventDefault();

    // Check for valid inputs
    if (!recipient || amount <= 0 || amount > balance) {
      toast.error(
        !recipient
          ? "Please provide a valid recipient address!"
          : amount <= 0
          ? "Transfer amount must be greater than 0!"
          : "Insufficient balance for the transfer!",
        {
          position: "bottom-right",
          className: "toast-error",
          bodyClassName: "toast-body",
          autoClose: 5000,
        }
      );
      return;
    }

    // Simulate successful transfer
    toast.success(`Successfully transferred ${amount} tokens!`, {
      position: "bottom-right",
      className: "toast-success",
      bodyClassName: "toast-body",
      autoClose: 5000,
    });

    // Update balance after successful transfer
    setBalance((prevBalance) => prevBalance - amount);

    // Reset form fields
    setRecipient("");
    setAmount("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-animation relative">
      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10"></div>

      {/* Content Section */}
      <div className="z-10 text-center text-white px-6 lg:px-12 max-w-4xl w-full">
        {/* Page Header */}
        <h1 className="text-4xl lg:text-5xl font-bold tracking-wide mb-4">
          Transfer <span className="text-teal-400">Tokens</span>
        </h1>
        <p className="text-lg lg:text-xl font-medium mb-6">
          Safely and securely transfer your tokens to any address. Monitor your balance in real-time.
        </p>

        {/* Wallet Balance */}
        <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg mb-10">
          <p className="text-lg lg:text-xl font-medium">
            Wallet Balance:{" "}
            <span className="text-teal-400 font-semibold">{balance} Tokens</span>
          </p>
        </div>

        {/* Transfer Form */}
        <form
          className="bg-black bg-opacity-60 p-6 lg:p-10 rounded-lg shadow-lg"
          onSubmit={handleTransfer}
        >
          {/* Recipient Address */}
          <div className="mb-6">
            <label
              htmlFor="recipient"
              className="block text-left text-sm font-medium mb-2"
            >
              Recipient Address
            </label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full py-3 px-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="Enter recipient wallet address"
              required
            />
          </div>

          {/* Token Amount */}
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block text-left text-sm font-medium mb-2"
            >
              Transfer Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full py-3 px-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="Enter token amount to transfer"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-400 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Transfer Tokens
          </button>
        </form>

        {/* Back to Home Button */}
        <div className="mt-8">
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

export default Transfer;
