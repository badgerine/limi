import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import firebaseService from "../FirebaseService/FirebaseService";
import * as actions from '../../store/actions';

export const MediaUploader = (props) => {
    const allInputs = { mediaUrl: '' };
    const [mediaAsFile, setMediaAsFile] = useState('');
    const [mediaAsObjectUrl, setmediaAsObjectUrl] = useState(null);
    const [uploadFeedback, setUploadFeedback] = useState('Do not close. Uploading...');

    const uploadMediaComplete = useSelector(state => state.storyUploadComplete);
    const uploadMedia = useSelector(state => state.uploadStory);
    const dispatch = useDispatch();
    const onUploadComplete = () => dispatch(actions.mediaUploadComplete());

    useEffect(() => {
        if (uploadMedia) {
            handleFireBaseUpload();
        }
    }, [uploadMedia]);

    const handleMediaAsFile = (e) => {
        const media = e.target.files[0];
        setMediaAsFile(media);
        setmediaAsObjectUrl(URL.createObjectURL(media));
        props.getMediaId(media.name);
    }

    const handleFireBaseUpload = e => {
        // e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if (mediaAsFile === '') {
            console.error(`unsupported media type, the media file is a ${typeof (mediaAsFile)}`)
        }

        const uploadTask = firebaseService.storage().ref(`/media/${mediaAsFile.name}`).put(mediaAsFile);
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                setUploadFeedback(snapShot.size);
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                setUploadFeedback('Upload complete.');
                onUploadComplete();
            });
    }

    let captureMedia = uploadMedia ?
        <div>
            <h3>{props.storyTitle}</h3>
            {uploadFeedback}
        </div>
        : (
            uploadMediaComplete ?
                <div>
                    <h3>{props.storyTitle}</h3>
                    {uploadFeedback}
                </div>
                : <div>
                    <h3>{props.storyTitle}</h3>
                    <input
                        type="file"
                        onChange={handleMediaAsFile}
                    />
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