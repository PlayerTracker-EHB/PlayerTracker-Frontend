import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// React Query imports
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { updatePlayer, PlayerType } from "@/lib/api/player"
import { Edit } from "lucide-react"

interface UpdatePlayerDialogProps {
  /** The player to edit */
  player: PlayerType
}

/**
 * A dialog for updating an existing Player's details.
 */
export function UpdatePlayerDialog({ player }: UpdatePlayerDialogProps) {
  // Local state for form inputs, initialized from the passed-in player
  const [firstName, setFirstName] = useState(player.firstName)
  const [lastName, setLastName] = useState(player.lastName)

  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const { toast } = useToast()

  // Create the update mutation
  const updatePlayerMutation = useMutation({
    // The `updatePlayer.mutationFn` expects (playerId, updatedData)
    mutationFn: (vars: { playerId: number; updatedData: Partial<PlayerType> }) =>
      updatePlayer.mutationFn(vars.playerId, vars.updatedData),

    onSuccess: () => {
      // Invalidate the cached list of players so the UI refreshes
      queryClient.invalidateQueries({ queryKey: ["players"] })
      // Close the dialog
      setOpen(false)
      // Show a success toast
      toast({
        title: "Player Updated",
        description: `Player ${firstName} ${lastName} was successfully updated.`,
      })
    },
    onError: (error) => {
      console.error("Failed to update player:", error)
      // Show an error toast
      toast({
        variant: "destructive",
        title: "Error Updating Player",
        description:
          "There was an error while updating the player. Please try again later.",
      })
    },
  })

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    updatePlayerMutation.mutate({
      playerId: player.playerId,
      updatedData: {
        firstName,
        lastName,

      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* This can be any button/icon to trigger the Update dialog */}
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Player</DialogTitle>
          <DialogDescription>
            Modify the player's details below, then click "Save" to apply changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* First Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3"
                placeholder="Jane"
                required
              />
            </div>

            {/* Last Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={updatePlayerMutation.isPending}>
              {updatePlayerMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

