import { Game } from "@/lib/api/games";
import useAuthStore from "@/store/authStore";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart3, Home, Minus, Plane, Trophy, X } from "lucide-react";

interface MatchCardProps {
  game: Game;
  isMostRecent: boolean;
  idx: number;
}


function MatchCard({ game, isMostRecent, idx }: MatchCardProps) {
  const user = useAuthStore().user;



  const match = {
    id: game.gameId,
    date: game.gameDate,
    ourTeam: user && user.team ? user.team.clubName : "Unknown Team",
    ourScore: game.atHome ? game.homeTeamScore : game.awayTeamScore,
    opponentScore: game.atHome ? game.awayTeamScore : game.homeTeamScore,
    opponent: game.adversaryName,
    isHome: game.atHome,
    status: game.gameStatus,
  };

  const getMatchOutcome = (ourScore: number, opponentScore: number) => {
    if (ourScore > opponentScore)
      return { type: "win", icon: Trophy, color: "text-emerald-500" };
    if (ourScore === opponentScore)
      return { type: "draw", icon: Minus, color: "text-blue-500" };
    return { type: "loss", icon: X, color: "text-red-500" };
  };

  const outcome = getMatchOutcome(
    match.ourScore,
    match.opponentScore
  );
  const OutcomeIcon = outcome.icon;

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
}

export default MatchCard;
