import instance from "../axios/instance";
import {UploadResponseType} from "../shared/type/interface";

export const uploadFile = (images: File[]) => {
    const fd = new FormData()
    images.forEach((image) => {
        fd.append('images', image)
    })
    return instance.post<UploadResponseType>('/api/upload', fd, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
}