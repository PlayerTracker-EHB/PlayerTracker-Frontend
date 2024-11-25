import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Uploader() {
  const [players, setPlayers] = useState([{ name: "", number: "" }]);
  const [matchDetails, setMatchDetails] = useState({
    date: "",
    homeAway: "home",
    opponent: "",
    color1: "#000000",
    color2: "#ffffff",
  });
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // Pour gérer le loading
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false); // Pour activer le bouton Submit

  const navigate = useNavigate(); // Hook pour la navigation

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value,
    };
    setPlayers(updatedPlayers);
  };

  const handleMatchDetailsChange = (field: string, value: string) => {
    setMatchDetails({
      ...matchDetails,
      [field]: value,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file)); // Prévisualisation
      setIsProcessing(true); // Commence à traiter après upload
      setIsReadyToSubmit(false); // Empêche le submit tant que le traitement n'est pas fini
    }
  };

  const handleAddPlayer = () => {
    setPlayers([...players, { name: "", number: "" }]);
  };

  const handleRemovePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  const handleSubmit = () => {
    console.log("Players:", players);
    console.log("Match Details:", matchDetails);
    console.log("Uploaded Video:", video);
    alert("Form submitted! Redirecting to statistics...");
    navigate("/statistics"); // Redirection vers la page Statistics
  };

  // Simule un temps de traitement pour l'IA après l'upload de la vidéo
  useEffect(() => {
    if (isProcessing) {
      const timer = setTimeout(() => {
        setIsProcessing(false); // Fin du traitement
        setIsReadyToSubmit(true); // Active le bouton Submit
      }, 5000); // Simule 5 secondes de traitement

      return () => clearTimeout(timer); // Nettoie le timeout en cas de nouveau chargement
    }
  }, [isProcessing]);

  return (
    <div className="w-screen min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Upload Match Details</h1>

      <p className="text-lg mb-6 text-black">
        The place where the team's DNA takes shape
      </p>
      {/* Players Section */}
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Players</h2>
        {players.map((player, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder={`Player ${index + 1}`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
              value={player.name}
              onChange={(e) =>
                handlePlayerChange(index, "name", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Number"
              className="w-20 px-4 py-2 border border-gray-300 rounded"
              value={player.number}
              onChange={(e) =>
                handlePlayerChange(index, "number", e.target.value)
              }
            />
            <button
              onClick={() => handleRemovePlayer(index)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={handleAddPlayer}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Player
        </button>
      </div>

      {/* Match Details */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mb-8">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Date</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded"
            value={matchDetails.date}
            onChange={(e) => handleMatchDetailsChange("date", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Home / Away</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded"
            value={matchDetails.homeAway}
            onChange={(e) =>
              handleMatchDetailsChange("homeAway", e.target.value)
            }
          >
            <option value="home">Home</option>
            <option value="away">Away</option>
          </select>
        </div>

        <div className="flex flex-col col-span-2">
          <label className="font-semibold mb-2">
            Team Colors (used for AI recognition)
          </label>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <label className="text-sm mb-1">Color 1</label>
              <input
                type="color"
                className="w-16 h-10"
                value={matchDetails.color1}
                onChange={(e) =>
                  handleMatchDetailsChange("color1", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-sm mb-1">Color 2</label>
              <input
                type="color"
                className="w-16 h-10"
                value={matchDetails.color2}
                onChange={(e) =>
                  handleMatchDetailsChange("color2", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Upload */}
      <div className="flex flex-col items-center w-full max-w-4xl mb-8">
        <label className="font-semibold mb-2">Upload Video</label>
        <input
          type="file"
          accept="video/*"
          className="px-4 py-2 border border-gray-300 rounded"
          onChange={handleFileUpload}
        />
        {videoPreview && (
          <video
            className="mt-4 rounded shadow"
            controls
            src={videoPreview}
            width="600"
          >
            Your browser does not support the video tag.
          </video>
        )}
        {isProcessing && (
          <div className="w-full mt-4">
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse w-full"></div>
            </div>
            <p className="text-blue-600 mt-2 text-center">
              Processing video...
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isReadyToSubmit}
        className={`px-6 py-2 rounded ${
          isReadyToSubmit
            ? "bg-blue-500 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Submit
      </button>
    </div>
  );
}
