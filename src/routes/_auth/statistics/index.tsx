import { useState } from "react";
import { motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import Graphic from "@/components/statistics/Graphic";
import Graphic2 from "@/components/statistics/Graphic2";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGames } from "@/lib/api/games";
import { useAuthStore } from "@/store/authStore";
import MatchCard from "@/components/statistics/MatchCard";

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
    status: game.gameStatus,
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
          {games
            .slice()
            .sort((a, b) => new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime())
            .map((game, idx) => (
              <MatchCard
                key={game.gameId}
                game={game}
                isMostRecent={game.gameId === mostRecentMatchId}
                idx={idx}
              />
            ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-between items-center mb-12"
      >
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 font-semibold rounded ${currentPage === 1
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
          className={`px-4 py-2 font-semibold rounded ${currentPage === totalPages
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
        <Graphic2/>
      </motion.div>
    </motion.div>
  );
}

export default Statistics;
