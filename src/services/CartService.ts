import { ICartItem } from '../types/ICartItem';
import CartCacheService from './CartCacheService';
import ProductService from './ProductService';

const CartService = {
  getCartItems(): ICartItem[] {
    const cache = CartCacheService.getCartItemsSample();
    const products = ProductService.getAllByIds(
      cache.map(item => item.productId)
    );
    const items = cache
      .map(item => ({
        product: products.find(p => p.id === item.productId),
        count: item.count,
      }))
      .filter(item => !!item.product)
      .map(item => ({ ...item }) as ICartItem);
    return items;
  },
};

export default CartService;
