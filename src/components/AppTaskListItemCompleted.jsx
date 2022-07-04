const AppTaskListItemCompleted = ({ onChange, taskId, value }) => {
  return (
    <div className="form-check form-switch d-inline-block align-middle hand">
      <input
        className="form-check-input hand"
        checked={value}
        id="flexSwitchCheckChecked"
        onChange={() => {
          onChange && onChange(taskId, !value);
        }}
        type="checkbox"
      />
    </div>
  );
};

export default AppTaskListItemCompleted;
