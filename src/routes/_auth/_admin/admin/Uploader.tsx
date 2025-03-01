import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Progress } from "@/components/ui/progress";
import UploadDialog from "@/components/upload/UploadDialog";
import { useToast } from "@/hooks/use-toast";
import { useUploadVideo } from "@/hooks/useUploadVideo";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/_auth/_admin/admin/Uploader")({
  component: UploadVideoPage,
});

function UploadVideoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [atHome, setAtHome] = useState<boolean>(true);
  const [adversaryName, setAdversaryName] = useState<string>("");
  const [gameDate, setGameDate] = useState<Date>();
  const [homeTeamScore, setHomeTeamScore] = useState<number>(0);
  const [awayTeamScore, setAwayTeamScore] = useState<number>(0);
  const [startsLeft, setStartsLeft] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // État pour contrôler si on affiche la « fleche + popup »
  const [showGuide, setShowGuide] = useState(true);

  const { mutate: uploadVideo } = useUploadVideo();
  const { toast } = useToast();
  const navigate = useNavigate();

  // REF pour la div qui contient <FileUpload />
  const fileUploadRef = useRef<HTMLDivElement | null>(null);

  // Positions calculées du conteneur
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  // On calcule la position du conteneur *après* le rendu
  useLayoutEffect(() => {
    if (fileUploadRef.current) {
      const rect = fileUploadRef.current.getBoundingClientRect();
      setContainerRect(rect);
    }
  }, [showGuide]); // recalcul si on rouvre le guide, etc.

  const handleFileChange = (files: File[]) => {
    setFile(files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploadProgress(0);
    setDialogOpen(false);
    setIsUploading(true);

    uploadVideo(
      {
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
      },
      {
        onSuccess: () => {
          toast({
            title: "Video Upload Successful",
            description: "Your video has been uploaded successfully!",
          });
          resetUploadState();
          navigate({ to: "/statistics" });
        },
        onError: (error: any) => {
          toast({
            title: "Error While Uploading Video",
            description:
              "There was an error while uploading the video. Please try again later.",
          });
          console.error(error);
          resetUploadState();
        },
        onSettled: () => {
          setIsUploading(false);
        },
      }
    );
  };

  const resetUploadState = () => {
    setFile(null);
    setUploadProgress(0);
    setAtHome(true);
    setAdversaryName("");
    setGameDate(undefined);
    setHomeTeamScore(0);
    setAwayTeamScore(0);
    setStartsLeft(false);
  };

  return (
    <motion.div
      className="flex flex-col w-screen h-screen p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {showGuide && containerRect && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                position: "absolute",
                top: containerRect.bottom + 12,
                left: containerRect.left + containerRect.width / 2 - 240,
                width: "500px",
              }}
            >
              <motion.div
                className="relative bg-white p-4 rounded shadow-lg border border-gray-300"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
              >
                {/* Flèche qui pointe vers l'upload */}
                <div
                  className="absolute top-[-8px] left-1/4 transform -translate-x-1/4"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderBottom: "8px solid white",
                  }}
                />
                <h3 className="font-bold mb-2 text-gray-800">Important</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Please select a file to upload. Make sure your video meets all
                  the following conditions:
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 mb-3">
                  <li>The video must include both halves of the match.</li>
                  <li>
                    No replays or TV broadcasts (must be an original recording).
                  </li>
                  <li>The camera angle should capture the entire field.</li>
                  <li>
                    The recording must be in good quality for optimal
                    calculations.
                  </li>
                </ul>

                <div className="text-right">
                  <Button variant="outline" onClick={() => setShowGuide(false)}>
                    OK
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =============== Contenu Normal =============== */}
      <motion.h1
        className="text-3xl font-bold text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Large Video Upload
      </motion.h1>

      <motion.div
        className="flex-1 flex flex-col items-center justify-start max-w-6xl mx-auto w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          ref={fileUploadRef}
          className="w-full border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg mb-8"
          whileHover={{ scale: 1.02 }}
        >
          <FileUpload onChange={handleFileChange} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button
            onClick={() => setDialogOpen(true)}
            disabled={!file || isUploading}
            className="w-full max-w-md mx-auto"
          >
            Upload
          </Button>
        </motion.div>

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
          <motion.div
            className="w-full mt-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Progress value={uploadProgress} className="h-3" />
            <p className="text-sm text-muted-foreground text-right">
              {uploadProgress}%
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default UploadVideoPage;
