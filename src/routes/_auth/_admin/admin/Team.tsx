import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload } from "lucide-react";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// Import our queries/mutations
import { getPlayers, deletePlayer } from "@/lib/api/player";
import { AddPlayerDialog } from "@/components/team/AddPlayerDialog";
import { PlayerTable } from "@/components/team/PlayerTable";

export const Route = createFileRoute("/_auth/_admin/admin/Team")({
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
      queryClient.invalidateQueries({ queryKey: ["players"] });
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
        {/* Team info block */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-6">
            {/* Logo section */}
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
                  {/* Icon button */}
                  <button
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-300"
                    title="Mettre à jour"
                  >
                    {/* Crayon icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 2l7 7-9 9H5v-7l9-9z"
                      />
                    </svg>
                  </button>
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
                  {/* Icon button */}
                  <button
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-300"
                    title="Mettre à jour"
                  >
                    {/* Crayon icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 2l7 7-9 9H5v-7l9-9z"
                      />
                    </svg>
                  </button>
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
