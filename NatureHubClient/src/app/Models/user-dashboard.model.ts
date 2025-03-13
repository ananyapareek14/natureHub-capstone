import { CartItem } from "./cart.model";
import { Order } from "./order.model";

export interface DashboardOverview {
    TotalOrders: number;
    TotalSpent: number;
    TotalItemsPurchased: number;
  }
  
  export interface UserProfile {
    Id: string;
    Name: string;
    Email: string;
    Cart: CartItem[];
    Orders: Order[];
  }
  