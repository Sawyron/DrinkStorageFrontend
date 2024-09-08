import { AxiosResponse } from 'axios';
import { IProduct } from '../types/IProduct';
import client from './Axios';
import { IProductInfo } from '../types/IProductInfo';

const ProductService = {
  getAll(): Promise<AxiosResponse<IProductInfo>> {
    return client.get('Product');
  },
  getAllByBrandAndPrice(
    price: number,
    brandId?: string,
    signal?: AbortSignal
  ): Promise<AxiosResponse<IProduct[]>> {
    return client.get('Product/search', {
      params: { brandId: brandId, maxPrice: price, signal: signal },
    });
  },
  getAllSample(): IProduct[] {
    const sample = {
      id: '1',
      brandId: '1',
      name: 'Cola',
      quantity: 1,
      price: 100,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStVaxw3MaNa5azFn13O2u5k-CZEw3dIJf_zA&s',
    } as IProduct;
    return [...Array(20).keys()].map(i => ({
      ...sample,
      id: `${i}`,
      quantity: i,
      name: `${sample.name} ${i}`,
    }));
  },
  getAllByIds(productIds: string[]): Promise<AxiosResponse<IProduct[]>> {
    return client.get('Product/by-ids', {
      params: { ids: productIds },
      paramsSerializer: {
        indexes: true,
      },
    });
  },
};

export default ProductService;
