import { AppBar, Badge, Button, Grid, IconButton, Link, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    container: {
       // display : 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#1976d2',
        alignItems: 'center'
    },
    toolbar: {
        minWidth: '50%'
    },
    logo: {
        //flexGrow: 0.3,
        color: 'white',
        cursor: 'pointer',
        fontSize: 30,
        fontFamily: 'Brush Script MT'
    },
    menuLinks: {
        //flexGrow: 0.7
        float: 'right'
    },
    buttons: {
       // marginLeft: theme.spacing(2)
    }

}))

function Navbar() {
    const classes = useStyles();
    const auth = true;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <AppBar  position="static" className={classes.container}>
            <Toolbar className={classes.toolbar}>
                <Grid container spacing={8} justify="space-between" >
                    <Grid item xs={4}>
                        <Typography>
                            <Link className={classes.logo}  underline="none">Friends</Link>
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Link href="/messenger" color="inherit">
                            <IconButton color="inherit" >
                                <Badge badgeContent={0} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton> 
                        </Link>
                    </Grid>

                    <Grid item xs={4}>
                        <IconButton 
                            aria-controls="accountMenu"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="accountMenu"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Log out</MenuItem>
                        </Menu>
                    </Grid>

                </Grid>
                
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
