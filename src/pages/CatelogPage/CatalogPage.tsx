import { FC, useEffect, useState } from 'react';
import CatalogHeader from '../../components/CatalogHeader/CatalogHeader';
import classes from './CatalogPage.module.css';
import ProductList from '../../components/ProductList/ProductList';
import CartCacheService from '../../services/CartCacheService';
import ProductService from '../../services/ProductService';
import { IProduct } from '../../types/IProduct';

const CatalogPage: FC = () => {
  const countProducts = () => {
    return CartCacheService.getCartItemsSample().length;
  };
  const [selectedCount, setSelectedCount] = useState(countProducts());
  const [products, setProducts] = useState<IProduct[]>([]);
  const [maxPrice, setMaxPrice] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAll();
      setProducts(response.data.products);
      setMaxPrice(response.data.maxPrice);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={classes.container}>
      <CatalogHeader maxPrice={maxPrice} selectedProductCount={selectedCount} />
      <ProductList
        products={products}
        onProductAdded={() => setSelectedCount(countProducts())}
      />
    </div>
  );
};

export default CatalogPage;
