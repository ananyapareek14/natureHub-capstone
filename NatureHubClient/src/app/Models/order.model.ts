export enum OrderStatus {
  Pending = 0,
  Completed = 1,
  Canceled = 2,
}

export interface OrderItem {
  ProductId: string;
  Quantity: number;
  Price: number;
}

export interface PlaceOrderRequest {
  UserId: string;
  OrderItems: OrderItem[];
}

export interface Order {
  Id: string;
  UserId: string;
  Items?: OrderItem[];
  TotalAmount: number;
  Status: OrderStatus;
  OrderDate: string;
}
