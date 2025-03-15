export interface RegisterRequest {
    Name: string;
    Email: string;
    Password: string;
  }
  
  export interface RegisterResponse {
    Id: string;
    Name: string;
    Email: string;
    CreatedAt: string;
  }
  
  export interface LoginRequest {
    Email: string;
    Password: string;
  }
  
  export interface LoginResponse {
    Token: string;
    Id: string;
    Name: string;
    Email: string;
  }
  