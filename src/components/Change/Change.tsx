import { FC, useMemo } from 'react';
import { IChangeItem } from '../../types/IChangeItem';
import Price from '../Price/Price';
import Coin from '../Coin/Coin';
import { useNavigate } from 'react-router-dom';
import classes from './Change.module.css';

export interface IChangeProps {
  items: IChangeItem[];
}

const Change: FC<IChangeProps> = ({ items }) => {
  const navigate = useNavigate();
  const chage = useMemo(() => {
    console.log(items);
    console.log(items.reduce);
    return items.reduce(
      (total, current) => total + current.value * current.quantity,
      0
    );
  }, [items]);

  return (
    <>
      <h2>Спасибо за покупку!</h2>
      <h2>
        Пожалуйста, возмите вашу сдачу{' '}
        <Price
          value={chage}
          style={{ color: 'green', display: 'inline-block' }}
        />
      </h2>
      <h2>Ваши монеты:</h2>
      <div className={classes['change-items-container']}>
        {items.map(item => (
          <div className={classes['change-item']} key={item.id}>
            <Coin coin={{ id: item.id, value: item.value }} />
            <p>{item.quantity} шт.</p>
          </div>
        ))}
      </div>
      <button className="yellow-btn" onClick={() => navigate('/')}>
        Каталог товаров
      </button>
    </>
  );
};

export default Change;
