import { Router } from 'express';
import { AppDataSource } from '../dataSource';
import { Order } from '../models/Order';

const router = Router();

router.get('/', async (req, res) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find();
    res.json(orders);
});

export default router;
