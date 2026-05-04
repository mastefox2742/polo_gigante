export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Antipasti' | 'Primi' | 'Secondi' | 'Dolci' | 'Bevande';
  isActive: boolean;
  image?: string;
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  isActive: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  tableId: string;
  tableNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'paid';
  createdAt: string;
  paidAt?: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}
