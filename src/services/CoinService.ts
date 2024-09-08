import { ICoin } from '../types/ICoin';

const CoinService = {
  getAll(): ICoin[] {
    return [{ value: 1 }, { value: 5 }, { value: 10 }];
  },
};

export default CoinService;
