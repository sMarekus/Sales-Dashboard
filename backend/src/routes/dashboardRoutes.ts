import { Router } from 'express';
import { AppDataSource } from '../dataSource';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';

const router = Router();

// Total orders
router.get('/total-orders', async (req, res) => {
    const totalOrders = await AppDataSource.query(`SELECT COUNT(*) FROM "order";`);
    res.json({ totalOrders: totalOrders[0].count });
});

// Total revenue
router.get('/total-revenue', async (req, res) => {
    const result = await AppDataSource.query(`SELECT SUM(quantity * price) AS totalRevenue FROM order_item;`);
    res.json({ totalRevenue: parseFloat(result[0].totalRevenue) });
});

// Total customers
router.get('/total-customers', async (req, res) => {
    const totalCustomers = await AppDataSource.query(`SELECT COUNT(*) FROM customer;`);
    res.json({ totalCustomers: totalCustomers[0].count });
});

// Orders with customers
router.get('/orders-with-customers', async (req, res) => {
    const ordersWithCustomers = await AppDataSource.query(`
        SELECT "order".*, "customer"."firstName", "customer"."lastName", "customer"."email"
        FROM "order"
        JOIN customer ON "order"."customerId" = "customer"."id";
    `);
    res.json(ordersWithCustomers);
});

export default router;
