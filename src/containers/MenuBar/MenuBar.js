

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import LimiIcon from '../../assets/limi.png';
import useStyles from '../Layout/styles';
import './MenuBar.css';




const MenuBar = (props) => {
    const classes = useStyles();

    const search = null;
    const authentication = null;
    return (
        <AppBar position="relative" className={classes.appBar}>
            <Toolbar>
                <img src={LimiIcon} alt="Icon" className={classes.icon} />
                <Typography variant="h6" color="inherit" noWrap>
                    Limi
                </Typography>
                {search}
                {authentication}
            </Toolbar>
        </AppBar>
    )
};

export default MenuBar;