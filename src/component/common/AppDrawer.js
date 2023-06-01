import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import useTheme from "@material-ui/core/styles/useTheme";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import WorkIcon from '@material-ui/icons/Work';
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {connect} from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const AppDrawer = (props) => {
    const theme = useTheme();
    const classes = useStyles();

    const handleDrawerClose = () => {
        props.toggleMenu();
    };

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.isMenuExpanded,
                [classes.drawerClose]: !props.isMenuExpanded,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.isMenuExpanded,
                    [classes.drawerClose]: !props.isMenuExpanded,
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
                <ListItem button={true} {...{component: NavLink, to: "/"}} key="dashboard">
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem button={true} {...{component: NavLink, to: "/vacancies"}} key="vacancies">
                    <ListItemIcon>
                        <WorkIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Vacancies"/>
                </ListItem>
                <ListItem button={true} {...{component: NavLink, to: "/interviewers"}} key="interviewers">
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Interviewers"/>
                </ListItem>
                <ListItem button={true} {...{component: NavLink, to: "/candidates"}} key="candidates">
                    <ListItemIcon>
                        <SchoolIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Candidates"/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button={true} {...{component: NavLink, to: "/settings"}} key="settings">
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                </ListItem>
            </List>
        </Drawer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isMenuExpanded: state.isMenuExpanded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: () => {
            // dispatch(toggleMenu())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);
