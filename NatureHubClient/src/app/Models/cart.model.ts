export interface CartPost {
    UserId: string;
    ProductId: string;
    Quantity: number;
  }
  
  export interface CartItem {
    Id: string;
    ProductId: string;
    ProductName: string;
    Quantity: number;
    Price: number;
  }
  
  export interface Cart {
    UserId: string;
    Items: CartItem[];
  }
  
  export interface CartTotal {
    TotalAmount: number;
  }
  