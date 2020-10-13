import * as actionTypes from './actionTypes';
import axios from '../axios-stories';
import firebaseService from "../components/FirebaseService/FirebaseService";

export const fetchStoriesStart = () => {
  return {
    type: actionTypes.FETCH_STORIES_START
  }
}

export const fetchStories = () => {
  return thunkDispatch => {
    thunkDispatch(fetchStoriesStart());
    axios.get('/stories.json')
      .then(res => {
        const fetchedStories = [];
        for (let key in res.data) {
          fetchedStories.push({ id: key, ...res.data[key] });
        }
        console.log('[action.fetchStories()] fetchedStories=', fetchedStories);
        thunkDispatch(fetchStoriesSuccess(fetchedStories));
      })
      .catch(err => {
        thunkDispatch(fetchStoriesFail(err));
      })
  }
}

export const uploadStoryDetails = (newStory) => {
  return thunkDispatch => {
    axios.post('stories.json', newStory)
      .then(response => {
        thunkDispatch(uploadStory());
        console.log('[action.uploadStoryDetails()]', response);
      })
      .catch(error => {
        console.log('[action.uploadStoryDetails()] Error, something went wrong trying to persist story.', error);
      })
  }
}

export const uploadCoverImage = (file) => {
  console.log('start of upload')
  return thunkDispatch => {
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
        thunkDispatch(imageUploadComplete());
      });
  }
}

export const uploadStoryContent = (file) => {
  console.log('start of upload')
  return thunkDispatch => {
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
        thunkDispatch(contentUploadComplete());
      });
  }
}

export const addStory = (story) => {
  return {
    type: actionTypes.ADD_STORY,
    newStory: story
  }
}

export const uploadStory = () => {
  console.log('[actions.js] uploadStory');
  return {
    type: actionTypes.UPLOAD_STORY
  }
}

export const detailsUploadComplete = () => {
  return {
    type: actionTypes.DETAILS_UPLOAD_COMPLETE
  }
}

export const imageUploadComplete = () => {
  return {
    type: actionTypes.IMAGE_UPLOAD_COMPLETE
  }
}

export const contentUploadComplete = () => {
  return {
    type: actionTypes.CONTENT_UPLOAD_COMPLETE
  }
}

const fetchStoriesSuccess = (fetchedStories) => {
  return {
    type: actionTypes.FETCH_STORIES_SUCCESS,
    stories: fetchedStories
  }
}

const fetchStoriesFail = (error) => {
  return {
    type: actionTypes.FETCH_STORIES_FAIL,
    error: error
  }
}