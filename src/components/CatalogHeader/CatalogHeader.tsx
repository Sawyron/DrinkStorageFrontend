import { FC, useCallback, useEffect, useState } from 'react';
import classes from './CatalogHeader.module.css';
import Select from '../Select/Select';
import { IBrand } from '../../types/IBrand';
import BrandService from '../../services/BrandService';
import PriceInput from '../PriceInput/PriceInput';
import Price from '../Price/Price';
import { useNavigate } from 'react-router-dom';

export interface ICatalogHeaderProps {
  maxPrice: number;
  selectedProductCount: number;
}

const CatalogHeader: FC<ICatalogHeaderProps> = ({
  maxPrice,
  selectedProductCount,
}) => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [price, setPrice] = useState(maxPrice);

  const fetchBrands = useCallback(() => {
    const brandData = BrandService.getAllSample();
    setBrands(brandData);
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);
  useEffect(() => {
    setPrice(maxPrice);
  }, [maxPrice]);

  const handleSelect = () => {
    navigate('/cart');
  };

  return (
    <div className={classes.header}>
      <div className={classes.options}>
        <div className={classes.brands}>
          <p>Бренды</p>
          <Select
            options={brands.map(brand => ({
              label: brand.name,
              value: brand.id,
            }))}
            onChange={() => {}}
          />
        </div>
        <div className={classes.price}>
          <Price value={price} />
          <PriceInput
            min={0}
            max={maxPrice}
            onChange={value => setPrice(value)}
            value={price}
          />
        </div>
      </div>
      <div className={classes.controls}>
        <button>Импорт</button>
        <button
          className={selectedProductCount > 0 ? 'green-btn' : ''}
          onClick={handleSelect}
        >
          Выбратно: {selectedProductCount}
        </button>
      </div>
    </div>
  );
};

export default CatalogHeader;
