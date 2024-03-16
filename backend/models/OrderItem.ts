import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './Order';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    EAN: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;
}
