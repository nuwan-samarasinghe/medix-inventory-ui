import React from 'react';
import {Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import {Link} from 'react-router-dom';

const SidePanel: React.FC = () => {
    return (
        <Drawer variant="permanent">
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button component={Link} to="/about">
                    <ListItemText primary="About"/>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default SidePanel;