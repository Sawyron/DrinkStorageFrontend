import { FC, useEffect, useState } from 'react';
import classes from './CatalogHeader.module.css';
import Select from '../Select/Select';
import { IBrand } from '../../types/IBrand';
import PriceInput from '../PriceInput/PriceInput';
import Price from '../Price/Price';
import { useNavigate } from 'react-router-dom';

export interface ICatalogHeaderProps {
  maxPrice: number;
  selectedProductCount: number;
  onMaxPriceChanged: (price: number) => void;
  brands: IBrand[];
  onBrandChanged: (brand: IBrand) => void;
}

const CatalogHeader: FC<ICatalogHeaderProps> = ({
  maxPrice,
  selectedProductCount,
  onMaxPriceChanged,
  brands,
  onBrandChanged,
}) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(maxPrice);

  useEffect(() => {
    setPrice(maxPrice);
  }, [maxPrice]);

  const handleSelect = () => {
    navigate('/cart');
  };
  const handleMaxPriceChanged = (price: number) => {
    setPrice(price);
    onMaxPriceChanged(price);
  };
  const handleBrandChanged = (brandId: string) => {
    const brand = brands.find(brand => brand.id === brandId);
    onBrandChanged(brand!);
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
            onChange={handleBrandChanged}
          />
        </div>
        <div className={classes.price}>
          <Price value={price} />
          <PriceInput
            min={0}
            max={maxPrice}
            onChange={value => handleMaxPriceChanged(value)}
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
          Выбрано: {selectedProductCount}
        </button>
      </div>
    </div>
  );
};

export default CatalogHeader;
