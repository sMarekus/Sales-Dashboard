// src/dataSource.ts
import { DataSource } from "typeorm";
import { Customer } from "./models/Customer";
import { Order } from "./models/Order";
import { OrderItem } from "./models/OrderItem";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "sales_dashboard",
    entities: [Customer, Order, OrderItem],
    synchronize: true,
});
