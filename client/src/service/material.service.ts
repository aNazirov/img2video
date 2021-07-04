import M from 'materialize-css'

export const toast = (message: string) => {
    M.toast({html: message})
}