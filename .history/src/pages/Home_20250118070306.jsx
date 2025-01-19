import React from "react";
import "./Home.css"; // CSS file for animations

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-animation relative">
      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-5"></div>

      {/* Content Section */}
      <div className="z-10 text-center text-white px-4 lg:px-8">
        {/* App Name */}
        <h1 className="text-6xl lg:text-7xl font-bold tracking-wide mb-6">
          Welcome to <span className="text-blue-400">Project OSAA</span>
        </h1>

        {/* Description with Typing Animation */}
        <p className="text-lg lg:text-2xl font-medium max-w-3xl mx-auto mb-10 typing-effect">
          Seamlessly interact with blockchain technology. Mint tokens, transfer
          tokens, and view real-time balances with ease, all in one platform.
        </p>

        {/* Feature Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="/mint"
            className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Mint Tokens
          </a>
          <a
            href="/transfer"
            className="bg-gradient-to-r from-green-500 to-lime-400 hover:from-lime-400 hover:to-green-500 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Transfer Tokens
          </a>
          <a
            href="/balance"
            className="bg-gradient-to-r from-purple-500 to-indigo-400 hover:from-indigo-400 hover:to-purple-500 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            View Balances
          </a>
        </div>

        {/* Wallet Integration Section */}
        <div className="mt-12">
          <p className="text-lg lg:text-xl font-semibold">
            Connect your wallet and dive into the world of blockchain!
          </p>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-3 px-10 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
