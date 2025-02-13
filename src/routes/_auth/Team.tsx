import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { Trash2, UserPlus, Upload } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlayers, PlayerType } from "@/lib/api/player";

export const Route = createFileRoute("/_auth/Team")({
  component: Team,
});

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  number: string;
}

function Team() {
  const [clubName, setClubName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [logo, setLogo] = useState<string | null>(null);
  const [players, setPlayers] = useState<PlayerType[]>([]);

  // Use the useSuspenseQuery hook at the top level
  const playerQuery = useSuspenseQuery(getPlayers);
  const fetchedPlayers = playerQuery.data;

  useEffect(() => {
    setPlayers(fetchedPlayers); // Set players when data is fetched
  }, [fetchedPlayers]);

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

  const addPlayer = () => {
    // const newPlayer: Player = {
    //   id: crypto.randomUUID(),
    //   firstName: "",
    //   lastName: "",
    //   number: "",
    // };
    // setPlayers([...players, newPlayer]);
  };

  const updatePlayer = (id: number, field: keyof Player, value: string) => {
    setPlayers(
      players.map((player) =>
        player.playerId === id ? { ...player, [field]: value } : player
      )
    );
  };

  const deletePlayer = (id: number) => {
    setPlayers(players.filter((player) => player.playerId !== id));
  };

  const handleSave = () => {
    console.log({
      clubName,
      coachName,
      primaryColor,
      secondaryColor,
      logo,
      players,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Team Manager
        </h1>

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

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Players</h2>
            <button
              onClick={addPlayer}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add Player
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player) => (
              <div
                key={player.playerId}
                className="bg-gray-50 rounded-lg p-4 relative"
              >
                <button
                  onClick={() => deletePlayer(player.playerId)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-center">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={player.firstName}
                      onChange={(e) =>
                        updatePlayer(player.playerId, "firstName", e.target.value)
                      }
                      className="mt-1 mx-auto block w-3/4 rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-center">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={player.lastName}
                      onChange={(e) =>
                        updatePlayer(player.playerId, "lastName", e.target.value)
                      }
                      className="mt-1 mx-auto block w-3/4 rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-center"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="block text-sm font-medium text-gray-700 text-center">
                      Number
                    </label>
                    <div className="mt-2 w-24 h-24 flex items-center justify-center rounded-full border-4 border-gray-300 bg-white shadow-sm">
                      <input
                        type="text"
                        value={player.firstName}
                        onChange={(e) =>
                          updatePlayer(player.playerId, "number", e.target.value)
                        }
                        className="w-full h-full text-3xl font-bold text-center rounded-full border-none focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
          >
            Save Team
          </button>
        </div>
      </div>
    </div>
  );
}

export default Team;
