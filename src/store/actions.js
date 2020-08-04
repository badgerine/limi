import * as actionTypes from './actionTypes';
import axios from '../axios-stories';

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
            for(let key in res.data) {
                fetchedStories.push({id: key, ...res.data[key]});
            }
            console.log('[action.fetchStories()] fetchedStories=',fetchedStories);
            thunkDispatch(fetchStoriesSuccess(fetchedStories));
        })
        .catch(err => {
            thunkDispatch(fetchStoriesFail(err));
        })
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

export const mediaUploadComplete = () => {
    return {
        type: actionTypes.STORY_UPLOAD_COMPLETE
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