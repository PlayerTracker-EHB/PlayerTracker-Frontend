import { useMutation } from '@tanstack/react-query'

async function uploadFileInChunks(
  file: File,
  atHome: boolean,
  adversaryName: string,
  teamId: number,
  onProgress?: (progress: number) => void
) {
  const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB per chunk (adjust as needed)
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const BASE_URL = "http://localhost:3333/admin";

  console.log(`Starting upload of file: ${file.name}`);
  console.log(`Total file size: ${file.size} bytes`);
  console.log(`Total chunks to upload: ${totalChunks}`);

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size); // Ensure end does not exceed file size
    const blobChunk = file.slice(start, end);

    // Create form data for this chunk
    const formData = new FormData();
    formData.append('chunk', blobChunk);
    formData.append('name', file.name);
    formData.append('chunkIndex', String(chunkIndex));
    formData.append('totalChunks', String(totalChunks));


    // POST the chunk using fetch
    try {
      const res = await fetch(BASE_URL + '/upload-chunk', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Failed to upload chunk ${chunkIndex}: ${res.statusText}`);
      }

      // Update progress after the chunk finishes
      if (onProgress) {
        const chunkProgress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
        onProgress(chunkProgress);
      }
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex}:`, error);
      throw error; // Rethrow the error to be handled by the mutation
    }
  }

  // Once all chunks are uploaded, finalize on the server
  console.log(`Finalizing upload for file: ${file.name}`);
  try {
    const finalizeRes = await fetch(BASE_URL + '/finalize-upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: file.name,
        totalChunks: totalChunks,
        atHome: atHome,
        adversaryName: adversaryName,
        teamId: teamId,
      }),
    });

    if (!finalizeRes.ok) {
      throw new Error(`Failed to finalize upload: ${finalizeRes.statusText}`);
    }

    const responseData = await finalizeRes.json();
    console.log(`Upload finalized successfully. File path: ${responseData}`);
    return responseData;
  } catch (error) {
    console.error("Error finalizing upload:", error);
    throw error; // Rethrow the error to be handled by the mutation
  }
}

export function useUploadVideo() {
  return useMutation<void, Error, any>({
    // Provide the async mutation function here:
    mutationFn: async ({ file, onProgress, atHome, adversaryName, teamId }) => {
      return uploadFileInChunks(file, atHome, adversaryName, teamId, onProgress);
    },

    // Optional: onSuccess, onError, etc.
    // onSuccess: () => { ... },
    // onError: () => { ... },
  });
}

