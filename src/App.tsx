import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CustomAppBar from "./components/app-bar/AppBar";
import SidePanel from "./components/side-pannel/SidePanel";
import Home from "./pages/home/Home";
import About from "./pages/about/About";

const App: React.FC = () => {
    return (
        <Router>
            <div style={{display: 'flex'}}>
                <CustomAppBar/>
                <SidePanel/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
