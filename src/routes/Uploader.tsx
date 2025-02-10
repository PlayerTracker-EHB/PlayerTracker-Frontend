import { useState, useEffect, useRef } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { CloudUpload } from 'lucide-react'
import { useNavigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Uploader')({
  component: Uploader,
})

function Uploader() {
  const [players, setPlayers] = useState([{ name: '', number: '' }])
  const [matchDetails, setMatchDetails] = useState({
    date: '',
    homeAway: 'home',
    opponent: '',
    color1: '#000000',
    color2: '#ffffff',
    result: '',
    score: '',
  })
  const [video, setVideo] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)

  const navigate = useNavigate({ from: "/Uploader" })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updatedPlayers = [...players]
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value }
    setPlayers(updatedPlayers)
  }

  const handleMatchDetailsChange = (field: string, value: string) => {
    setMatchDetails({ ...matchDetails, [field]: value })
  }

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setVideo(file)
      setIsProcessing(true)
      setIsReadyToSubmit(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setVideo(file)
      setIsProcessing(true)
      setIsReadyToSubmit(false)
    }
  }

  const handleAddPlayer = () => {
    setPlayers([...players, { name: '', number: '' }])
  }

  const handleRemovePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => i !== index)
    setPlayers(updatedPlayers)
  }

  const handleSubmit = () => {
    console.log('Players:', players)
    console.log('Match Details:', matchDetails)
    console.log('Uploaded Video:', video)
    alert('Form submitted! Redirecting to statistics...')
    navigate({ to: "/Statistics" })
  }

  useEffect(() => {
    if (isProcessing) {
      const timer = setTimeout(() => {
        setIsProcessing(false)
        setIsReadyToSubmit(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isProcessing])

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarTrigger className="top-6 left-4 z-50 bg-transparent p-[4px] rounded-full shadow-lg" />

      <div className="flex-grow p-8 bg-gray-100 flex flex-col items-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Upload Match Details</h1>

        <p className="text-lg mb-6 text-black">
          The place where the team's DNA takes shape
        </p>

        {/* Match Details Section */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mb-8">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Date</label>
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded"
              value={matchDetails.date}
              onChange={(e) => handleMatchDetailsChange('date', e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Home / Away</label>
            <select
              className="px-4 py-2 border border-gray-300 rounded"
              value={matchDetails.homeAway}
              onChange={(e) =>
                handleMatchDetailsChange('homeAway', e.target.value)
              }
            >
              <option value="home">Home</option>
              <option value="away">Away</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Match Result</label>
            <select
              className="px-4 py-2 border border-gray-300 rounded"
              value={matchDetails.result}
              onChange={(e) =>
                handleMatchDetailsChange('result', e.target.value)
              }
            >
              <option value="">Select Result</option>
              <option value="win">Victory</option>
              <option value="draw">Draw</option>
              <option value="loss">Defeat</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Score</label>
            <input
              type="text"
              placeholder="e.g., 3-1"
              className="px-4 py-2 border border-gray-300 rounded"
              value={matchDetails.score}
              onChange={(e) =>
                handleMatchDetailsChange('score', e.target.value)
              }
            />
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
                    handleMatchDetailsChange('color1', e.target.value)
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
                    handleMatchDetailsChange('color2', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

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
                  handlePlayerChange(index, 'name', e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Number"
                className="w-20 px-4 py-2 border border-gray-300 rounded"
                value={player.number}
                onChange={(e) =>
                  handlePlayerChange(index, 'number', e.target.value)
                }
              />
              <button
                onClick={() => handleRemovePlayer(index)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddPlayer}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Add Player
          </button>
        </div>

        {/* Video Upload Section */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full max-w-4xl h-64 flex flex-col items-center justify-center border-4 border-dashed border-gray-400 rounded-lg bg-white cursor-pointer hover:border-blue-500 transition-colors"
        >
          {!video ? (
            <div className="flex flex-col items-center">
              <CloudUpload className="w-16 h-16 text-gray-500" />
              <p className="text-xl font-semibold text-gray-700 mt-4">
                Drag & Drop your video here
              </p>
              <p className="text-sm text-gray-500 mt-2">
                or click to browse files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          ) : (
            <video className="w-full h-full object-cover rounded-lg" controls>
              <source src={URL.createObjectURL(video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {isProcessing && (
          <div className="w-full max-w-4xl mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse w-full"></div>
            </div>
            <p className="text-blue-600 mt-2 text-center">
              Processing video...
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!isReadyToSubmit}
          className={`mt-6 px-6 py-2 rounded-lg text-lg font-medium transition-colors duration-300 ${isReadyToSubmit
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Submit
        </button>
      </div>
    </SidebarProvider>
  )
}
