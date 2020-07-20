import React from 'react';
import * as actionTypes from './actionTypes';

const initialState = {
    storiesPending: false,
    storiesLoaded: false,
    storiesModified: false,
    error: null,
    stories: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STORIES_START:
            return {
                ...state,
                storiesPending: true
            };
        case actionTypes.FETCH_STORIES_SUCCESS:
            return {
                ...state,
                storiesPending: false,
                storiesLoaded: true,
                storiesModified: false,
                stories: [...action.stories]
            }
        case actionTypes.FETCH_STORIES_FAIL:
            return {
                ...state,
                storiesPending: false,
                storiesLoaded: false,
                error: action.error
            }
        case actionTypes.ADD_STORY:
            const updatedStories = [...state.stories].push(action.newStory);
            return {
                ...state,
                stories: updatedStories,
                storiesModified: true
            }
        default:
            return state;
    }
    return state;
}

export default reducer;