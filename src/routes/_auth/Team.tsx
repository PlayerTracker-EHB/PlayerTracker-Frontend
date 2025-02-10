import { useState } from 'react'
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/Team')({
  component: Team,
})

type Player = {
  id: number
  firstName: string
  lastName: string
}

function Team() {
  const [teamDetails, setTeamDetails] = useState({
    logo: '',
    name: '',
    coach: '',
    color1: '#ffffff',
    color2: '#000000',
  })

  const [players, setPlayers] = useState<Player[]>([])
  const [newPlayer, setNewPlayer] = useState({ firstName: '', lastName: '' })

  const handleAddPlayer = () => {
    if (newPlayer.firstName && newPlayer.lastName) {
      setPlayers([...players, { id: Date.now(), ...newPlayer }])
      setNewPlayer({ firstName: '', lastName: '' })
    } else {
      alert('Please fill in both First Name and Last Name.')
    }
  }

  const handleDeletePlayer = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id))
  }

  const handleTeamDetailsChange = (field: string, value: string) => {
    setTeamDetails({
      ...teamDetails,
      [field]: value,
    })
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setTeamDetails({
        ...teamDetails,
        logo: URL.createObjectURL(event.target.files[0]),
      })
    }
  }

  const handleSubmit = () => {
    console.log('Team Details:', teamDetails)
    console.log('Players:', players)
    alert('Team saved! Check the console for details.')
  }

  return (
    <div className="flex-grow p-8 bg-gray-100 flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Team Management</h1>
      <p className="text-lg mb-6 text-black">
        The place where the team's DNA takes shape
      </p>
      <div className="flex w-full max-w-6xl">
        {/* Section gauche : Détails du club */}
        <div className="flex-1 p-4 bg-white shadow-lg rounded">
          <div className="flex flex-col items-center mb-6">
            {teamDetails.logo ? (
              <img
                src={teamDetails.logo}
                alt="Club Logo"
                className="w-24 h-24 object-cover mb-4 rounded-full"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center mb-4 rounded-full">
                Logo
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="text-sm"
              onChange={handleLogoUpload}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Club Name
            </label>
            <input
              type="text"
              placeholder="Enter club name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={teamDetails.name}
              onChange={(e) =>
                handleTeamDetailsChange('name', e.target.value)
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Coach Name
            </label>
            <input
              type="text"
              placeholder="Enter coach name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={teamDetails.coach}
              onChange={(e) =>
                handleTeamDetailsChange('coach', e.target.value)
              }
            />
          </div>

          <div className="flex justify-between mb-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Color 1
              </label>
              <input
                type="color"
                value={teamDetails.color1}
                onChange={(e) =>
                  handleTeamDetailsChange('color1', e.target.value)
                }
                className="w-16 h-10 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Color 2
              </label>
              <input
                type="color"
                value={teamDetails.color2}
                onChange={(e) =>
                  handleTeamDetailsChange('color2', e.target.value)
                }
                className="w-16 h-10 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="w-[1px] bg-gray-300 mx-6"></div>

        {/* Section droite : Liste des joueurs */}
        <div className="flex-1 p-4 bg-white shadow-lg rounded">
          <h2 className="text-xl font-semibold mb-4">Players</h2>

          <div className="flex items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
              value={newPlayer.firstName}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
              value={newPlayer.lastName}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, lastName: e.target.value })
              }
            />
            <button
              onClick={handleAddPlayer}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 flex items-center gap-2"
            >
              <PlusCircleIcon className="w-5 h-5" />
              Add
            </button>
          </div>

          <ul>
            {players.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{player.firstName}</span>
                  <span className="text-sm text-gray-500">
                    {player.lastName}
                  </span>
                </div>
                <button
                  onClick={() => handleDeletePlayer(player.id)}
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Save Team
      </button>
    </div>
  )
}
