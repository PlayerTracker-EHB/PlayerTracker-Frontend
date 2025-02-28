import { createFileRoute } from "@tanstack/react-router";
import {
  Trophy,
  Home,
  MapPin,
  ArrowLeft,
  Download,
  Calendar,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGames } from "@/lib/api/games";
import { useAuthStore } from "@/store/authStore";
import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Définition de la route
export const Route = createFileRoute("/_auth/statistics/$matchId")({
  component: MatchStats,
});

function MatchStats() {
  const { matchId } = Route.useParams();
  const { user } = useAuthStore();
  const { data: games } = useSuspenseQuery(getGames);
  const navigate = useNavigate();

  const matches = games.map((game) => ({
    id: String(game.gameId),
    date: game.gameDate,
    ourCoach: user ? user.team.coachName : "Unknown Coach",
    ourTeam: user ? user.team.clubName : "Unknown Team",
    ourScore: game.atHome ? game.homeTeamScore : game.awayTeamScore,
    opponentScore: game.atHome ? game.awayTeamScore : game.homeTeamScore,
    opponent: game.adversaryName,
    isHome: game.atHome,
    possession: game.possession || 50,
    passAccuracy: game.passAccuracy || 80,
    heatmapOurTeam: "/teama_heatmap.png",
    heatmapOpponent: "/teamb_heatmap.png",
  }));

  const match = matches.find((m) => m.id === matchId);
  const [isPdfExporting, setIsPdfExporting] = useState(false);

  const handleExportPdf = () => {
    if (!match) return;

    // Déclencher l'état de chargement
    setIsPdfExporting(true);

    // Laisser le temps à React de re‐rendre l’UI avant de lancer l’export
    setTimeout(() => {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.addImage("/logo.png", "PNG", pageWidth - 25, 5, 15, 15);
      pdf.setFontSize(18);
      pdf.text("Match Statistics", 20, 20);

      // Match Info
      pdf.setFontSize(14);
      pdf.text("Match Info", 20, 28);
      autoTable(pdf, {
        startY: 36,
        margin: { left: 20 },
        head: [["Date", "Coach", "Match Type"]],
        body: [
          [
            new Date(match.date).toLocaleDateString(),
            match.ourCoach,
            match.isHome ? "Home" : "Away",
          ],
        ],
        theme: "grid",
        styles: { fontSize: 12, cellPadding: 2 },
        headStyles: { fillColor: [10, 150, 130], textColor: 255 },
      });

      // Statistics
      pdf.setFontSize(14);
      pdf.text("Statistics", 20, 68);
      autoTable(pdf, {
        startY: 74,
        margin: { left: 20 },
        head: [["Team", "Score", "Possession", "Pass Accuracy"]],
        body: [
          [
            match.ourTeam,
            String(match.ourScore),
            `${match.possession}%`,
            `${match.passAccuracy}%`,
          ],
          [
            match.opponent,
            String(match.opponentScore),
            `${100 - match.possession}%`,
            `${100 - match.passAccuracy}%`,
          ],
        ],
        theme: "grid",
        styles: { fontSize: 12, cellPadding: 2 },
        headStyles: { fillColor: [10, 150, 130], textColor: 255 },
      });

      // Heatmaps
      pdf.setFontSize(14);
      pdf.text("Heatmaps", 20, 110);

      // Première heatmap
      pdf.addImage(match.heatmapOurTeam, "PNG", 20, 115, 170, 70);
      pdf.text(`${match.ourTeam} Heatmap`, 20, 190);

      // Seconde heatmap
      pdf.addImage(match.heatmapOpponent, "PNG", 20, 200, 170, 70);
      pdf.text(`${match.opponent} Heatmap`, 20, 275);

      // Sauvegarde
      pdf.save("match_statistics.pdf");

      // Fin d'export
      setIsPdfExporting(false);
    }, 0);
  };

  return (
    <div className="max-h-screen w-full bg-gray-50">
      <header className="bg-white shadow-sm relative">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center">
          <button
            onClick={() => navigate({ to: "/statistics" })}
            className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-800" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Match Statistics</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {match ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-slate-300" />
                  <span>{new Date(match.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {match.isHome ? (
                    <>
                      <Home className="h-5 w-5 text-slate-300" />
                      <span>Home Match</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-5 w-5 text-slate-300" />
                      <span>Away Match</span>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-slate-300" />
                  <span>Coach: {match.ourCoach}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  {match.ourTeam}
                </h2>
                <div className="text-5xl font-bold text-gray-800">
                  {match.ourScore} - {match.opponentScore}
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {match.opponent}
                </h2>
              </div>
            </div>

            <div className="px-6 py-8 border-b border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Match Statistics
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{match.possession}%</span>
                  <span className="text-gray-600">Possession</span>
                  <span>{100 - match.possession}%</span>
                </div>
                <div className="h-2 flex rounded-full overflow-hidden">
                  <div
                    className="bg-blue-400"
                    style={{ width: `${match.possession}%` }}
                  ></div>
                  <div
                    className="bg-red-400"
                    style={{ width: `${100 - match.possession}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{match.passAccuracy}%</span>
                  <span className="text-gray-600">Pass Accuracy</span>
                  <span>{100 - match.passAccuracy}%</span>
                </div>
                <div className="h-2 flex rounded-full overflow-hidden">
                  <div
                    className="bg-blue-400"
                    style={{ width: `${match.passAccuracy}%` }}
                  ></div>
                  <div
                    className="bg-red-400"
                    style={{ width: `${100 - match.passAccuracy}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="px-6 py-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Possession Heatmaps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-48 bg-blue-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {match?.heatmapOurTeam ? (
                    <img
                      src={match.heatmapOurTeam}
                      alt="Our Team Heatmap"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600">No Heatmap Available</span>
                  )}
                </div>
                <div className="h-48 bg-red-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {match?.heatmapOpponent ? (
                    <img
                      src={match.heatmapOpponent}
                      alt="Opponent Heatmap"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600">No Heatmap Available</span>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-8 flex justify-center border-t border-gray-100">
              <button
                onClick={handleExportPdf}
                disabled={isPdfExporting}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium ${
                  isPdfExporting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-slate-700 hover:bg-slate-800 transition-colors"
                }`}
              >
                {isPdfExporting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Export as PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Match non trouvé</p>
        )}
      </main>
    </div>
  );
}

export default MatchStats;
