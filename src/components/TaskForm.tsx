import { FC } from 'react';
import { useForm } from 'react-hook-form';
import SelectField from './UI/SelectField';
import InputField from './UI/InputField';
import { useDispatch } from 'react-redux'
import { CreateTaskProps, createNewTask } from '../features/tasks/taskSlice';
import { AppDispatch } from '../app/store';
import { unknownData } from '../utils/api';
import { useFetchCollaboratorsData } from '../hooks/useFetchCollaboratorsData';
import { remapCollaboratorsFroSelect } from '../utils/remapCollaboratorsFroSelect';

interface TaskFormProps {
  onCancel?: () => void;
}

const TaskForm: FC<TaskFormProps> = ({ onCancel = () => undefined }): JSX.Element => {
  const { data: collabData, isLoading } = useFetchCollaboratorsData();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { handleSubmit, control, register } = useForm<unknownData>();
  const assignees = remapCollaboratorsFroSelect({ data: collabData || [] });

  const submit = async (data: CreateTaskProps): Promise<void> => {
    await dispatch(createNewTask(data)).unwrap();
  }

  return (
    <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={handleSubmit(submit)}>
        {isLoading ? <p>Collaborators Loading...</p> :
          <>
            <h4 className='h4-text font-bold text-center mb-[20px]'>Create New Task</h4>
            <InputField 
              placeholder='Name' 
              control={control} 
              type='text' 
              name='content' 
            />
            <InputField 
              placeholder='Description' 
              control={control} 
              type='text' 
              name='description' 
            />
            <SelectField 
              placeholder='Select Assignee' 
              control={control} 
              name='assignee_id' 
              data={assignees} 
            />
            <input
              type='hidden'
              value={import.meta.env.VITE_PROJECT_ID}
              {...register("project_id", { required: true })}
            />
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Submit
              </button>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </>
        }
      </form>
    </div>
  )
}
export default TaskForm;