import { ICartItemCache } from '../types/ICartItemCache';

const cartKey = 'cart';

const CartCacheService = {
  getCartItemsSample(): ICartItemCache[] {
    const rawData = localStorage.getItem(cartKey);
    if (!rawData) {
      return [];
    }
    try {
      const items = JSON.parse(rawData) as ICartItemCache[];
      return items;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  addItem(item: ICartItemCache) {
    const presentItems = this.getCartItemsSample();
    if (!presentItems.some(present => present.productId == item.productId)) {
      presentItems.push(item);
    }
    localStorage.setItem(cartKey, JSON.stringify(presentItems));
  },
  checkIfExists(productIds: string[]): Map<string, boolean> {
    const map = new Map<string, boolean>();
    const presentItems = this.getCartItemsSample();
    productIds.forEach(id => {
      const isPresent = presentItems.some(item => item.productId == id);
      map.set(id, isPresent);
    });
    return map;
  },
  removeProduct(productId: string) {
    const presentItems = this.getCartItemsSample();
    localStorage.setItem(
      cartKey,
      JSON.stringify(presentItems.filter(item => item.productId !== productId))
    );
  },
  updateCount(productId: string, count: number) {
    const presentItems = this.getCartItemsSample();
    presentItems.forEach(item => {
      if (item.productId === productId) {
        item.count = count;
      }
    });
    localStorage.setItem(cartKey, JSON.stringify(presentItems));
  },
};

export default CartCacheService;
