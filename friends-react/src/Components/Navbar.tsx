import { AppBar, Badge, Grid, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import MailIcon from '@material-ui/icons/Mail';
import { AccountCircle } from '@material-ui/icons';
import { logOutUser } from '../Services/UserServices';
import { UserContext } from '../UserContext';
import { Link, useHistory } from 'react-router-dom';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';

const useStyles = makeStyles((theme) => ({
    container: {
       // display : 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'steelblue',
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
        fontFamily: 'Brush Script MT',
        underline: 'none'
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
    const userContext = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogOut = async () => {
        await logOutUser();
        userContext.logOut();
        setAnchorEl(null);
        history.replace("/login");
    }
    
    return (
        <AppBar position="sticky" className={classes.container}>
            <Toolbar className={classes.toolbar}>
                <Grid container spacing={8} justify="space-between" >
                    <Grid item xs={3}>
                        <Link to="/messenger" style={{textDecoration:'none'}}> 
                            <Typography className={classes.logo}>
                                Friends 
                            </Typography>
                        </Link>
                    </Grid>
                    { localStorage.getItem('token') &&
                        <Grid item xs={3}>
                            <Link to="/messenger" style={{ color: "inherit" }}>    
                                <IconButton 
                                    color="inherit" 
                                >
                                    <Badge badgeContent={0} color="secondary">
                                        <MailIcon />
                                    </Badge>
                                </IconButton> 
                            </Link>
                        </Grid>                 
                    }

                    { localStorage.getItem('token') &&
                        <Grid item xs={3}>
                            <Link to="/addfriends" style={{ color: "inherit" }}>    
                                <IconButton 
                                    color="inherit" 
                                >
                                    <Badge badgeContent={0} color="secondary">
                                        <GroupAddRoundedIcon />
                                    </Badge>
                                </IconButton> 
                            </Link>
                        </Grid>                 
                    }

                    { localStorage.getItem('token') && 
                        <Grid item xs={3}>
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
                                <MenuItem>
                                    <Link to="/profilePage"  onClick={handleClose} style={{ color: "inherit", textDecoration: 'none' }}>
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={onLogOut}>
                                    Log out
                                </MenuItem>
                            </Menu>
                        </Grid>
                    }
                </Grid>
                
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
