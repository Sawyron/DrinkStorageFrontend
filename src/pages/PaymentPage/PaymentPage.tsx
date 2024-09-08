import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ICoin } from '../../types/ICoin';
import CoinService from '../../services/CoinService';
import CoinInput from '../../components/CoinInput/CoinInput';
import classes from './PaymentPage.module.css';
import Price from '../../components/Price/Price';
import CartService from '../../services/CartService';
import { useNavigate } from 'react-router-dom';

type CoinCount = {
  coin: ICoin;
  count: number;
};

const PaymentPage: FC = () => {
  const navigate = useNavigate();

  const [coins, setCoins] = useState<CoinCount[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCoins = useCallback(() => {
    const data = CoinService.getAll();
    setCoins(data.map(coin => ({ coin: coin, count: 0 })));
  }, []);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const calculateTotalPrice = useCallback(async () => {
    const items = await CartService.getCartItems();
    setTotalPrice(
      items.reduce((total, item) => total + item.count * item.product.price, 0)
    );
  }, []);
  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

  const deposit = useMemo(
    () =>
      coins.reduce(
        (total, current) => total + current.coin.value * current.count,
        0
      ),
    [coins]
  );

  const handleCoinCountChanged = (coin: ICoin, count: number) => {
    setCoins(prev =>
      prev.map(current =>
        current.coin.value === coin.value
          ? { coin: coin, count: count }
          : current
      )
    );
  };

  const handleBack = () => {
    navigate('/cart');
  };

  return (
    <div className={classes.container}>
      <table className={classes['payment-table']}>
        <thead className={classes.head}>
          <tr>
            <th>Номинал</th>
            <th>Количесво</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody className={classes['table-body']}>
          {coins.map(item => (
            <CoinInput
              key={item.coin.value}
              coin={item.coin}
              intial={0}
              onChange={count => {
                handleCoinCountChanged(item.coin, count);
              }}
            />
          ))}
        </tbody>
      </table>
      <div className={classes['pay-info']}>
        <div>
          <p>Вы весли</p>
          <Price
            value={deposit}
            className={`${classes.money} ${deposit < totalPrice ? classes['money-not-enought'] : ''}`}
          />
        </div>
        <div>
          <p>Итоговая сумма</p>
          <Price value={totalPrice} className={classes.money} />
        </div>
      </div>
      <div className={classes.buttons}>
        <button className="yellow-btn" onClick={handleBack}>
          Вернуться
        </button>
        <button className="green-btn">Оплатить</button>
      </div>
    </div>
  );
};

export default PaymentPage;
