import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UploadIcon, CircleX, Send } from "lucide-react"

function UploadDialog({
  open,
  setOpen,
  atHome,
  setAtHome,
  adversaryName,
  setAdversaryName,
  onUpload
}: {
  open: boolean
  setOpen: (open: boolean) => void
  atHome: boolean
  setAtHome: (atHome: boolean) => void
  adversaryName: string
  setAdversaryName: (name: string) => void
  onUpload: () => void
}) {
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            <CircleX className="inline-block mr-2" /> Cancel
          </Button>
          <Button onClick={onUpload} disabled={!adversaryName}>
            <Send />
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog

