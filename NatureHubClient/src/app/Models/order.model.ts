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
    Items: OrderItem[];
    TotalAmount: number;
    Status: string;
    OrderDate: string;
  }
  