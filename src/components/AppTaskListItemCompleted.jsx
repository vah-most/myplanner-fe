const AppTaskListItemDeadline = ({ onChange, taskId, value }) => {
    return (
        <div className="form-check form-switch d-inline-block align-middle">
            <input
                className="form-check-input"
                checked={value}
                id="flexSwitchCheckChecked"
                onChange={() => {
                    onChange && onChange(
                        taskId,
                        !value
                    );
                }}
                type="checkbox"
            />
        </div>
    );
};

export default AppTaskListItemDeadline;