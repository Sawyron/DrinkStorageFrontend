import { ICartItem } from '../types/ICartItem';
import CartCacheService from './CartCacheService';
import ProductService from './ProductService';

const CartService = {
  async getCartItems(): Promise<ICartItem[]> {
    const cache = CartCacheService.getCartItemsSample();
    const productResponse = await ProductService.getAllByIds(
      cache.map(item => item.productId)
    );
    const products = productResponse.data;
    const items: ICartItem[] = [];
    const toDelete: string[] = [];
    cache.forEach(item => {
      const product = products.find(product => product.id === item.productId);
      if (product) {
        items.push({ product: product, count: item.count });
      } else {
        toDelete.push(item.productId);
      }
    });
    CartCacheService.removeProducts(toDelete);
    return items;
  },
};

export default CartService;
