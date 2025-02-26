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

export const Route = createFileRoute("/_auth/_admin/admin/Team")({
  component: Team,
});

function Team() {
  const auth = useAuthStore()
  const team = auth.user?.team
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
      auth.fetchUser()

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
          Team Manager
        </h1>

        {/* Team info block */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-6">
            {/* Info section */}
            <div className="flex-grow space-y-6">
              {/* Club Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Club Name
                </label>
                <div className="flex items-center space-x-4 mt-2">
                  <input
                    type="text"
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter club name"
                  />
                </div>
              </div>

              {/* Coach Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Coach Name
                </label>
                <div className="flex items-center space-x-4 mt-2">
                  <input
                    type="text"
                    value={coachName}
                    onChange={(e) => setCoachName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter coach name"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>

        {/* Players block */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Players</h2>
            <AddPlayerDialog />
          </div>
          <PlayerTable
            players={players || []}
            onDeletePlayer={handleDeletePlayer}
          />
        </div>
      </div>
    </div>
  );
}

export default Team;

