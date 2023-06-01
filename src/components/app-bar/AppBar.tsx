import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

const CustomAppBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">My App</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;