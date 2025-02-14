import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table" // Adjust the import path to your Shadcn UI table components
import { Button } from "@/components/ui/button" // If using shadcn's Button
import { PlayerType } from "@/lib/api/player" // Adjust the import path to your player interface
import { Trash2 } from "lucide-react"
import { UpdatePlayerDialog } from "./UpdatePlayerDialog"

export interface PlayerTableProps {
  players: PlayerType[]
  onDeletePlayer: (playerId: number) => void

}

export function PlayerTable({ players, onDeletePlayer }: PlayerTableProps) {
  return (
    <Table>
      <TableCaption>A list of all players in the system.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Team ID</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {players.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6">
              No players found.
            </TableCell>
          </TableRow>
        ) : (
          players.map((player) => (
            <TableRow key={player.playerId}>
              <TableCell className="font-medium">{player.playerId}</TableCell>
              <TableCell>{player.firstName}</TableCell>
              <TableCell>{player.lastName}</TableCell>
              <TableCell>{player.teamId}</TableCell>
              {/* "Actions" column */}
              <TableCell className="flex gap-4 float-end">
                <UpdatePlayerDialog player={player} />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeletePlayer(player.playerId)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>

              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

