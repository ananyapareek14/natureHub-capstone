import { Product } from "./product.model";

export interface CartPost {
    UserId: string;
    ProductId: string;
    Quantity: number;
  }
  
  export interface CartItem {
    Id: string;
    ProductId: string;
    Product: Product;
    Quantity: number;
  }
  
  export interface Cart {
    UserId: string;
    Items: CartItem[];
  }
  
  export interface CartTotal {
    TotalAmount: number;
  }
  