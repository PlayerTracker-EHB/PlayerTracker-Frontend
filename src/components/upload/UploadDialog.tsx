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

function UploadDialog({
  open,
  setOpen,
  atHome,
  setAtHome,
  adversaryName,
  setAdversaryName,
  gameDate,
  setGameDate,
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
          <div className="flex items-center gap-8">
            <Label htmlFor="home-game">Home Game</Label>
            <Switch
              id="home-game"
              checked={atHome}
              onCheckedChange={setAtHome}
            />
          </div>
          <div className="flex items-center gap-8">
            <Label htmlFor="adversary">Adversary Name</Label>
            <Input
              id="adversary"
              value={adversaryName}
              onChange={(e) => setAdversaryName(e.target.value)}
              placeholder="Enter adversary name"
            />
          </div>
          <DatePicker date={gameDate} setDate={setGameDate} />
        </div>
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
