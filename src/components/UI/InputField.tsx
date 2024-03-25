import { FC } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form';
import { unknownData } from '../../utils/api';

interface InputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknownData
> {
  type: string;
  control: Control<TFieldValues, TContext>;
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

const InputField: FC<InputFieldProps> = ({ 
  type, 
  control, 
  name, 
  defaultValue, 
  placeholder 
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <div className='mb-4'>
          <input
            className='hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text'
            defaultValue={defaultValue}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
          />
        </div>
      )}
    />
  )
}

export default InputField;