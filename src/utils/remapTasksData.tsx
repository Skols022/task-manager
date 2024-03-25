import { unknownData } from './api';

export const remapTasksData = (
  { data = [] }: { data: unknownData[] }
) => {
  return (data || []).map(({ completed_at, content, task_id, assigneeId, id, description, ...rest }) => ({
    isCompleted: !!completed_at,
    content,
    description,
    assigneeId: assigneeId,
    taskStatus: completed_at ? 'completed' : 'in_progress',
    inProgressTaskId: id,
    completedTaskId: task_id,
    otherData: { ...rest }
  })) || [];
}
