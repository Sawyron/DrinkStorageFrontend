import { FC, HTMLAttributes, useMemo } from 'react';

export interface IPriceProps extends HTMLAttributes<HTMLParagraphElement> {
  value: number;
}

const Price: FC<IPriceProps> = ({ value, ...props }) => {
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }),
    []
  );
  return <p {...props}>{formatter.format(value)}</p>;
};

export default Price;
