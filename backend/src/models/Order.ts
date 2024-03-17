import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './Customer';
import { OrderItem } from './OrderItem';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    purchaseDate!: Date;

    @Column()
    country!: string;

    @Column()
    device!: string;

    @ManyToOne(() => Customer, customer => customer.orders)
    customer!: Customer;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems!: OrderItem[];
}
