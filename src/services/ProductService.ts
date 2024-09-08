import { AxiosResponse } from 'axios';
import { IProduct } from '../types/IProduct';
import client from './Axios';
import { IProductInfo } from '../types/IProductInfo';

const ProductService = {
  getAll(): Promise<AxiosResponse<IProductInfo>> {
    return client.get('Product');
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
  getAllByIds(productIds: string[]) {
    return this.getAllSample().filter(product =>
      productIds.includes(product.id)
    );
  },
};

export default ProductService;
