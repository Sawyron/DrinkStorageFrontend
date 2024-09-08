import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ICartItem } from '../../types/ICartItem';
import CartCacheService from '../../services/CartCacheService';
import CartItemRow from '../../components/CartItem/CartItemRow';
import classes from './CartPage.module.css';
import Price from '../../components/Price/Price';
import { useNavigate } from 'react-router-dom';
import CartService from '../../services/CartService';

const CartPage: FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ICartItem[]>([]);

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (total, current) => total + current.product.price * current.count,
        0
      ),
    [items]
  );

  const fetchItems = useCallback(async () => {
    try {
      const items = await CartService.getCartItems();
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleBack = () => {
    navigate('/');
  };
  const handlePay = () => {
    navigate('/payment');
  };
  const handleProductCountChange = (productId: string, count: number) => {
    setItems(
      items.map(item =>
        item.product.id === productId ? { ...item, count: count } : item
      )
    );
    CartCacheService.updateCount(productId, count);
  };
  const handleProductDelete = (productId: string) => {
    CartCacheService.removeProduct(productId);
    fetchItems();
  };

  return (
    <>
      <table className={classes.table}>
        <thead className={classes.head}>
          <tr>
            <th colSpan={2}>Товар</th>
            <th>Количесво</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <CartItemRow
              key={item.product.id}
              item={item}
              onCountChange={count =>
                handleProductCountChange(item.product.id, count)
              }
              onDelete={item => handleProductDelete(item.product.id)}
            />
          ))}
        </tbody>
      </table>
      <div className={classes.footer}>
        <button className={`${classes.back} yellow-btn`} onClick={handleBack}>
          Вернуться
        </button>
        <div className={classes.payment}>
          <div className={classes['total-price']}>
            <p>Итоговая сумма</p>
            <Price
              value={totalPrice}
              style={{ fontWeight: 'bold', fontSize: 'large' }}
            />
          </div>
          <button className="green-btn" onClick={handlePay}>
            Оплатить
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
