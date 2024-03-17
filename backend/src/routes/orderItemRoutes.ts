import { Router } from 'express';
import { AppDataSource } from '../dataSource';
import { OrderItem } from '../models/OrderItem';

const router = Router();

// Get all customers
router.get('/', async (req, res) => {
    const orderItemRepository = AppDataSource.getRepository(OrderItem);
    const orderItems = await orderItemRepository.find();
    res.json(orderItems);
});

export default router;
