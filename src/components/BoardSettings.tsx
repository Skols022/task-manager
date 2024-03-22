import { FC } from 'react';
import SelectField from './UI/SelectField';

const BoardSettings: FC = () => {
  return (
    <div className='flex-center mt-[20px]'>
      <p className='p-text mr-[20px] font-bold'>Filter Tasks by Status:</p>
      <SelectField />
    </div>
  )
}

export default BoardSettings;
