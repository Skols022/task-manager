import { FC } from 'react';
import SelectField from './UI/SelectField';
import Button from './UI/Button';
import { Modal, useModal } from './UI/Modal';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import { useFetchCollaboratorsData } from '../hooks/useFetchCollaboratorsData';
import { remapCollaboratorsFroSelect } from '../utils/remapCollaboratorsFroSelect';
import { taskStatusOptions } from './TaskCard';
import { useDispatch } from 'react-redux';
import { setFilterByAssignee, setFilterByStatus } from '../features/tasks/taskSlice';

const BoardSettings: FC = () => {
  const { control, watch } = useForm();
  const dispatch = useDispatch()
  const { openModal, modalProps, closeModal } = useModal();
  const { data: collabData } = useFetchCollaboratorsData();
  const assignees = remapCollaboratorsFroSelect({ data: collabData || [] });

  const handleFilterByAssignee = () => {
    dispatch(setFilterByAssignee(watch('search_by_assignee')))
  }

  return (
    <div className='flex flex-col md:flex-row justify-between items-center mt-[20px]'>
      <div className='mt-[20px]'>
      <Button title='Add Task' onClick={openModal} className='w-[200px] h-[50px] mt-[20px]' />
      </div>
      <Modal {...modalProps}>
        <TaskForm onCancel={closeModal} />
      </Modal>
      <div className='mt-[20px]'>
        <h4 className='h4-text font-bold'>Search Tasks by asignee:</h4>
        <SelectField 
          isMulti={true}
          data={assignees} 
          control={control} 
          name='search_by_assignee' 
          onUpdate={handleFilterByAssignee}
        />
      </div>
      <div  className='mt-[20px]'>
        <h4 className='h4-text mr-[20px] font-bold'>Filter Tasks by Status:</h4>
        <SelectField 
          control={control} 
          name='filter_by_status' 
          data={taskStatusOptions}
          onUpdate={({ value }) => dispatch(setFilterByStatus(value))}
        />
      </div>
    </div>
  )
}

export default BoardSettings;
