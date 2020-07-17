import React, { useState } from 'react'
import firebaseService from "../FirebaseService/FirebaseService";

export const MediaUploader = (props) => {
    const allInputs = { imgUrl: '' };
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);

    console.log(imageAsFile)
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(image);
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }
        props.getMediaId(imageAsFile.name);
        const uploadTask = firebaseService.storage().ref(`/media/${imageAsFile.name}`).put(imageAsFile);
        uploadTask.on( 'state_changed', 
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot)
        }, (err) => {
          //catches the errors
          console.log(err)
        }, () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          
          firebaseService.storage().ref('media').child(imageAsFile.name).getDownloadURL()
           .then(fireBaseUrl => {
             setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
           })
        });
    }

    return (
        <div className="App">
            <h3>{props.storyTitle}</h3>
            <form onSubmit={handleFireBaseUpload}>
                <input
                    type="file"
                    onChange={handleImageAsFile}
                />
                <button>upload to firebase</button>
            </form>
            <img src={imageAsUrl.imgUrl} alt="image tag" />
        </div>
    );
}