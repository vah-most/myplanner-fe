import AppIcon from "./common/AppIcon";

import "./AppTaskEditor.scss";

const AppTaskEditor = ({ hide = true, onClose, width = "100%" }) => {
    return (
        <div className="taskEditor" style={{ width: hide ? "0%" : width }}>
            <div className="taskEditorCloser">
                <AppIcon className="hand" name="times" onClick={onClose} />
            </div>
        </div>
    );
};

export default AppTaskEditor;