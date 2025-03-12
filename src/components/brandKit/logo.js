import {useDropzone} from 'react-dropzone';
import {useState, useRef, useCallback} from 'react';
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import Image from 'next/image';
import classes from './brandKit.module.css';
import {LOGO_ACCEPTED_FORMATS, LOGO_MAX_SIZE} from '@/config/constants';
import {InfinizeIcon} from '../common';

export default function LogoUpload({logo, setLogo}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [fileDetails, setFileDetails] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = file => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                setLogo(reader.result);
                setFileDetails({
                    name: file.name,
                    size: (file.size / 1024).toFixed(2) + ' KB'
                });
            } else {
                setErrorMessage('Invalid file data.');
            }
        };
        reader.onerror = () =>
            setErrorMessage('There was an issue uploading the file.');
        reader.readAsDataURL(file);
    };

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        setErrorMessage('');

        if (fileRejections.length) {
            setErrorMessage(
                'Invalid file format or size. Please upload a valid image.'
            );
            return;
        }

        handleFileUpload(acceptedFiles[0]);
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        accept: LOGO_ACCEPTED_FORMATS,
        maxSize: LOGO_MAX_SIZE,
        onDrop
    });

    //
    const handleEditClick = () => {
        if (fileInputRef.current) {
            console.log('Opening file input...');
            fileInputRef.current.click();
        } else {
            console.error('fileInputRef is not attached!');
        }
    };

    return (
        <Box>
            {logo ? (
                <Card
                    className={classes.infinize__logoUploadCard}
                    variant="outlined"
                >
                    <CardContent
                        className={classes.infinize__logoUploadCardContent}
                    >
                        <Image
                            src="/brandKit/uploadfileicon.svg"
                            alt="Upload icon"
                            width={50}
                            height={20}
                            priority
                        />
                        <Box>
                            <Typography
                                className={
                                    classes.infinize__logoUploadFileDetails
                                }
                            >
                                {fileDetails?.name}
                            </Typography>
                            <Typography
                                className={classes.infinize__logoUploadFileSize}
                            >
                                {fileDetails?.size}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={handleEditClick}>
                            <InfinizeIcon
                                icon="akar-icons:edit"
                                alt="Edit icon"
                                className={
                                    classes.infinize__logoUploadEditButton
                                }
                            />
                        </IconButton>
                    </CardActions>
                </Card>
            ) : (
                <Box
                    {...getRootProps()}
                    className={classes.infinize__logoUploadDropzone}
                >
                    <span id="uploadfile-label" style={{display: 'none'}}>
                        uploadfile
                    </span>
                    <input
                        {...getInputProps({
                            id: 'uploadfile',
                            'aria-labelledby': 'uploadfile-label'
                        })}
                    />
                    <Image
                        src="/brandKit/file.svg"
                        alt="Upload icon"
                        width={70}
                        height={30}
                        priority
                    />
                    <Typography
                        className={classes.infinize__logoUploadUploadText}
                    >
                        <Typography
                            component="span"
                            sx={{color: 'primary.main'}}
                        >
                            Click to Upload
                        </Typography>
                        &nbsp;or drag and drop <br />
                        (Max. File size: 10 MB)
                    </Typography>
                </Box>
            )}
            {errorMessage && (
                <Typography
                    className={classes.infinize__logoUploadErrorMessage}
                >
                    {errorMessage}
                </Typography>
            )}
            <label
                htmlFor="file-upload"
                style={{
                    display: 'none'
                }}
            >
                Upload File
            </label>

            <input
                type="file"
                accept={Object.values(LOGO_ACCEPTED_FORMATS).flat().join(',')}
                id="file-upload"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={e => handleFileUpload(e.target.files[0])}
            />
        </Box>
    );
}
