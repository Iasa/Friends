import { AppBar, Badge, Button, Grid, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import MailIcon from '@material-ui/icons/Mail';
import { AccountCircle } from '@material-ui/icons';
import { logOutUser } from '../Services/UserServices';
import { UserContext } from '../UserContext';

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

function Navbar(props : any) {
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const onLogOut = async () => {
    //     await logOutUser();
    //     userContext.logOut;
    // }
    
    return (
        <AppBar position="sticky" className={classes.container}>
            <Toolbar className={classes.toolbar}>
                <Grid container spacing={8} justify="space-between" >
                    <Grid item xs={4}>
                        <Typography className={classes.logo}>
                            Friends 
                        </Typography>
                    </Grid>
                    { localStorage.getItem('token') &&
                        <Grid item xs={4}>
                                <IconButton 
                                    color="inherit" 
                                    onClick={() => props.history.push('/messenger')}
                                >
                                    <Badge badgeContent={0} color="secondary">
                                        <MailIcon />
                                    </Badge>
                                </IconButton> 
                        </Grid>                 
                    }

                    { localStorage.getItem('token') && 
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
                                <MenuItem >
                                    <Button type="submit" onClick={() => {logOutUser();}}>Log out</Button>
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
