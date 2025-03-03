import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust the import path to your Shadcn UI table components
import { Button } from "@/components/ui/button"; // If using shadcn's Button
import { PlayerType } from "@/lib/api/player"; // Adjust the import path to your player interface
import { Trash2 } from "lucide-react";
import { UpdatePlayerDialog } from "./UpdatePlayerDialog";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

export interface PlayerTableProps {
  players: PlayerType[];
  onDeletePlayer: (playerId: number) => void;
}

export function PlayerTable({ players, onDeletePlayer }: PlayerTableProps) {
  return (
    <Table>
      <TableCaption>A list of all players in the system.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px] text-center">ID</TableHead>
          <TableHead className="text-center">First Name</TableHead>
          <TableHead className="text-center">Last Name</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {players.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6">
              No players found.
            </TableCell>
          </TableRow>
        ) : (
          players.map((player) => (
            <TableRow key={player.playerId}>
              <TableCell className="text-center font-medium">
                {player.playerId}
              </TableCell>
              <TableCell className="text-center">{player.firstName}</TableCell>
              <TableCell className="text-center">{player.lastName}</TableCell>
              {/* Actions column */}
              <TableCell className="text-center">
                <div className="flex justify-center gap-4">
                  <UpdatePlayerDialog player={player} />
                  <ConfirmDeleteDialog
                    onConfirm={() => onDeletePlayer(player.playerId)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
