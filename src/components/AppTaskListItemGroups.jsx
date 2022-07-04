import AppTextBubble from "./common/AppTextBubble";

import "./AppTaskListItemGroups.scss";

const AppTaskListItemGroups = ({ groups }) => {
  return (
    <div className="taskGroups">
      {groups.map((group, i) => {
        return (
          <AppTextBubble key={i} className="taskGroupsItem" text={group} />
        );
      })}
    </div>
  );
};

export default AppTaskListItemGroups;
