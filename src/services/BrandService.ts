import { AxiosResponse } from 'axios';
import { IBrand } from '../types/IBrand';
import client from './Axios';

const BrandService = {
  getAll(): Promise<AxiosResponse<IBrand[]>> {
    return client.get('Brand');
  },
  getAllSample(): IBrand[] {
    return [
      { id: '1', name: 'Coca Cola' },
      { id: '2', name: 'Pepsi Co.' },
    ];
  },
};

export default BrandService;
