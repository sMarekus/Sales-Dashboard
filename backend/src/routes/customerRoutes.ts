import { Router } from 'express';
import { AppDataSource } from '../dataSource';
import { Customer } from '../models/Customer';

const router = Router();

// GETE
router.get('/', async (req, res) => {
    const customerRepository = AppDataSource.getRepository(Customer);
    const customers = await customerRepository.find();
    res.json(customers);
});

// POST
router.post('/', async (req, res) => {
    const customerRepository = AppDataSource.getRepository(Customer);
    const newCustomer = customerRepository.create(req.body); // Assuming body contains valid customer fields
    await customerRepository.save(newCustomer);
    res.status(201).json(newCustomer);
});

export default router;
