import React from 'react';

import AppHeader from "./AppHeader";
import AppTaskList from './AppTaskList';

const MainView = () => {
    return (
        <React.Fragment>
            <AppHeader />
            <AppTaskList />
        </React.Fragment>
    );
};

export default MainView;