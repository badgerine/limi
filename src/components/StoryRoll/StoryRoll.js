import React, { Component } from 'react';
import firebase from '../FirebaseService/FirebaseService';

class StoryRoll extends Component {
  state = {
    videoUrl: null
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let mediaId = null;
    console.log('query params=' + query);

    for (let param of query.entries()) {
      if ('mediaId' === param[0]) {
        mediaId = param[1];
        break;
      }
    }

    firebase.storage().ref().child(`media/${mediaId}`).getDownloadURL().then(url => {
      this.setState({ videoUrl: url });
    });
  }

  render() {
    console.log('videoUrl: ');
    console.log(this.state.videoUrl);
    const video = <video id='onScreen' src={this.state.videoUrl} controls playsInline type="video/mp4" style={{width: '100%'}}/>

    return (
      <div>
        {video}
      </div>
    );
  }

}

export default StoryRoll;