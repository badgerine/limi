
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LimiIcon from '../../assets/limi.png';
import useStyles from '../Layout/styles';
import './MenuBar.css';



const MenuBar = (props) => {
    const classes = useStyles();

    return (<AppBar position="relative" className={classes.appBar}>
        <Toolbar>
            <img src={LimiIcon} alt="Icon" className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
                Limi
        </Typography>
        </Toolbar>
    </AppBar>
    )
};

export default MenuBar;