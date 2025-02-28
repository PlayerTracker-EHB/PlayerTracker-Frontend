import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MatchData {
  id: number | string;
  date: Date | string;
  ourScore: number;
  opponentScore: number;
  opponent: string;
  isHome: boolean;
  possession?: number;
}

interface GraphicProps {
  matches: MatchData[];
}

function Graphic2({ matches }: GraphicProps) {
  // On génère les données pour le graphique
  const chartData = matches.map((m) => ({
    date: new Date(m.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    opponent: m.opponent,
    // la possession
    possession: m.possession ?? 0,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Possession Trends
      </h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              labelFormatter={(label, payload) => {
                if (!payload || !payload.length) return label;
                // On récupère le nom de l’adversaire
                const opp = payload[0].payload.opponent;
                // On concatène date + adversaire
                return `${label} - Against ${opp}`;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="possession"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Possession (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphic2;
