export interface UploadResponseType {
    videoUrl: string
}
export interface PlayerProps {
    url: string,
    setUrl: (url: string) => void
}

export interface DropboxProps {
    setLoading: (isLoading: boolean) => void
    setUrl: (url: string) => void
}