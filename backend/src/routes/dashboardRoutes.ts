import { Router } from 'express';
import { AppDataSource } from '../dataSource';
import moment from 'moment';

const router = Router();

const defaultFromDate = () => moment().subtract(30, 'days').startOf('day').toISOString();
const defaultToDate = () => moment().endOf('day').toISOString();

router.get('/total-orders', async (req, res) => {
    const from = req.query.from ? moment(req.query.from as string).startOf('day').toISOString() : defaultFromDate();
    const to = req.query.to ? moment(req.query.to as string).endOf('day').toISOString() : defaultToDate();

    const totalOrders = await AppDataSource.query(`
        SELECT COUNT(*) FROM "order"
        WHERE "purchaseDate" BETWEEN $1 AND $2;
    `, [from, to]);

    res.json({ totalOrders: totalOrders[0].count });
});

router.get('/total-revenue', async (req, res) => {
    const from = req.query.from ? moment(req.query.from as string).startOf('day').toISOString() : defaultFromDate();
    const to = req.query.to ? moment(req.query.to as string).endOf('day').toISOString() : defaultToDate();

    const result = await AppDataSource.query(`
        SELECT COALESCE(SUM("quantity" * "price"), 0) AS totalRevenue
        FROM "order_item"
        JOIN "order" ON "order"."id" = "order_item"."orderId"
        WHERE "order"."purchaseDate" BETWEEN $1 AND $2;
    `, [from, to]);

    res.json({ totalRevenue: parseFloat(result[0].totalrevenue) });
});

router.get('/total-customers', async (req, res) => {
    const from = req.query.from ? moment(req.query.from as string).startOf('day').toISOString() : defaultFromDate();
    const to = req.query.to ? moment(req.query.to as string).endOf('day').toISOString() : defaultToDate();

    const totalCustomers = await AppDataSource.query(`
        SELECT COUNT(DISTINCT "customer"."id") 
        FROM "customer"
        JOIN "order" ON "order"."customerId" = "customer"."id"
        WHERE "order"."purchaseDate" BETWEEN $1 AND $2;
    `, [from, to]);

    res.json({ totalCustomers: totalCustomers[0].count });
});

router.get('/orders-with-customers', async (req, res) => {
    const from = req.query.from ? moment(req.query.from as string).startOf('day').toISOString() : defaultFromDate();
    const to = req.query.to ? moment(req.query.to as string).endOf('day').toISOString() : defaultToDate();

    const ordersWithCustomers = await AppDataSource.query(`
        SELECT "order".*, "customer"."firstName", "customer"."lastName", "customer"."email"
        FROM "order"
        JOIN customer ON "order"."customerId" = "customer"."id"
        WHERE "order"."purchaseDate" BETWEEN $1 AND $2;
    `, [from, to]);

    res.json(ordersWithCustomers);
});

// router.get('/sales-trends', async (req, res) => {
//     const from = req.query.from ? moment(req.query.from as string).startOf('day').toISOString() : defaultFromDate();
//     const to = req.query.to ? moment(req.query.to as string).endOf('day').toISOString() : defaultToDate();

//     const salesTrends = await AppDataSource.query(`
//         SELECT DATE(purchaseDate) as day, 
//                COUNT(*) as totalOrders, 
//                COUNT(DISTINCT customerId) as uniqueCustomers
//         FROM "order"
//         WHERE "purchaseDate" BETWEEN $1 AND $2
//         GROUP BY DATE(purchaseDate)
//         ORDER BY DATE(purchaseDate);
//     `, [from, to]);

//     res.json(salesTrends);
// });

export default router;
