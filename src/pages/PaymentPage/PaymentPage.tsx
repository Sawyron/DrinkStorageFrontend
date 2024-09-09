import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ICoin } from '../../types/ICoin';
import CoinService from '../../services/CoinService';
import CoinInput from '../../components/CoinInput/CoinInput';
import classes from './PaymentPage.module.css';
import Price from '../../components/Price/Price';
import CartService from '../../services/CartService';
import { useNavigate } from 'react-router-dom';
import { ICreateOrderRequest } from '../../types/ICreateOrderRequest';
import CartCacheService from '../../services/CartCacheService';
import OrderService from '../../services/OrderService';
import { IChangeItem } from '../../types/IChangeItem';
import Change from '../../components/Change/Change';

type CoinCount = {
  coin: ICoin;
  count: number;
};

const PaymentPage: FC = () => {
  const navigate = useNavigate();

  const [coins, setCoins] = useState<CoinCount[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [created, setCreated] = useState(false);
  const [change, setChange] = useState<IChangeItem[] | null>(null);

  const fetchCoins = useCallback(async () => {
    try {
      const response = await CoinService.getAll();
      setCoins(response.data.map(coin => ({ coin: coin, count: 0 })));
    } catch (error) {
      console.error(error);
    }
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
  const handlePayment = useCallback(async () => {
    if (deposit < totalPrice) {
      return;
    }
    try {
      setChange(null);
      const items = CartCacheService.getCartItemsSample();
      const requst = {
        coins: coins.map(c => ({ id: c.coin.id, quantity: c.count })),
        orderItems: items.map(i => ({
          productId: i.productId,
          quantity: i.count,
        })),
      } as ICreateOrderRequest;
      const response = await OrderService.createOder(requst);
      setChange(response.data.change);
      CartCacheService.clear();
    } catch (error) {
      console.error(error);
    } finally {
      setCreated(true);
    }
  }, [coins, deposit, totalPrice]);

  if (created) {
    if (change) {
      return <Change items={change} />;
    }
    return (
      <>
        <h2>Не удалось выдать сдачу</h2>
        <button className="yellow-btn" onClick={() => navigate('/')}>
          Каталог товаров
        </button>
      </>
    );
  }

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
        <button className="green-btn" onClick={handlePayment}>
          Оплатить
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
