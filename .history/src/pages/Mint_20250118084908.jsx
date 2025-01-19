import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Use React Router's navigation

const MintTokens = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const navigate = useNavigate(); // For navigation back to the dashboard

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // Simulate minting logic (replace with actual blockchain logic)
    if (amount > 0 && recipient) {
      // Successful minting
      toast.success("Tokens successfully minted!", {
        position: "bottom-right",
        className: "toast-success",
        bodyClassName: "toast-body",
        autoClose: 5000,
      });

      // Reset form fields after a short delay
      setTimeout(() => {
        setAmount("");
        setRecipient("");
      }, 5000);
    } else {
      // Failure
      toast.error("Failed to mint tokens. Check your inputs.", {
        position: "bottom-right",
        className: "toast-error",
        bodyClassName: "toast-body",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-animation relative">
      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10"></div>

      {/* Content Section */}
      <div className="z-10 text-center text-white px-6 lg:px-12 max-w-4xl w-full">
        {/* Page Header */}
        <h1 className="text-4xl lg:text-5xl font-bold tracking-wide mb-4">
          Mint <span className="text-blue-400">Tokens</span>
        </h1>
        <p className="text-lg lg:text-xl font-medium mb-10">
          Securely mint tokens as the authorized owner of the blockchain contract.
        </p>

        {/* Mint Form */}
        <form
          className="bg-black bg-opacity-60 p-6 lg:p-10 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          {/* Token Amount */}
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block text-left text-sm font-medium mb-2"
            >
              Token Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full py-3 px-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter token amount to mint"
              required
            />
          </div>

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
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full py-3 px-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter recipient wallet address"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Mint Tokens
          </button>
        </form>

        {/* Notes Section */}
        <p className="mt-8 text-sm text-gray-400">
          * This action is restricted to authorized users only.
        </p>
      </div>

      {/* Back to Dashboard */}
      <div className="mt-10 z-10 text-center">
        <button
          onClick={() => navigate("/")} // Use navigate for navigation
          className="text-blue-400 hover:text-blue-600 flex items-center justify-center space-x-2 text-lg font-medium transition"
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
          <span>Back to Dashboard</span>
        </button>
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

export default MintTokens;
