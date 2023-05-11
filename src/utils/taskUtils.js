export const getExistingTaskTags = (tasks) => {
  let tags = new Set();
  tasks.forEach((t) => {
    if (!t.tags) return;
    tags = new Set([...tags, ...t.tags]);
  });

  return tags;
};
