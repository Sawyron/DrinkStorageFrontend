import { ChangeEvent, FC, useEffect, useState } from 'react';

export interface IPriceInputProps {
  min: number;
  max: number;
  value: number;
  onChange: (price: number) => void;
}

const PriceInput: FC<IPriceInputProps> = ({ min, max, onChange, value }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const updated = Number(event.target.value);
    setSelectedValue(updated);
    onChange(updated);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={selectedValue}
      onChange={handleValueChanged}
    ></input>
  );
};

export default PriceInput;
