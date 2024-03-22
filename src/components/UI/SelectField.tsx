import { FC } from 'react';
import Select from 'react-select';

const options = [
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

const SelectField: FC = () => {
  return (
    <div>
      <Select options={options} />
    </div>
  )
}

export default SelectField;
