import { AxiosResponse } from 'axios';
import client from './Axios';

const ImportService = {
  sendProductsAsCsv(file: File): Promise<AxiosResponse> {
    const form = new FormData();
    form.append('file', file);
    return client.post('Product/import', form);
  },
};

export default ImportService;
