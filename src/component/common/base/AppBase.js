import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Switch} from "react-router-dom";
import AppHeader from "../appheader/AppHeader";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import {NavLink} from 'react-router-dom';
import Dashboard from "../../dashboard/Dashboard";
import UserManagement from "../../usermanagement/UserManagement";
import ProtectedRoute from "../ProtectedRoute";
import GoodReceivingNote from "../../goodreceivenote/GoodReceivingNote";

const drawerWidth = 295;

const useStyles = makeStyles((theme) => ({
    selected: {
        backgroundColor: `rgb(12 107 25 / 50%) !important`,
    },
    selectedSub: {
        backgroundColor: `rgb(12 107 25 / 20%) !important`,
    },
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

export default function AppBase() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [orderOpen, setOrderOpen] = React.useState(false);
    const [adminOpen, setAdminOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedIndexOrder, setSelectedIndexOrder] = React.useState(0);
    const [selectedIndexAdmin, setSelectedIndexAdmin] = React.useState(0);
    const handleOrderSubmenuClick = (event, index) => {
        setSelectedIndexOrder(index);
        setSelectedIndexAdmin(-1);
    }

    const handleAdminSubmenuClick = (event, index) => {
        setSelectedIndexOrder(-1);
        setSelectedIndexAdmin(index);
    }
    const handleOrderClick = (event, index) => {
        setOrderOpen(!orderOpen);
        setSelectedIndex(index);
        setAdminOpen(false);
    };
    const handleAdminClick = (event, index) => {
        setAdminOpen(!adminOpen);
        setSelectedIndex(index);
        setOrderOpen(false);
    };

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppHeader handleDrawerOpen={handleDrawerOpen} open={open}/>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        classes={{selected: classes.selected}}
                        onClick={(event) => handleOrderClick(event, 1)}>
                        <ListItemIcon>
                            <LocalShippingIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Orders"/>
                        {orderOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={orderOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem
                                button
                                className={classes.nested} {...{component: NavLink, to: '/good-receiving-note'}}
                                selected={selectedIndexOrder === 1}
                                classes={{selected: classes.selectedSub}}
                                onClick={(event) => handleOrderSubmenuClick(event, 1)}
                                key="good-receiving-note">
                                <ListItemIcon>
                                    <ReceiptIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Good Receiving Note"/>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                <Divider/>
                <ListItem
                    button
                    selected={selectedIndex === 3}
                    classes={{selected: classes.selected}}
                    onClick={(event) => handleAdminClick(event, 3)}>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Administration"/>
                    {adminOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem
                            button
                            className={classes.nested} {...{component: NavLink, to: "/user-management"}}
                            selected={selectedIndexAdmin === 0}
                            classes={{selected: classes.selectedSub}}
                            onClick={(event) => handleAdminSubmenuClick(event, 0)}
                            key="user-management">
                            <ListItemIcon>
                                <PeopleOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="User Management"/>
                        </ListItem>
                    </List>
                </Collapse>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Switch>
                    <ProtectedRoute exact path='/' component={Dashboard}/>
                    <ProtectedRoute exact path='/user-management' component={UserManagement}/>
                    <ProtectedRoute exact path='/good-receiving-note' component={GoodReceivingNote}/>
                </Switch>
            </main>
        </div>
    );
}
