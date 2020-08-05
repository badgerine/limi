import React, { useState, useEffect } from 'react';
import firebase from '../FirebaseService/FirebaseService';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

import useStyles from '../../containers/Layout/styles';

export default (props) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    let mediaId = null;
    console.log('query params=' + query);

    for (let param of query.entries()) {
      if ('mediaId' === param[0]) {
        mediaId = param[1];
        break;
      }
    }

    firebase.storage().ref().child(`media/${mediaId}`).getDownloadURL().then(url => {
      setVideoUrl(url);
    });
  }, []);

  const classes = useStyles();

  console.log('videoUrl: ',videoUrl);
  const video = <video id='onScreen' src={videoUrl} controls playsInline type="video/mp4" style={{ borderRadius: '5px'}} />

  return (
    <Container component="main" maxWidth="lg" style={{ backgroundColor: '#000000', height: '100vh' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography align='center' component="h1" variant="h5">
          Story name
        </Typography>
        <Card className={classes.card} style={{ backgroundColor: '#000000'}}>
          {video}
        </Card>
      </div>
    </Container>
  );
}
