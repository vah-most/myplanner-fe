/*
 * Created on Wed Jul 13 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import taskService from "services/TaskService";
import { syncStatusChange } from "reducers/SyncReducer";

import AppIcon from "./common/AppIcon";

import "./AppSyncer.scss";

const AppSyncer = () => {
  const dispatch = useDispatch();
  const synced = useSelector((state) => state.sync.value);

  const revertClassName = `syncIcon ${
    synced ? "" : "syncIconUnsynced syncIconUnsyncedRevert"
  }`;
  const uploadClassName = `syncIcon ${
    synced ? "" : "syncIconUnsynced syncIconUnsyncedUpload"
  }`;

  const handleUploadTasks = () => {
    if (synced) return null;

    taskService.storeTasks();
    dispatch(syncStatusChange(true));
  };

  const handleRevertTasks = () => {
    if (synced) return null;

    taskService.reloadTasks();
    dispatch(syncStatusChange(true));
  };

  return (
    <div className="syncButtonsContainer">
      <AppIcon
        className={revertClassName}
        name="undo"
        onClick={handleRevertTasks}
      />
      <AppIcon
        className={uploadClassName}
        name="upload"
        onClick={handleUploadTasks}
      />
    </div>
  );
};

export default AppSyncer;
