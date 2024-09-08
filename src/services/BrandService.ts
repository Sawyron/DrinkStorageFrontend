import { IBrand } from '../types/IBrand';

const BrandService = {
  getAllSample(): IBrand[] {
    return [
      { id: '1', name: 'Coca Cola' },
      { id: '2', name: 'Pepsi Co.' },
    ];
  },
};

export default BrandService;
