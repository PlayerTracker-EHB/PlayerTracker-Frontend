import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Import our queries/mutations
import { getPlayers, deletePlayer } from "@/lib/api/player";
import { AddPlayerDialog } from "@/components/team/AddPlayerDialog";
import { PlayerTable } from "@/components/team/PlayerTable";

export const Route = createFileRoute("/_auth/Team")({
  component: Team,
});

function Team() {
  const [clubName, setClubName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [logo, setLogo] = useState<string | null>(null);

  // Query Client from React Query
  const queryClient = useQueryClient();

  // Fetch the players with useSuspenseQuery
  const { data: players } = useSuspenseQuery(getPlayers);


  // Delete Player Mutation
  const deletePlayerMutation = useMutation({
    mutationFn: deletePlayer.mutationFn,
    onSuccess: () => {
      // Re-fetch after deleting
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });

  // Handle image upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  // DELETE a player
  const handleDeletePlayer = (id: number) => {
    deletePlayerMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Team Manager
        </h1>

        {/* Team info block */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {logo ? (
                  <img
                    src={logo}
                    alt="Club logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <label className="mt-2 cursor-pointer text-sm text-blue-600 hover:text-blue-500">
                      Upload Logo
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Club Name
                </label>
                <input
                  type="text"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter club name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Coach Name
                </label>
                <input
                  type="text"
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter coach name"
                />
              </div>

              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="mt-1 h-10 w-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="mt-1 h-10 w-20"
                  />
                </div>
              </div>
            </div>
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

