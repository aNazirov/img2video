import React from 'react';
import {DropzoneOptions, useDropzone} from 'react-dropzone';
import classes from "./Drop.module.css";
import {uploadFile} from "../../service/upload.service";
import {DropboxProps} from "../../shared/type/interface";
import {AxiosError, AxiosResponse} from "axios";
import {toast} from '../../service/material.service'

function Dropbox({setLoading, setUrl}: DropboxProps) {
    const options: DropzoneOptions = {
        accept: ['image/png', "image/jpg", "image/jpeg"],
        maxFiles: 10,
        maxSize: 1024 * 1024 * 2,
        multiple: true,
        async onDropAccepted(files) {
            setLoading(true)
            uploadFile(files)
                .then((res: AxiosResponse) => {
                    setUrl(res.data.videoUrl)
                })
                .catch((error: AxiosError) => {
                    if (error.response?.statusText) toast(error.response?.statusText)
                })
                .finally(() => setLoading(false))
        },
        onDropRejected(fileRejections) {
            fileRejections.forEach(file => {
                const [error, name]: string[] = [file.errors[0].message, file.file.name]
                toast(`${name} ${error}`)
            })
        }
    }
    const { getRootProps, getInputProps} = useDropzone(options)

    return (
        <>
            <div {...getRootProps({className: classes.Dropbox})}>
                <input {...getInputProps()} />
                <p className={classes.P}>Drop images here</p>
            </div>
        </>
    );
}

export default Dropbox
