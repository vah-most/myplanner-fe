import React from 'react';

import AppHeader from "./AppHeader";
import AppTaskList from './AppTaskList';

import "./AppMainView.scss";

const MainView = () => {
    return (
        <React.Fragment>
            <AppHeader className="mainHeader" />
            <AppTaskList className="mainTaskList" />
        </React.Fragment>
    );
};

export default MainView;