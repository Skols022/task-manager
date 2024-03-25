import { User } from '@doist/todoist-api-typescript';
import { FC } from 'react';
import SelectField from './UI/SelectField';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { closeTask, reopenTask } from '../features/tasks/taskSlice';
import { useForm } from 'react-hook-form';
import { ServedTasks } from '../hooks/useFetchTasksData';

interface TaskCardProps {
  data: ServedTasks;
  collabData?: User[] | null;
  draggable?: boolean;
  onDragStart?: () => number;
  onDragEnter?: () => number;
  onDragEnd?: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const taskStatusOptions = [
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const TaskCard: FC<TaskCardProps> = ({
  data,
  collabData,
  draggable,
  onDragStart,
  onDragEnter,
  onDragEnd }) => {
  const { control } = useForm()
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const assignee = collabData?.find((user: User) => user.id === data?.assigneeId);

  const handleCloseTask = async ({ value }: { value: string }) => {
    await dispatch(
      value === 'in_progress' ? 
      reopenTask(data?.completedTaskId as string) : 
      closeTask(data?.inProgressTaskId as string)
    ).unwrap();
  }

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={`flex-col items-center  bg-gradient-to-r from-zinc-100 to-zinc-300 w-full border-2 rounded-lg ${data?.isCompleted ? 'border-emerald-500' : 'border-orange-400'} my-[20px] p-[20px] shadow-lg`}>
      <div className='flex items-center'>
        <h4 className='h4-text mr-[5px] font-normal'>Name:</h4>
        <h4 className='h4-text font-bold'>{data?.content}</h4>
      </div>
      <div className='flex-column-center my-[10px]'>
        <p className='p-text font-normal'>Description:</p>
        <p className='p-text font-bold'>{data?.description || 'No description'}</p>
      </div>
      <div>
        <p className='p-text font-normal'>Assigned to:</p>
        <p className='h4-text font-bold'>{assignee ? assignee?.name : 'Unassigned'}</p>
      </div>
      <div className='flex items-center justify-end'>
        <p className='p-text mr-[5px]'>Status:</p>
        <SelectField
          asyncSelect={true}
          control={control}
          defaultOptions={taskStatusOptions}
          onAsyncChange={handleCloseTask}
          name='status'
          placeholder='Select Status'
          defaultAsyncValue={data?.isCompleted ? taskStatusOptions[1] : taskStatusOptions[0]}
          textColor={data?.isCompleted ? '#22c55e' : '#f97316'}
        />
      </div>
    </div>
  )
}

export default TaskCard;