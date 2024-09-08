import { ChangeEvent, FC, useState } from 'react';

export type SelectOption = {
  label: string;
  value: string;
};

export interface ISelectProps {
  options: SelectOption[];
  onChange: (value: string) => void;
  selectedOption?: SelectOption;
}

const Select: FC<ISelectProps> = ({ options, selectedOption, onChange }) => {
  const [selecedValue, setSelectedValue] = useState<string | undefined>(
    selectedOption?.value ?? options[0]?.value
  );

  const handleValueChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select value={selecedValue} onChange={handleValueChanged}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
