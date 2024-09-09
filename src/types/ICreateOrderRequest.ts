type OrderItem = {
  productId: string;
  quantity: number;
};

type Coin = {
  id: string;
  quantity: number;
};

export interface ICreateOrderRequest {
  orderItems: OrderItem[];
  coins: Coin[];
}
