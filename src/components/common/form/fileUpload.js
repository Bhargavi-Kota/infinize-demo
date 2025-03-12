import {useDropzone} from 'react-dropzone';
import {useState, useRef, useCallback} from 'react';
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';
import Image from 'next/image';
import classes from '../../brandKit/brandKit.module.css';
import {InfinizeIcon} from '../../common';

export default function FileUpload({
    file,
    setFile,
    label = 'Click to Upload',
    acceptedFormats,
    maxSize
}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [fileDetails, setFileDetails] = useState(null);
    const [filePreviewURL, setFilePreviewURL] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = file => {
        if (!file) return;

        // Ensure acceptedFormats is defined and is an array
        if (!Array.isArray(acceptedFormats)) {
            console.error(
                'acceptedFormats is undefined or not an array:',
                acceptedFormats
            );
            setErrorMessage(
                'File upload error. Accepted formats are not defined.'
            );
            return;
        }

        if (!acceptedFormats.includes(file.type)) {
            setErrorMessage('Invalid file format. Please upload a valid file.');
            return;
        }

        setFile(file);
        setFileDetails({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.type
        });

        setErrorMessage('');

        if (file.type === 'application/pdf') {
            const fileURL = URL.createObjectURL(file);
            setFilePreviewURL(fileURL);
        } else {
            setFilePreviewURL(null);
        }
    };

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        setErrorMessage('');

        if (fileRejections.length) {
            setErrorMessage(
                'Invalid file format or size. Please upload a valid file.'
            );
            return;
        }

        handleFileUpload(acceptedFiles[0]);
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        accept: acceptedFormats,
        maxSize: maxSize,
        onDrop
    });

    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Box>
            {file ? (
                <Card
                    className={classes.infinize__logoUploadCard}
                    variant="outlined"
                >
                    <CardContent
                        className={classes.infinize__logoUploadCardContent}
                    >
                        <Box mt={1}>
                            <Image
                                src="/brandKit/uploadfileicon.svg"
                                alt="Upload icon"
                                width={50}
                                height={20}
                                priority
                            />
                        </Box>
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
                            {filePreviewURL && (
                                <Typography
                                    color="primary"
                                    onClick={() =>
                                        window.open(filePreviewURL, '_blank')
                                    }
                                >
                                    Click to view
                                </Typography>
                            )}
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
                    <input {...getInputProps()} />
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
                            {label}
                        </Typography>
                        &nbsp;or drag and drop <br />
                        (Max. File size: {maxSize / 1024 / 1024} MB)
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
            <input
                type="file"
                accept={Object.values(acceptedFormats || {})
                    .flat()
                    .join(',')}
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={e => handleFileUpload(e.target.files[0])}
            />
        </Box>
    );
}
