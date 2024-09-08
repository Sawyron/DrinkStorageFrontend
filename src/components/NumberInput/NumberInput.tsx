import { FC, useState } from 'react';
import classes from './NumberInput.module.css';

export interface INumberInputProps {
  min: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
}

const NumberInput: FC<INumberInputProps> = ({
  min = 0,
  max,
  value,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleValueChanged = (value: number) => {
    let updatedValue = Number(value);
    updatedValue = updatedValue < min ? min : updatedValue;
    if (max) {
      updatedValue = updatedValue > max ? max : updatedValue;
    }
    setSelectedValue(updatedValue);
    onChange(updatedValue);
  };

  return (
    <div className={classes['number-input']}>
      <button onClick={() => handleValueChanged(selectedValue - 1)}>-</button>
      <input
        type="number"
        min={min}
        max={max}
        value={selectedValue}
        onChange={e => handleValueChanged(Number(e.target.value))}
      />
      <button onClick={() => handleValueChanged(selectedValue + 1)}>+</button>
    </div>
  );
};

export default NumberInput;
