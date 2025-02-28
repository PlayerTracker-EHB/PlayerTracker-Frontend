import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// Import our queries/mutations
import { getPlayers, deletePlayer } from "@/lib/api/player";
import { AddPlayerDialog } from "@/components/team/AddPlayerDialog";
import { PlayerTable } from "@/components/team/PlayerTable";
import { Team as teamType, updateTeam } from "@/lib/api/team";
import useAuthStore from "@/store/authStore";
import { toast } from "@/hooks/use-toast";
import { User } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_auth/_admin/admin/Team")({
  component: Team,
});

function Team() {
  const auth = useAuthStore();
  const team = auth.user?.team;
  const [clubName, setClubName] = useState(team?.clubName || "");
  const [coachName, setCoachName] = useState(team?.coachName || "");

  // Query Client from React Query
  const queryClient = useQueryClient();

  // Fetch the players with useSuspenseQuery
  const { data: players } = useSuspenseQuery(getPlayers);

  const updateTeamMutation = useMutation({
    mutationFn: (vars: { updatedData: Partial<teamType> }) =>
      updateTeam.mutationFn(vars.updatedData),

    onSuccess: () => {
      // Invalidate the cached list of players so the UI refreshes
      queryClient.invalidateQueries({ queryKey: [updateTeam.mutationKey] });
      auth.fetchUser();

      // Show a success toast
      toast({
        title: "Team Updated",
        description: `Team was successfully updated.`,
      });
    },
  });

  // Delete Player Mutation
  const deletePlayerMutation = useMutation({
    mutationFn: deletePlayer.mutationFn,
    onSuccess: () => {
      // Re-fetch after deleting
      queryClient.invalidateQueries({ queryKey: [deletePlayer.mutationKey] });
    },
  });

  // DELETE a player
  const handleDeletePlayer = (id: number) => {
    deletePlayerMutation.mutate(id);
  };

  // Handle save button click
  const handleSave = () => {
    const updatedData = {
      teamId: team?.teamId,
      clubName,
      coachName,
    };
    updateTeamMutation.mutate({ updatedData });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Account
        </h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section d'infos de l'équipe */}
          <motion.div
            className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-lg p-8 mt-60"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold flex items-center mb-6">
              <User className="h-6 w-6 text-blue-500 mr-2" /> Team Information
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Club Name"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Coach Name"
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <motion.button
                onClick={handleSave}
                className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>

          {/* Liste des joueurs sous forme de cartes */}
          <motion.div
            className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-lg p-8 mt-60"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <User className="h-6 w-6 text-green-500 mr-2" /> Players
              </h2>
              <AddPlayerDialog />
            </div>

            <PlayerTable
              players={players || []}
              onDeletePlayer={handleDeletePlayer}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Team;
