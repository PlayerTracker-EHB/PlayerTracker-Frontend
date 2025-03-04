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
import { useQuery } from "@tanstack/react-query"; // Ensure this function is correctly imported
import { getPossessionTrend } from "@/lib/api/stats";
import useAuthStore from "@/store/authStore";


function Graphic2() {
  const user = useAuthStore().user;
  const teamId = user?.teamId as number;
  const { data: matches, isLoading, isError } = useQuery(getPossessionTrend(teamId));

  if (isLoading) return <p>Loading possession trends...</p>;
  if (isError) return <p>Error fetching possession trends.</p>;

  // Transform data for chart
  const chartData = matches?.map((m) => ({
    date: new Date(m.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    opponent: m.opponent,
    possession: m.possession ?? 0,
  })) || [];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-10">
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
                return `${label} - Against ${payload[0].payload.opponent}`;
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
