import { FC } from 'react';
import classes from './Coin.module.css';
import { ICoin } from '../../types/ICoin';

export interface ICoinProps {
  coin: ICoin;
}

const Coin: FC<ICoinProps> = ({ coin }) => {
  return (
    <div className={classes.coin}>
      <p>{coin.value}</p>
    </div>
  );
};

export default Coin;
