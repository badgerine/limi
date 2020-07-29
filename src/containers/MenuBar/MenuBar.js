

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import LimiIcon from '../../assets/limi.png';
import useStyles from '../Layout/styles';
import { useScrollTrigger } from '@material-ui/core';
import {withRouter} from 'react-router-dom';

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

const MenuBar = (props) => {
    const classes = useStyles();

    const menuBarPosition = () => {
        if (props.history.location.pathname.includes('story-roll')) {
            return 'relative';
        } else {
            return 'fixed';
        }
        
    }

    const authentication = (
        <Toolbar className={classes.authentication}>
            <Avatar >
                <PersonIcon />
            </Avatar>
        </Toolbar>
    );
    // const search = (
    //     <div className={classes.search}>
    //         <div className={classes.searchIcon}>
    //           <SearchIcon />
    //         </div>
    //         <InputBase
    //           placeholder="Search…"
    //           classes={{
    //             root: classes.inputRoot,
    //             input: classes.inputInput,
    //           }}
    //           inputProps={{ 'aria-label': 'search' }}
    //         />
    //       </div>
    // );

    return (
        <ElevationScroll>
            <AppBar position={menuBarPosition()} className={classes.appBar} style={{ backgroundColor: '#c9340a' }} >
                <Toolbar>
                    <img src={LimiIcon} alt="Icon" className={classes.icon} />
                    <Typography variant="h5" color="inherit" noWrap className={classes.title}>
                        Limi
                    </Typography>
                    {authentication}
                    {/* {search} */}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
};

export default withRouter(MenuBar);