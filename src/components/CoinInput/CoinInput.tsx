import { FC, useMemo, useState } from 'react';
import { ICoin } from '../../types/ICoin';
import Coin from '../Coin/Coin';
import Price from '../Price/Price';
import NumberInput from '../NumberInput/NumberInput';
import classes from './CoinInput.module.css';

export interface ICoinInputProps {
  coin: ICoin;
  intial: number;
  onChange: (count: number) => void;
}

const CoinInput: FC<ICoinInputProps> = ({ coin, intial, onChange }) => {
  const [count, setCount] = useState(intial);
  const totalPrice = useMemo(() => coin.value * count, [count, coin]);

  const handleCountChanged = (count: number) => {
    setCount(count);
    onChange(count);
  };

  return (
    <tr>
      <td>
        <div className={classes['coin-container']}>
          <Coin coin={coin} />
          <Price value={coin.value} />
        </div>
      </td>
      <td>
        <NumberInput min={0} value={count} onChange={handleCountChanged} />
      </td>
      <td>
        <Price value={totalPrice} />
      </td>
    </tr>
  );
};

export default CoinInput;
