import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadIcon, CircleX, Send } from "lucide-react";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im"; // Import loading spinner icon
import { DatePicker } from "../ui/DatePicker";
import { Checkbox } from "../ui/checkbox";

function UploadDialog({
  open,
  setOpen,
  atHome,
  setAtHome,
  adversaryName,
  setAdversaryName,
  gameDate,
  setGameDate,
  homeTeamScore,
  setHomeTeamScore,
  awayTeamScore,
  setAwayTeamScore,
  startsLeft,
  setStartsLeft,
  onUpload,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  atHome: boolean;
  setAtHome: (atHome: boolean) => void;
  adversaryName: string;
  setAdversaryName: (name: string) => void;
  gameDate: Date | undefined;
  setGameDate: (gameDate: Date) => void;
  homeTeamScore: number;
  setHomeTeamScore: (score: number) => void;
  awayTeamScore: number;
  setAwayTeamScore: (score: number) => void;
  startsLeft: boolean;
  setStartsLeft: (left: boolean) => void;

  onUpload: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    onUpload();
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            <UploadIcon className="inline-block mr-2" /> Upload Video
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-8 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="home-game">Home Game</Label>
            <Switch
              id="home-game"
              checked={atHome}
              onCheckedChange={setAtHome}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="adversary">Adversary Name</Label>
            <Input
              id="adversary"
              value={adversaryName}
              onChange={(e) => setAdversaryName(e.target.value)}
              placeholder="Enter adversary name"
            />
          </div>
          <div className="flex items-center justify-between ">
            <Label htmlFor="datePicker">Pick a Game Date</Label>
            <DatePicker date={gameDate} setDate={setGameDate} />
          </div>
          <div className="flex items-center justify-between gap-8">
            <div>
              <Label htmlFor="home-team-score">Home Team Score</Label>
              <Input
                id="home-team-score"
                type="number"
                value={homeTeamScore}
                onChange={(e) => setHomeTeamScore(e.target.valueAsNumber)}
              />
            </div>
            <div>
              <Label htmlFor="away-team-score">Away Team Score</Label>
              <Input
                id="away-team-score"
                type="number"
                value={awayTeamScore}
                onChange={(e) => setAwayTeamScore(e.target.valueAsNumber)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={startsLeft}
              onCheckedChange={setStartsLeft}
              id="left"
            />
            <label
              htmlFor="left"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Check this if your team started the game on the left side.
            </label>
          </div>        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            <CircleX className="inline-block mr-2" /> Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!adversaryName || loading}>
            {loading ? (
              <ImSpinner2 className="animate-spin text-white text-lg" />
            ) : (
              <Send />
            )}
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadDialog;
