import { useMutation } from '@tanstack/react-query'

async function uploadFileInChunks(file: File, onProgress?: (progress: number) => void) {
  const CHUNK_SIZE = 1024 * 1024 * 5 // 5MB per chunk (adjust as needed)
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
  const BASE_URL = "http://localhost:3333/admin"

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * CHUNK_SIZE
    const end = start + CHUNK_SIZE
    const blobChunk = file.slice(start, end)

    // Create form data for this chunk
    const formData = new FormData()
    formData.append('chunk', blobChunk)
    formData.append('name', file.name)
    formData.append('chunkIndex', String(chunkIndex))
    formData.append('totalChunks', String(totalChunks))



    // POST the chunk using fetch
    const res = await fetch(BASE_URL + '/upload-chunk', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error(`Failed to upload chunk ${chunkIndex}: ${res.statusText}`)
    }

    // Because fetch won't let us track bytes as they upload,
    // we update progress after the chunk finishes.
    if (onProgress) {
      const chunkProgress = Math.round(((chunkIndex + 1) / totalChunks) * 100)
      onProgress(chunkProgress)
    }
  }

  // Once all chunks are uploaded, finalize on the server
  const finalizeRes = await fetch(BASE_URL + '/finalize-upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      name: file.name,
      totalChunks: totalChunks
    }),
  })

  if (!finalizeRes.ok) {
    throw new Error(`Failed to finalize upload: ${finalizeRes.statusText}`)
  }
  const responseData = await finalizeRes.json()
  console.log(responseData.filePath);
  return responseData.filePath;

}

type UploadVideoVars = {
  file: File
  onProgress?: (progress: number) => void
}

export function useUploadVideo() {
  return useMutation<void, Error, UploadVideoVars>({
    // Provide the async mutation function here:
    mutationFn: async ({ file, onProgress }: UploadVideoVars) => {
      return uploadFileInChunks(file, onProgress)
    },

    // Optional: onSuccess, onError, etc.
    // onSuccess: () => { ... },
    // onError: () => { ... },
  })
}
