import { FC } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import AsyncSelect from 'react-select/async';
import { unknownData } from '../../utils/api';

export type FieldGroupOnUpdate = (
  data: unknownData,
) => void;

interface SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknownData
> {
  control: Control<TFieldValues, TContext>;
  name: string;
  data?: unknownData[];
  placeholder?: string;
  onUpdate?: FieldGroupOnUpdate;
  asyncSelect?: boolean;
  asyncOptions?: ((inputValue: string, callback: (options: OptionsOrGroups<unknown, GroupBase<unknown>>) => void) => void |
    Promise<OptionsOrGroups<unknown, GroupBase<unknown>>>) |
  undefined;
  defaultOptions?: unknownData[];
  onAsyncChange?: (selectedOption: unknownData) => void;
  defaultAsyncValue?: Record<string, string> | undefined;
  isMulti?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
  control,
  name,
  data = [],
  placeholder,
  onUpdate = () => undefined,
  asyncSelect = false,
  asyncOptions = () => undefined,
  onAsyncChange = () => undefined,
  defaultAsyncValue = undefined,
  defaultOptions = true,
  isMulti = false
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          asyncSelect ? (
            <AsyncSelect
              cacheOptions
              defaultOptions={defaultOptions}
              loadOptions={asyncOptions}
              onChange={onAsyncChange}
              defaultValue={defaultAsyncValue}
            />) : (
            <Select
              placeholder={placeholder}
              options={data}
              onChange={(val) => {
                if (Array.isArray(val)) {
                  onChange((val || []).map((c: unknownData) => c.value));
                } else {
                  onChange(val?.value);
                }
                onUpdate(val);
              }}
              isMulti={isMulti}
              value={data.filter((c: unknownData) => {
                if (Array.isArray(value)) {
                  return value.includes(c.value);
                }
                return value === c.value;
              })}
            />
          )
        )
      }}
    />
  )
}

export default SelectField;
