import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// React Query imports
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPlayer, PlayerType } from "@/lib/api/player";
import { UserPlus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

export function AddPlayerDialog() {
  // Local states for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Track dialog open/close state
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { toast } = useToast();

  const teamId = user?.team?.teamId;

  // Create player mutation
  const createPlayerMutation = useMutation({
    mutationFn: createPlayer.mutationFn,
    onSuccess: () => {
      // Invalidate cached list of players so the UI refreshes
      queryClient.invalidateQueries({ queryKey: ["players"] });
      // Optionally reset form
      setFirstName("");
      setLastName("");
      // Close the dialog
      setOpen(false);
      window.location.reload(); // 🚀 Recharge la page
      toast({
        title: "Player Successfully Created",
        description:
          "You have just created the player: " + firstName + " " + lastName,
      });
    },
    onError: (error) => {
      console.error("Failed to create player:", error);
      toast({
        variant: "destructive",
        title: "Error While Creating Player",
        description:
          "There was an error while creating the player, Please try again later",
      });
    },
  });

  // Handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createPlayerMutation.mutate({
      firstName,
      lastName,
      teamId,
    } as Partial<PlayerType>); // The createPlayer mutation expects Partial<PlayerType>
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button that opens the dialog */}
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus /> Add New Player
        </Button>
      </DialogTrigger>

      {/* The Dialog itself */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Player</DialogTitle>
          <DialogDescription>
            Enter the player details and click "Save" to add them.
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
            {/* The button that submits the form */}
            <Button type="submit" disabled={createPlayerMutation.isPending}>
              {createPlayerMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
