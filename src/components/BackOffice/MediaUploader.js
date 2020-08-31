import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import firebaseService from "../FirebaseService/FirebaseService";
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../ui/Spinner/Spinner';
import { Button, ButtonBase } from '@material-ui/core';
import * as actions from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    fileSelector: {
        width: '100%',
        height: '100%',
    },
    img: {
        maxHeight: '21rem',
        maxWidth: '100%',
        margin: 'auto',
    },
}));

export const MediaUploader = (props) => {
    const allInputs = { mediaUrl: '' };
    const [mediaAsObjectUrl, setmediaAsObjectUrl] = useState(null);
    const [coverImageUrl, setCoverImageUrl] = useState(null);
    const [isCoverCaptured, setCoverCaptured] = useState(false);
    const [uploadFeedback, setUploadFeedback] = useState('Do not close. Uploading...');
    const [isMediaUploaded, setMediaUploaded] = useState(false);
    const [isCoverUploaded, setCoverUploaded] = useState(false);
    const uploadMediaComplete = useSelector(state => state.storyUploadComplete);
    const uploadMedia = useSelector(state => state.uploadStory);
    const dispatch = useDispatch();
    const onUploadComplete = () => dispatch(actions.mediaUploadComplete());
    const hiddenFileInput = useRef();
    const classes = useStyles();

    useEffect(() => {
        if (uploadMedia) {
            handleAllFileUploads();
        }
    }, [uploadMedia]);

    useEffect(() => {
        if (isCoverUploaded && isMediaUploaded) {
            uploadMediaComplete();
        }
    }, [isCoverUploaded, isMediaUploaded]);

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const handleMediaAsFile = (e) => {
        const media = e.target.files[0];
        setmediaAsObjectUrl(URL.createObjectURL(media));
        props.getMediaId(media.name);
    }

    const handleCoverAsFile = (e) => {
        const cover = e.target.files[0];
        setCoverImageUrl(URL.createObjectURL(cover));
        props.getMediaId(cover.name);
        setCoverCaptured(true);
    }

    const handleFireBaseUpload = (file, updateUploadStatus) => {
        // e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if (file === '') {
            console.error(`unsupported media type, the media file is a ${typeof (file)}`)
        }

        const uploadTask = firebaseService.storage().ref(`/media/${file.name}`).put(file);
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log('file uploaded part', snapShot.size);
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                setUploadFeedback('Upload complete.');
                updateUploadStatus();
            });
    }

    const handleAllFileUploads = () => {
        handleFireBaseUpload(coverImageUrl, () => setCoverUploaded(true));
        handleFireBaseUpload(mediaAsObjectUrl, () => setMediaUploaded(true));
    }

    let captureMedia = uploadMedia ?
        <div>
            <h3>{props.storyTitle}</h3>
            {uploadFeedback}
            <Spinner />
        </div>
        : (
            uploadMediaComplete ?
                <div>
                    <h3>{props.storyTitle}</h3>
                    {uploadFeedback}
                </div> :
                <div>
                    <h3>{props.storyTitle}</h3>
                    <ButtonBase className={classes.fileSelector}>
                        {isCoverCaptured ?
                            <Button onClick={handleClick} variant='contained' color='primary'>
                                {mediaAsObjectUrl ? <img className={classes.img} src={mediaAsObjectUrl} alt="Media Visualisation" /> : 'Upload Story Media'}
                                <input ref={hiddenFileInput} type="file" onChange={handleMediaAsFile} hidden />
                            </Button> :
                            <Button onClick={handleClick} variant='contained' color='primary'>
                            {coverImageUrl ? <img className={classes.img} src={coverImageUrl} alt="Cover Image Visualisation" /> : 'Upload Cover Image'}
                            <input ref={hiddenFileInput} type="file" onChange={handleCoverAsFile} hidden />
                        </Button>
                        }
                    </ButtonBase>
                    {coverImageUrl != null && mediaAsObjectUrl == null ? (
                        <div style={{ maxWidth: '120px', maxHeight: '120px' }} >
                            <img src={coverImageUrl} alt="cover image visualisation" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        </div>
                    ) : null}
                    {mediaAsObjectUrl != null ? (
                        <div style={{ maxWidth: '120px', maxHeight: '120px' }} >
                            <img src={mediaAsObjectUrl} alt="media visualisation" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        </div>
                    ) : null}
                </div>
        );

    return <React.Fragment>
        {captureMedia}
    </React.Fragment>;
}