import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Progress } from '@/components/ui/progress'
import UploadDialog from '@/components/upload/UploadDialog'
import { useToast } from '@/hooks/use-toast'
import { useUploadVideo } from '@/hooks/useUploadVideo'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_auth/_admin/admin/Uploader')({
  component: UploadVideoPage,
})

function UploadVideoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [atHome, setAtHome] = useState<boolean>(true);
  const [adversaryName, setAdversaryName] = useState<string>("");
  const [gameDate, setGameDate] = useState<Date>();
  const [homeTeamScore, setHomeTeamScore] = useState<number>(0);
  const [awayTeamScore, setAwayTeamScore] = useState<number>(0);
  const [startsLeft, setStartsLeft] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: uploadVideo } = useUploadVideo();
  const { toast } = useToast();

  const navigate = useNavigate()


  const handleFileChange = (files: File[]) => {
    setFile(files[0]);
  }

  const handleUpload = () => {
    if (!file) return;
    setUploadProgress(0);
    setDialogOpen(false);

    uploadVideo({
      file,
      atHome,
      adversaryName,
      gameDate,
      homeTeamScore,
      awayTeamScore,
      startsLeft,
      onProgress: (progress: number) => {
        setUploadProgress(progress);
      },

    }, {
      onSuccess: () => {
        toast({
          title: "Video Upload Successful",
          description: "Your video has been uploaded successfully!",
        });
        resetUploadState();
        navigate({ to: '/Statistics' })
      },
      onError: (error: any) => {
        toast({
          title: "Error While Uploading Video",
          description: "There was an error while uploading the video, Please try again later",
        });
        console.error(error);
        resetUploadState()
      },
    });
  }

  const resetUploadState = () => {
    setFile(null);
    setUploadProgress(0);
    setAtHome(true);
    setAdversaryName("");
    setGameDate(undefined)
    setHomeTeamScore(0)
    setAwayTeamScore(0)
    setStartsLeft(false)
  }

  return (
    <div className="flex flex-col w-screen h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Large Video Upload</h1>
      <div className="flex-1 flex flex-col items-center justify-start max-w-6xl mx-auto w-full">
        <div className="w-full border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg mb-8">
          <FileUpload onChange={handleFileChange} />
        </div>

        <Button
          onClick={() => setDialogOpen(true)}
          disabled={!file}
          className="w-full max-w-md mx-auto"
        >
          Upload
        </Button>

        <UploadDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          atHome={atHome}
          setAtHome={setAtHome}
          adversaryName={adversaryName}
          setAdversaryName={setAdversaryName}
          gameDate={gameDate}
          setGameDate={setGameDate}
          homeTeamScore={homeTeamScore}
          setHomeTeamScore={setHomeTeamScore}
          awayTeamScore={awayTeamScore}
          setAwayTeamScore={setAwayTeamScore}
          startsLeft={startsLeft}
          setStartsLeft={setStartsLeft}
          onUpload={handleUpload}
        />

        {uploadProgress > 0 && (
          <div className="w-full mt-4 space-y-2">
            <Progress value={uploadProgress} className="h-3" />
            <p className="text-sm text-muted-foreground text-right">
              {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

