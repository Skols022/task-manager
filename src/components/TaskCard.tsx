import { FC } from 'react';

interface TaskCardProps {
  name: string;
  description: string;
  status: string;
  assignedTo: string;
  draggable: boolean;
  onDragStart: () => number;
  onDragEnter: () => number;
  onDragEnd: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ 
  name, 
  description, 
  status, 
  assignedTo, 
  draggable,
  onDragStart,
  onDragEnter,
  onDragEnd }) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className='flex-col items-center  bg-gradient-to-r from-zinc-100 to-zinc-300 w-full border border-2 rounded-lg border-emerald-500 my-[20px] p-[20px] shadow-lg'>
      <div className='flex items-center'><h4 className='h4-text mr-[5px] font-normal'>Name:</h4><h4 className='h4-text font-bold'>{name}</h4></div>
      <div className='flex-column-center my-[10px]'>
        <p className='p-text font-normal'>Description:</p>
        <p className='p-text font-bold'>{description}</p>
      </div>
      <div>
        <p className='p-text font-normal'>Assigned to:</p>
        <p className='h4-text font-bold'>{assignedTo}</p>
      </div>
      <div className='flex items-center justify-end'>
        <p className='p-text mr-[5px]'>Status:</p>
        <p className='p-text text-green-400'>{status}</p>
      </div>
    </div>
  )
}

export default TaskCard;