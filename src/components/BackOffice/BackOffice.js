import React, { Component } from 'react';
// import './BackOffice.css';

class BackOffice extends Component {
    state = {
        newStory: null,
        selectedStory: null,
        addingStory: false,
        edittingStory: false
    }

    render() {
        return (
            <React.Fragment>
                <h1>Story Admin</h1>
                <div>
                    <span><input type="text" /> <button>Search</button></span>
                </div>
                <br />
                <div>
                    <span>New Story <button>Add</button></span>
                </div>
                <br />
                <div>
                    <span> Remove Stories <button>Go</button></span>
                </div>
                <br />
            </React.Fragment>
        );
    }
}

export default BackOffice;