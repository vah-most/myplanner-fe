/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

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
