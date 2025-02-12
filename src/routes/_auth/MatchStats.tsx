import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React from "react";
import {
  Trophy,
  Users,
  Timer,
  Activity,
  Target,
  Percent,
  ArrowLeft,
  Swords,
  Shield,
  Crosshair,
} from "lucide-react";

export const Route = createFileRoute("/_auth/MatchStats")({
  component: MatchStats,
});

function StatComparison({
  label,
  teamA,
  teamB,
}: {
  label: string;
  teamA: number;
  teamB: number;
}) {
  const total = teamA + teamB;
  const percentageA = (teamA / total) * 100;
  const percentageB = (teamB / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium">{teamA}</span>
        <span className="text-gray-500">{label}</span>
        <span className="font-medium">{teamB}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
        <div className="bg-blue-500" style={{ width: `${percentageA}%` }} />
        <div className="bg-red-500" style={{ width: `${percentageB}%` }} />
      </div>
    </div>
  );
}

function PlayerStats({
  player,
  team,
}: {
  player: {
    name: string;
    kills: number;
    deaths: number;
    assists: number;
    rating: number;
  };
  team: "A" | "B";
}) {
  return (
    <div
      className={`flex items-center justify-between p-3 ${team === "A" ? "bg-blue-50" : "bg-red-50"} rounded-lg mb-2`}
    >
      <div className="flex items-center space-x-4">
        <span className="font-medium">{player.name}</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="text-sm">
          <span className="font-medium">{player.kills}</span>
          <span className="text-gray-500">/</span>
          <span className="font-medium">{player.deaths}</span>
          <span className="text-gray-500">/</span>
          <span className="font-medium">{player.assists}</span>
        </div>
        <div
          className={`font-medium ${player.rating >= 1.0 ? "text-green-600" : "text-red-600"}`}
        >
          {player.rating.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

function MatchStats() {
  const navigate = useNavigate();
  const matchData = {
    date: "March 15, 2024",
    map: "Inferno",
    duration: "47:22",
    teamA: {
      name: "Ninjas in Pyjamas",
      score: 16,
      players: [
        { name: "REZ", kills: 25, deaths: 18, assists: 4, rating: 1.32 },
        { name: "headtr1ck", kills: 22, deaths: 16, assists: 5, rating: 1.28 },
        { name: "k0nfig", kills: 20, deaths: 17, assists: 3, rating: 1.15 },
        { name: "Brollan", kills: 18, deaths: 19, assists: 6, rating: 1.05 },
        { name: "hampus", kills: 15, deaths: 20, assists: 8, rating: 0.89 },
      ],
    },
    teamB: {
      name: "ENCE",
      score: 13,
      players: [
        { name: "dycha", kills: 23, deaths: 19, assists: 3, rating: 1.18 },
        { name: "goofy", kills: 21, deaths: 20, assists: 4, rating: 1.12 },
        { name: "SunPayus", kills: 17, deaths: 18, assists: 5, rating: 0.95 },
        { name: "Snappi", kills: 15, deaths: 21, assists: 6, rating: 0.82 },
        { name: "NertZ", kills: 14, deaths: 22, assists: 4, rating: 0.76 },
      ],
    },
    statistics: {
      firstHalfScore: "8-7",
      secondHalfScore: "8-6",
      teamAStats: {
        kills: 100,
        headshots: 45,
        assists: 26,
        flashAssists: 12,
        utilityDamage: 324,
        adr: 75.8,
      },
      teamBStats: {
        kills: 90,
        headshots: 38,
        assists: 22,
        flashAssists: 8,
        utilityDamage: 298,
        adr: 70.2,
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate({ to: "/Statistics" })}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Match Details
              </h1>
              <p className="text-sm text-gray-500">
                {matchData.date} • {matchData.map}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold text-blue-600">
                {matchData.teamA.name}
              </h2>
              <p className="text-4xl font-bold mt-2">{matchData.teamA.score}</p>
            </div>
            <div className="text-center px-8">
              <div className="text-sm font-medium text-gray-500 mb-2">
                MATCH DURATION
              </div>
              <div className="text-lg font-medium">{matchData.duration}</div>
              <div className="text-sm text-gray-500 mt-2">
                ({matchData.statistics.firstHalfScore} •{" "}
                {matchData.statistics.secondHalfScore})
              </div>
            </div>
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold text-red-600">
                {matchData.teamB.name}
              </h2>
              <p className="text-4xl font-bold mt-2">{matchData.teamB.score}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Combat Statistics</h3>
              <StatComparison
                label="Total Kills"
                teamA={matchData.statistics.teamAStats.kills}
                teamB={matchData.statistics.teamBStats.kills}
              />
              <StatComparison
                label="Headshots"
                teamA={matchData.statistics.teamAStats.headshots}
                teamB={matchData.statistics.teamBStats.headshots}
              />
              <StatComparison
                label="Assists"
                teamA={matchData.statistics.teamAStats.assists}
                teamB={matchData.statistics.teamBStats.assists}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Utility Impact</h3>
              <StatComparison
                label="Flash Assists"
                teamA={matchData.statistics.teamAStats.flashAssists}
                teamB={matchData.statistics.teamBStats.flashAssists}
              />
              <StatComparison
                label="Utility Damage"
                teamA={matchData.statistics.teamAStats.utilityDamage}
                teamB={matchData.statistics.teamBStats.utilityDamage}
              />
              <StatComparison
                label="ADR"
                teamA={Math.round(matchData.statistics.teamAStats.adr)}
                teamB={Math.round(matchData.statistics.teamBStats.adr)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">
              {matchData.teamA.name}
            </h3>
            <div className="space-y-2">
              {matchData.teamA.players.map((player) => (
                <PlayerStats key={player.name} player={player} team="A" />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              {matchData.teamB.name}
            </h3>
            <div className="space-y-2">
              {matchData.teamB.players.map((player) => (
                <PlayerStats key={player.name} player={player} team="B" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MatchStats;
