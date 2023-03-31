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

import AimoTooltip from "@aimo.ui/aimo-tooltip";

import "./AppSyncer.scss";
import { ArrowCounterclockwise, Upload } from "react-bootstrap-icons";

const AppSyncer = () => {
  const dispatch = useDispatch();
  const synced = useSelector((state) => state.sync.value);

  const revertClassName = `syncIcon ${
    synced ? "" : "syncIconUnsynced syncIconUnsyncedRevert"
  }`;
  const uploadClassName = `syncIcon ${
    synced ? "" : "syncIconUnsynced syncIconUnsyncedUpload"
  }`;

  const handleUploadTasks = async () => {
    if (synced) return null;

    await taskService.storeTasks();
    dispatch(syncStatusChange(true));
  };

  const handleRevertTasks = async () => {
    if (synced) return null;

    await taskService.reloadTasks();
    dispatch(syncStatusChange(true));
  };

  return (
    <div className="syncButtonsContainer">
      <ArrowCounterclockwise
        className={revertClassName}
        onClick={handleRevertTasks}
      />
      <AimoTooltip target="menu_undo">Revert to last synced data</AimoTooltip>
      <Upload className={uploadClassName} onClick={handleUploadTasks} />
      <AimoTooltip target="menu_upload">Upload data to server</AimoTooltip>
    </div>
  );
};

export default AppSyncer;
