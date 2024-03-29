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

    await taskService.pushTasks();
    dispatch(syncStatusChange(true));
  };

  const handleRevertTasks = async () => {
    if (synced) return null;

    await taskService.pullTasks();
    dispatch(syncStatusChange(true));
  };

  return (
    <React.Fragment>
      <Nav.Link>
        <XSquare className={revertClassName} onClick={handleRevertTasks} />
        <span className={`headerItemText ${revertClassName}`}>
          Revert Changes
        </span>
      </Nav.Link>
      <Nav.Link>
        <Upload className={uploadClassName} onClick={handleUploadTasks} />
        <span className={`headerItemText ${uploadClassName}`}>
          Store Changes
        </span>
      </Nav.Link>
    </React.Fragment>
  );
};

export default HeaderSyncer;
