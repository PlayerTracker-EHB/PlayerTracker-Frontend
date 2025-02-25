import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React from "react";
import { Trophy, Home, MapPin, Repeat, Timer, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Définition de la route
export const Route = createFileRoute("/_auth/MatchStats")({
  component: MatchStats,
});

function MatchStats() {
  const matchData = {
    team: "Manchester City",
    opponent: "Liverpool FC",
    date: "March 15, 2024",
    isHome: true,
    score: {
      team: 3,
      opponent: 1,
    },
    stats: {
      possession: {
        team: 65,
        opponent: 35,
      },
      passes: {
        team: 547,
        opponent: 324,
      },
    },
  };

  const result =
    matchData.score.team > matchData.score.opponent
      ? "Victory"
      : matchData.score.team === matchData.score.opponent
        ? "Draw"
        : "Defeat";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-y-0 left-1/3 w-1/3 bg-gradient-to-b from-sky-100/50 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute inset-y-0 right-1/3 w-1/3 bg-gradient-to-b from-indigo-100/50 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-200">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Match Header */}
          <motion.div
            className="animate-slide-in bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-40 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-8">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center mix-blend-overlay"></div>
              <div className="relative flex justify-between items-start">
                <div className="text-white">
                  <h1 className="text-5xl font-bold tracking-tight">
                    {matchData.team}
                  </h1>
                  <div className="mt-2 flex items-center text-sky-100 space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>Premier League</span>
                  </div>
                </div>
                <div className="text-right text-white">
                  <p className="text-xl font-medium">{matchData.date}</p>
                  <div className="flex items-center justify-end mt-2 text-sky-100">
                    {matchData.isHome ? (
                      <>
                        <Home className="w-5 h-5" />
                        <span className="ml-2">Home</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-5 h-5" />
                        <span className="ml-2">Away</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Score Section */}
            <div className="relative -mt-10 mx-8 mt-20 mb-10">
              <div className="glass-effect rounded-2xl p-8 shadow-lg">
                <div className="flex justify-center items-center">
                  <div className="flex items-center space-x-8">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {matchData.team}
                      </p>
                      <p className="text-6xl font-bold text-blue-600 text-center">
                        {matchData.score.team}
                      </p>
                    </div>
                    <div className="text-4xl font-light text-gray-300">vs</div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {matchData.opponent}
                      </p>
                      <p className="text-6xl font-bold text-gray-400 text-center">
                        {matchData.score.opponent}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <div
                    className={`px-8 py-4 rounded-full font-medium text-lg ${
                      result === "Victory"
                        ? "bg-green-100 text-green-800"
                        : result === "Defeat"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {result}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="lg:grid-cols-3 gap-8">
            {/* Key Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6 mb-10">
              {/* Possession */}
              <motion.div
                className="animate-slide-in stat-card bg-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Timer className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">
                      Possession
                    </h3>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {matchData.stats.possession.team}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 stat-bar"
                    style={{ width: `${matchData.stats.possession.team}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-gray-500 text-right">
                  Opponent: {matchData.stats.possession.opponent}%
                </div>
              </motion.div>

              {/* Passes */}
              <motion.div
                className="animate-slide-in stat-card bg-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Repeat className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">
                      Passes
                    </h3>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {matchData.stats.passes.team}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 stat-bar"
                    style={{
                      width: `${(matchData.stats.passes.team / (matchData.stats.passes.team + matchData.stats.passes.opponent)) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-gray-500 text-right">
                  Opponent: {matchData.stats.passes.opponent}
                </div>
              </motion.div>
            </div>

            {/* Heatmaps */}
            <motion.div
              className="animate-slide-in bg-white rounded-2xl shadow-xl overflow-hidden lg:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">
                  Match Heatmaps
                </h2>
                <p className="text-gray-500 mt-1">Team's influence zones</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {/* First Heatmap */}
                <div className="relative aspect-square">
                  <img
                    src="teama_heatmap.png"
                    alt="Match heatmap"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-yellow-500/20 to-blue-500/30 mix-blend-multiply"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-medium">
                      Dominant Area: Attacking Third
                    </p>
                    <p className="text-white/80 text-sm mt-1">
                      High pressure in opponent's half
                    </p>
                  </div>
                </div>

                {/* Second Heatmap */}
                <div className="relative aspect-square">
                  <img
                    src="teamb_heatmap.png"
                    alt="Match heatmap"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-yellow-500/20 to-blue-500/30 mix-blend-multiply"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-medium">
                      Dominant Area: Defensive Third
                    </p>
                    <p className="text-white/80 text-sm mt-1">
                      Strong defense in our half
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Export PDF Button */}
          <div className="flex justify-center mt-10">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchStats;
