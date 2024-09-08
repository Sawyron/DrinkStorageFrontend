import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import CatalogHeader from '../../components/CatalogHeader/CatalogHeader';
import classes from './CatalogPage.module.css';
import ProductList from '../../components/ProductList/ProductList';
import CartCacheService from '../../services/CartCacheService';
import ProductService from '../../services/ProductService';
import { IProduct } from '../../types/IProduct';
import { IBrand } from '../../types/IBrand';
import BrandService from '../../services/BrandService';

const CatalogPage: FC = () => {
  const countProducts = () => {
    return CartCacheService.getCartItemsSample().length;
  };
  const allBrandsOption = useMemo<IBrand>(
    () => ({
      id: '0',
      name: 'Все бренды',
    }),
    []
  );

  const [selectedCount, setSelectedCount] = useState(countProducts());
  const [products, setProducts] = useState<IProduct[]>([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchPrice, setSearchPrice] = useState(maxPrice);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [selectedBrand, setSelctedBrand] = useState<IBrand>(allBrandsOption);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await ProductService.getAll();
      console.log('products', JSON.stringify(response.data));
      setMaxPrice(response.data.maxPrice);
      setSearchPrice(maxPrice);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  }, [maxPrice]);
  const fetchProductsWithSeach = useCallback(
    async (sigal: AbortSignal) => {
      try {
        const brandId =
          selectedBrand !== allBrandsOption ? selectedBrand.id : undefined;
        const response = await ProductService.getAllByBrandAndPrice(
          searchPrice,
          brandId,
          sigal
        );
        console.log(searchPrice, brandId);
        console.log('search', JSON.stringify(response.data));
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [searchPrice, selectedBrand, allBrandsOption]
  );
  const fetchBrands = useCallback(async () => {
    try {
      const response = await BrandService.getAll();
      console.log('brands', JSON.stringify(response.data));
      setBrands([allBrandsOption, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  }, [allBrandsOption]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  useEffect(() => {
    const controller = new AbortController();
    fetchProductsWithSeach(controller.signal);
    return () => {
      controller.abort();
    };
  }, [fetchProductsWithSeach]);
  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <div className={classes.container}>
      <CatalogHeader
        brands={brands}
        maxPrice={maxPrice}
        selectedProductCount={selectedCount}
        onMaxPriceChanged={price => setSearchPrice(price)}
        onBrandChanged={brand => setSelctedBrand(brand)}
      />
      <ProductList
        products={products}
        onProductAdded={() => setSelectedCount(countProducts())}
      />
    </div>
  );
};

export default CatalogPage;
