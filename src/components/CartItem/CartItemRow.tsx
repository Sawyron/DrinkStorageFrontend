import { ChangeEvent, FC } from 'react';
import { ICartItem } from '../../types/ICartItem';
import Price from '../Price/Price';
import classes from './CartItemRow.module.css';
import NumberInput from '../NumberInput/NumberInput';

export interface ICartItemProps {
  item: ICartItem;
  onCountChange: (count: number) => void;
  onDelete: (item: ICartItem) => void;
}

const CartItemRow: FC<ICartItemProps> = ({ item, onCountChange, onDelete }) => {
  return (
    <tr>
      <td>
        <img
          className={classes['product-image']}
          src={item.product.imageUrl}
          alt={item.product.name}
        ></img>
      </td>
      <td>
        <p className={classes.label}>{item.product.name}</p>
      </td>
      <td>
        <NumberInput
          min={0}
          max={item.product.quantity}
          value={item.count}
          onChange={onCountChange}
        />
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
