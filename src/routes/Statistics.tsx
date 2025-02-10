import { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Statistics')({
  component: Statistics,
})

function Statistics() {
  const matches = [
    {
      id: 1,
      homeTeam: { name: 'EHB', logo: 'https://via.placeholder.com/40' },
      awayTeam: { name: 'Italy', logo: 'https://via.placeholder.com/40' },
      score: '1 - 2',
      result: 'loss', // win, draw, loss
      date: '18 December 2022',
    },
    {
      id: 2,
      homeTeam: { name: 'EHB', logo: 'https://via.placeholder.com/40' },
      awayTeam: { name: 'Italy', logo: 'https://via.placeholder.com/40' },
      score: '4 - 2',
      result: 'win',
      date: '18 December 2022',
    },
    {
      id: 3,
      homeTeam: { name: 'EHB', logo: 'https://via.placeholder.com/40' },
      awayTeam: { name: 'Brazil', logo: 'https://via.placeholder.com/40' },
      score: '1 - 3',
      result: 'loss',
      date: '17 December 2022',
    },
    {
      id: 4,
      homeTeam: { name: 'Uruguay', logo: 'https://via.placeholder.com/40' },
      awayTeam: { name: 'EHB', logo: 'https://via.placeholder.com/40' },
      score: '2 - 2',
      result: 'draw',
      date: '17 December 2022',
    },
    {
      id: 5,
      homeTeam: { name: 'Spanish', logo: 'https://via.placeholder.com/40' },
      awayTeam: { name: 'EHB', logo: 'https://via.placeholder.com/40' },
      score: '3 - 3',
      result: 'draw',
      date: '16 December 2022',
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const sortedMatches = matches.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedMatches.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(matches.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  // Statistiques globales
  const totalMatches = matches.length
  const totalWins = matches.filter((match) => match.result === 'win').length
  const totalDraws = matches.filter((match) => match.result === 'draw').length
  const totalLosses = matches.filter((match) => match.result === 'loss').length
  const winPercentage = ((totalWins / totalMatches) * 100).toFixed(2)
  const goalDifference = matches.reduce((acc, match) => {
    const [homeGoals, awayGoals] = match.score.split(' - ').map(Number)
    return acc + (homeGoals - awayGoals)
  }, 0)

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarTrigger className="top-6 left-4 z-50 bg-transparent p-[4px] rounded-full shadow-lg" />

      <div className="flex-grow p-8 bg-gray-100 flex flex-col items-center min-h-screen">
        <h1 className="text-4xl font-semibold mb-2 text-black">Statistics</h1>
        <p className="text-lg mb-6 text-black">
          Because the analyses will make the club a better place.
        </p>

        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Match History
            </h2>
            <p className="text-sm text-gray-500">
              Explore the latest match statistics
            </p>
          </div>

          {/* Match List */}
          <div>
            {currentItems.map((match, index) => (
              <div
                key={match.id}
                className={`relative flex items-center justify-between py-4 px-6 mb-4 border rounded-lg shadow ${index === 0 && currentPage === 1
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-gray-50 border-gray-200'
                  }`}
              >
                {/* Badge for Latest Uploading */}
                {index === 0 && currentPage === 1 && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    Latest Uploading
                  </span>
                )}

                {/* Date */}
                <div className="text-sm text-gray-500 font-semibold w-28">
                  {match.date}
                </div>

                {/* Home Team */}
                <div className="flex items-center gap-4">
                  <img
                    src={match.homeTeam.logo}
                    alt={match.homeTeam.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-lg font-medium text-gray-800">
                    {match.homeTeam.name}
                  </span>
                </div>

                {/* Score */}
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-gray-700">
                    {match.score}
                  </span>
                </div>

                {/* Away Team */}
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium text-gray-800">
                    {match.awayTeam.name}
                  </span>
                  <img
                    src={match.awayTeam.logo}
                    alt={match.awayTeam.name}
                    className="w-10 h-10 rounded-full"
                  />
                </div>

                {/* See Statistics */}
                <div>
                  <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                    See Statistics
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 font-semibold rounded ${currentPage === 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 font-semibold rounded ${currentPage === totalPages
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              Win Percentage
            </h3>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {winPercentage}%
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              Goal Difference
            </h3>
            <p className="text-3xl font-bold text-blue-500 mt-2">
              {goalDifference >= 0 ? `+${goalDifference}` : goalDifference}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              Match Outcomes
            </h3>
            <p className="text-lg font-medium text-gray-600 mt-2">
              Wins: {totalWins} | Draws: {totalDraws} | Losses: {totalLosses}
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
