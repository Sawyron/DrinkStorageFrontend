import { FC } from 'react';
import classes from './Product.module.css';
import { IProduct } from '../../types/IProduct';
import Price from '../Price/Price';

export interface IProductProps {
  product: IProduct;
  isSelected: boolean;
  onAdd: (product: IProduct) => void;
}

const Product: FC<IProductProps> = ({ product, onAdd, isSelected }) => {
  const isDisabled = product.quantity <= 0;
  return (
    <div className={classes.container}>
      <img
        className={classes['product-img']}
        src={product.imageUrl}
        alt={product.name}
      ></img>
      <p>{product.name}</p>
      <Price value={product.price} />
      <button
        className={`${!isDisabled && isSelected ? classes.selected : ''} yellow-btn`}
        onClick={() => onAdd(product)}
        disabled={isDisabled}
      >
        {isSelected ? 'Выбрано' : 'Выбрать'}
      </button>
    </div>
  );
};

export default Product;
