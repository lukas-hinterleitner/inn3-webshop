import {Order} from './order';

export interface UserOrders {
    userId: number;
    orders: Order[];
}
