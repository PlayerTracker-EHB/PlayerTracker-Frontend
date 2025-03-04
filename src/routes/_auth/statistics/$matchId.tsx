import { createFileRoute } from "@tanstack/react-router";
import {
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
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "@/hooks/use-toast";
import { getStats } from "@/lib/api/stats";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/utils";

export const Route = createFileRoute("/_auth/statistics/$matchId")({
  component: MatchStats,
});

function MatchStats() {
  const { matchId } = Route.useParams();
  const { user } = useAuthStore();
  const { data: games } = useSuspenseQuery(getGames);
  const navigate = useNavigate();

  const { data: stats } = useSuspenseQuery(getStats(+matchId));

  const matches = games.map((game) => ({
    id: String(game.gameId),
    date: game.gameDate,
    ourCoach: user ? user.team.coachName : "Unknown Coach",
    ourTeam: user ? user.team.clubName : "Unknown Team",
    ourScore: game.atHome ? game.homeTeamScore : game.awayTeamScore,
    opponentScore: game.atHome ? game.awayTeamScore : game.homeTeamScore,
    opponent: game.adversaryName,
    isHome: game.atHome,
    Ourpossession: game.startsLeft ? stats.possessionTeamA : stats.possessionTeamB,
    Opponentpossession: game.startsLeft ? stats.possessionTeamB : stats.possessionTeamA,
    passAccuracy: 80,
    heatmapOurTeam: game.startsLeft ? stats.heatmapTeamA : stats.heatmapTeamB,
    heatmapOpponent: game.startsLeft ? stats.heatmapTeamB : stats.heatmapTeamA,
  }));

  const match = matches.find((m) => m.id === matchId);
  const [isPdfExporting, setIsPdfExporting] = useState(false);

  const handleExportPdf = () => {
    if (!match) return;
    setIsPdfExporting(true);

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
            `${match.Ourpossession}%`,
            `${match.passAccuracy}%`,
          ],
          [
            match.opponent,
            String(match.opponentScore),
            `${match.Opponentpossession}%`,
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

      pdf.save("match_statistics.pdf");
      toast({
        title: "PDF Exported",
        description: "The match statistics PDF has been successfully saved!",
      });

      setIsPdfExporting(false);
    }, 0);
  };

  if (!match) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-500 text-xl">Match non trouvé</p>
      </motion.div>
    );
  }


  const downloadVideo = () => {
    const matchId = match.id;

    const url = getBaseUrl(`/download/processed_video/` + matchId);

    console.log(url);

    fetch(url, {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        return response.blob(); // Assuming the response is a video file
      }
      throw new Error('Network response was not ok.');
    })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `processed_video_${matchId}.mp4`; // Change the extension as needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };


  return (
    <motion.div
      className="min-h-screen w-full bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        className="bg-white shadow-sm relative"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center">
          <motion.button
            onClick={() => navigate({ to: "/statistics" })}
            className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5 text-gray-800" />
          </motion.button>
          <h1 className="text-3xl font-bold text-gray-800">Match Statistics</h1>
        </div>
      </motion.header>

      <motion.main
        className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
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
          </motion.div>

          <motion.div
            className="p-6 border-b border-gray-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
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
          </motion.div>

          <motion.div
            className="px-6 py-8 border-b border-gray-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Match Statistics
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>{match.Ourpossession}%</span>
                <span className="text-gray-600">Possession</span>
                <span>{match.Opponentpossession}%</span>
              </div>
              <div className="h-2 flex rounded-full overflow-hidden">
                <div
                  className="bg-blue-400"
                  style={{ width: `${stats.possessionTeamA}%` }}
                ></div>
                <div
                  className="bg-red-400"
                  style={{ width: `${100 - stats.possessionTeamA}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="px-6 py-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Possession Heatmaps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-48 bg-blue-200 rounded-lg flex items-center justify-center overflow-hidden">
                {match.heatmapOurTeam ? (
                  <img
                    src={`http://10.2.160.40:9000/heatmaps/${match.heatmapOurTeam}`}
                    alt="Our Team Heatmap"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600">No Heatmap Available</span>
                )}
              </div>
              <div className="h-48 bg-red-200 rounded-lg flex items-center justify-center overflow-hidden">
                {match.heatmapOpponent ? (
                  <img
                    src={`http://10.2.160.40:9000/heatmaps/${match.heatmapOpponent}`}
                    alt="Opponent Heatmap"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600">No Heatmap Available</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-yellow-300"></span>
                <span className="text-sm text-gray-700">Ball</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-blue-700"></span>
                <span className="text-sm text-gray-700">Our Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
                <span className="text-sm text-gray-700">Opponent</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="px-6 py-8 flex justify-center border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              onClick={handleExportPdf}
              disabled={isPdfExporting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium ${isPdfExporting
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
            </motion.button>

            <Button
              onClick={downloadVideo}
            >
              Download Processed video
            </Button>
          </motion.div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}

export default MatchStats;
