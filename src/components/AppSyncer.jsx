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
import AppTooltip from "./common/AppTooltip";

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
        id="menu_undo"
        name="undo"
        onClick={handleRevertTasks}
      />
      <AppTooltip target="menu_undo">Revert to last synced data</AppTooltip>
      <AppIcon
        className={uploadClassName}
        name="upload"
        id="menu_upload"
        onClick={handleUploadTasks}
      />
      <AppTooltip target="menu_upload">Upload data to server</AppTooltip>
    </div>
  );
};

export default AppSyncer;
