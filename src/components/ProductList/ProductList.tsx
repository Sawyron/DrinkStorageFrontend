import { FC, useMemo } from 'react';
import { IProduct } from '../../types/IProduct';
import classes from './ProductList.module.css';
import Product from '../Product/Product';
import CartCacheService from '../../services/CartCacheService';

export interface IProductListProps {
  products: IProduct[];
  onProductAdded: () => void;
}

const ProductList: FC<IProductListProps> = ({ products, onProductAdded }) => {
  const cartMap = useMemo(
    () => CartCacheService.checkIfExists(products.map(product => product.id)),
    [products]
  );

  const handleProductAdd = (product: IProduct) => {
    CartCacheService.addItem({ productId: product.id, count: 1 });
    onProductAdded();
  };

  return (
    <div className={classes.container}>
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          onAdd={handleProductAdd}
          isSelected={cartMap.get(product.id) ?? false}
        />
      ))}
    </div>
  );
};

export default ProductList;
