import express from 'express';
import { AppDataSource } from './dataSource';
import customerRoutes from './routes/customerRoutes';
import orderRoutes from './routes/orderRoutes';
import orderItemRoutes from './routes/orderItemRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express();
const port = 3000; // or any port you prefer

AppDataSource.initialize().then(() => {
    app.use(express.json());

    app.use('/api/customers', customerRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/order-items', orderItemRoutes);
    app.use('/api/dashboard', dashboardRoutes);

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(error => console.log("Error during Data Source initialization:", error));
