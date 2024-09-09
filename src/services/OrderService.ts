import { AxiosResponse } from 'axios';
import { ICreateOrderRequest } from '../types/ICreateOrderRequest';
import client from './Axios';
import { IChangeResponse } from '../types/IChangeResponse';

const OrderService = {
  createOder(
    request: ICreateOrderRequest
  ): Promise<AxiosResponse<IChangeResponse>> {
    return client.post('Order', request);
  },
};

export default OrderService;
