import { useState } from "react";
import { motion } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import Graphic from "@/components/statistics/Graphic";
import Graphic2 from "@/components/statistics/Graphic2";
import { Trophy, Minus, X, BarChart3, Home, Plane } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGames } from "@/lib/api/games";
import { useAuthStore } from "@/store/authStore";

export const Route = createFileRoute("/_auth/statistics/")({
  component: Statistics,
});

function Statistics() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { data: games } = useSuspenseQuery(getGames);
  const user = useAuthStore().user;

  const matches = games.map((game) => ({
    id: game.gameId,
    date: game.gameDate,
    ourTeam: user && user.team ? user.team.clubName : "Unknown Team",
    ourScore: game.atHome ? game.homeTeamScore : game.awayTeamScore,
    opponentScore: game.atHome ? game.awayTeamScore : game.homeTeamScore,
    opponent: game.adversaryName,
    isHome: game.atHome,
  }));

  const mostRecentMatchId =
    matches.length > 0
      ? matches.reduce((latest, match) =>
          new Date(match.date) > new Date(latest.date) ? match : latest
        ).id
      : null;

  const stats = {
    wins: matches.filter((m) => m.ourScore > m.opponentScore).length,
    draws: matches.filter((m) => m.ourScore === m.opponentScore).length,
    losses: matches.filter((m) => m.ourScore < m.opponentScore).length,
    goalDifference: matches.reduce(
      (acc, m) => acc + (m.ourScore - m.opponentScore),
      0
    ),
  };

  const winPercentage = (stats.wins / matches.length) * 100;

  const getMatchOutcome = (ourScore: number, opponentScore: number) => {
    if (ourScore > opponentScore)
      return { type: "win", icon: Trophy, color: "text-emerald-500" };
    if (ourScore === opponentScore)
      return { type: "draw", icon: Minus, color: "text-blue-500" };
    return { type: "loss", icon: X, color: "text-red-500" };
  };

  const sortedMatches = matches.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedMatches.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(matches.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 p-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Team Statistics
        </h1>
        <p className="text-xl text-gray-600">
          Match History and Performance Analytics
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md overflow-hidden mb-12"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recent Matches
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {currentItems.map((match, idx) => {
            const outcome = getMatchOutcome(
              match.ourScore,
              match.opponentScore
            );
            const OutcomeIcon = outcome.icon;
            const isMostRecent = match.id === mostRecentMatchId; // Vérifie si c'est le plus récent

            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-6">
                  <div className="flex flex-col items-center w-24">
                    <div className="text-sm font-medium text-gray-500">
                      {new Date(match.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center space-x-1">
                      {match.isHome ? (
                        <Home className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Plane className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-500">
                        {match.isHome ? "Home" : "Away"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900 w-32">
                      {match.ourTeam}
                    </span>
                    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
                      <span className="font-semibold text-gray-900 text-lg">
                        {match.ourScore}
                      </span>
                      <span className="text-gray-400">-</span>
                      <span className="font-semibold text-gray-900 text-lg">
                        {match.opponentScore}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 w-32">
                      {match.opponent}
                    </span>
                  </div>

                  <div className={`flex items-center ${outcome.color}`}>
                    <OutcomeIcon className="h-5 w-5 mr-1.5" />
                    <span className="capitalize font-medium">
                      {outcome.type}
                    </span>
                  </div>

                  {/* ✅ Badge "RECENT" ajouté uniquement sur le match le plus récent */}
                  {isMostRecent && (
                    <div className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded">
                      RECENT
                    </div>
                  )}
                </div>

                <Link
                  to="/statistics/$matchId"
                  params={{ matchId: match.id.toString() }}
                >
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Match Stats
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      ;
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-between items-center mb-12"
      >
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 font-semibold rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 font-semibold rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-md p-8 text-center"
        >
          <div className="text-3xl font-bold text-emerald-600 mb-3">
            {winPercentage.toFixed(1)}%
          </div>
          <div className="text-gray-600 text-lg">Win Rate</div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-md p-8 text-center"
        >
          <div className="text-3xl font-bold text-blue-600 mb-3">
            {stats.goalDifference > 0 ? "+" : ""}
            {stats.goalDifference}
          </div>
          <div className="text-gray-600 text-lg">Goal Difference</div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-md p-8 text-center"
        >
          <div className="text-3xl font-bold text-purple-600 mb-3">
            {stats.wins} - {stats.draws} - {stats.losses}
          </div>
          <div className="text-gray-600 text-lg">W - D - L</div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Graphic matches={matches} />
        <Graphic2 matches={matches} />
      </motion.div>
    </motion.div>
  );
}

export default Statistics;
