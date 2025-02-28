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
  id: number;
  date: Date;
  ourScore: number;
  opponentScore: number;
  ourTeam: string;
  opponent: string;
  isHome: boolean;
}

interface GraphicProps {
  matches: MatchData[];
}

function Graphic({ matches }: GraphicProps) {
  const chartData = matches.map((m) => ({
    date: new Date(m.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    goalDiff: m.ourScore - m.opponentScore,
    goals: m.ourScore,
    opponent: m.opponent, // On stocke le nom d'adversaire
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Goal Trends</h2>
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
                // Récupérer l'adversaire
                const opp = payload[0].payload.opponent;
                // Concaténer date + adversaire
                return `${label} - Against ${opp}`;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="goalDiff"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Goal Difference"
            />
            <Line
              type="monotone"
              dataKey="goals"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Goals Scored"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphic;
