import { ChangeEvent, FC } from 'react';
import { ICartItem } from '../../types/ICartItem';
import Price from '../Price/Price';
import classes from './CartItemRow.module.css';

export interface ICartItemProps {
  item: ICartItem;
  onCountChange: (count: number) => void;
  onDelete: (item: ICartItem) => void;
}

const CartItemRow: FC<ICartItemProps> = ({ item, onCountChange, onDelete }) => {
  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCountChange(Number(e.target.value));
  };

  return (
    <tr>
      <td>
        <div className={classes.product}>
          <img
            className={classes['product-image']}
            src={item.product.imageUrl}
            alt={item.product.name}
          ></img>
          <p>{item.product.name}</p>
        </div>
      </td>
      <td>
        <input
          type="number"
          min={1}
          max={item.product.quantity}
          value={item.count}
          onChange={handleCountChange}
        ></input>
      </td>
      <td>
        <Price value={item.product.price} />
      </td>
      <td>
        <button onClick={() => onDelete(item)}>
          <img className={classes.trash} src="./trash-512.webp" alt="delete" />
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;
