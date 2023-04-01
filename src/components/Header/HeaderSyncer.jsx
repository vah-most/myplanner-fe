/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { Upload, XSquare } from "react-bootstrap-icons";

import taskService from "services/TaskService";
import { syncStatusChange } from "reducers/SyncReducer";

import "./HeaderSyncer.scss";

const HeaderSyncer = () => {
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
    <React.Fragment>
      <Nav.Link>
        <XSquare className={revertClassName} onClick={handleRevertTasks} />
      </Nav.Link>
      <Nav.Link>
        <Upload className={uploadClassName} onClick={handleUploadTasks} />
      </Nav.Link>
    </React.Fragment>
  );
};

export default HeaderSyncer;
