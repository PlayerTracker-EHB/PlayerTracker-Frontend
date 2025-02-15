import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useUploadVideo } from '@/hooks/useUploadVideo'
import { useAuthStore } from '@/store/authStore'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_auth/_admin/admin/Uploader')({
  component: UploadVideoPage,
})

function UploadVideoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [atHome, setAtHome] = useState<boolean>(false);
  const [adversaryName, setAdversaryName] = useState<string>("");

  const { mutate: uploadVideo } = useUploadVideo();
  const { toast } = useToast();
  const { user } = useAuthStore()

  const teamId = user?.team.teamId

  const handleFileChange = (files: File[]) => {
    setFile(files[0]);
  }

  const handleUpload = () => {
    if (!file) return;
    setUploadProgress(0);

    uploadVideo({
      file,
      onProgress: (progress: number) => {
        setUploadProgress(progress);
      },
      atHome,
      adversaryName,
      teamId
    }, {
      onSuccess: () => {
        toast({
          title: "Video Upload Successful",
          description: "Your video has been uploaded successfully!",
        });
        setUploadProgress(0);
      },
      onError: (error: any) => {
        toast({
          title: "Error While Uploading Video",
          description: "There was an error while uploading the video, Please try again later",
        });
        console.error(error);
      },
    });
  }

  return (
    <div className="flex flex-col w-screen h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Large Video Upload</h1>
      <div className="flex-1 flex flex-col items-center justify-start max-w-6xl mx-auto w-full">
        <div className="w-full border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg mb-8">
          <FileUpload onChange={handleFileChange} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Game Type:</label>
          <div className="mt-1">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={atHome ? "home" : "away"}
              onChange={(e) => setAtHome(e.target.value === "home")}
            >
              <option value="home">Home</option>
              <option value="away">Away</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Adversary Name:</label>
          <input
            type="text"
            value={adversaryName}
            onChange={(e) => setAdversaryName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <Button
          onClick={handleUpload}
          disabled={!file || !adversaryName}
          className="w-full max-w-md mx-auto"
        >
          Upload
        </Button>
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

