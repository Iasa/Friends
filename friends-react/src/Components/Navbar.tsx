import { AppBar, Badge, Grid, IconButton, Link, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
    container: {
        display : 'flex',
        justifyContent: 'space-between'
    },
    logo: {
        flexGrow: 0.3
    },
    menuLinks: {
        flexGrow: 0.7
    }

}))

function Navbar() {
    const classes = useStyles();
    
    return (
        <AppBar  position="static" className={classes.container}>
            <Toolbar>
                <Typography variant="h6" className={classes.logo}>
                    Friends
                </Typography>
                
                <div className={classes.menuLinks}>
                    <Link color="inherit">
                        <IconButton color="inherit" >
                            <Badge badgeContent={1} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton> 
                    </Link>

                    <Link color="inherit">
                        <IconButton color="inherit" >
                            <Badge badgeContent={1} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> 
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
