import React, { useState, useEffect } from 'react';
import firebase from '../FirebaseService/FirebaseService';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScheduleIcon from '@material-ui/icons/Schedule';

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
  const video = <video id='onScreen' src={videoUrl} controls playsInline type="video/mp4" style={{ borderRadius: '5px' }} />

  return (
    // <div style={{ backgroundColor: '#000000', height: '100vh' }}>
    //   <div style={{
    //     marginLeft: 'auto',
    //     marginRight: 'auto',
    //     width: '90%',
    //     height: '90%',
    //     paddingTop: '5%',
    //     paddingBottom: '5%',
    //   }}>
    //     {video}
    //   </div>
    // </div>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Story name
        </Typography>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            src={videoUrl}
            title={'Story Title'}
          />
        </Card>
      </div>
    </Container>
  );
}
