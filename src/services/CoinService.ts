import { AxiosResponse } from 'axios';
import { ICoin } from '../types/ICoin';
import client from './Axios';

const CoinService = {
  getAll(): Promise<AxiosResponse<ICoin[]>> {
    return client.get('Coin');
  },
};

export default CoinService;
