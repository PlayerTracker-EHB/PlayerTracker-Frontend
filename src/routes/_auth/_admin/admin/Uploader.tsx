import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useUploadVideo } from '@/hooks/useUploadVideo'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_auth/_admin/admin/Uploader')({
  component: UploadVideoPage,
})

function UploadVideoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { mutate: uploadVideo } = useUploadVideo()
  const { toast } = useToast()

  const handleFileChange = (files: File[]) => {
    setFile(files[0])
  }

  const handleUpload = () => {
    if (!file) return
    setUploadProgress(0)

    uploadVideo(
      {
        file,
        onProgress: (progress: number) => {
          setUploadProgress(progress)
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Video Upload Successful",
            description: "Your video has been uploaded successfully!",
          })
          setUploadProgress(0)
        },
        onError: (error: any) => {
          toast({
            title: "Error While Uploading Video",
            description: "There was an error while uploading the video, Please try again later",
          })
          console.error(error)
        },
      }
    )
  }

  return (
    <div className="flex flex-col w-screen h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Large Video Upload</h1>
      <div className="flex-1 flex flex-col items-center justify-start max-w-6xl mx-auto w-full">
        <div className="w-full border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg mb-8">
          <FileUpload onChange={handleFileChange} />
        </div>
        <Button
          onClick={handleUpload}
          disabled={!file}
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
  )
}

export default UploadVideoPage

