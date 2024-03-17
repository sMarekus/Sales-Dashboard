import { AppDataSource } from '../dataSource';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';

AppDataSource.initialize()
  .then(async () => {
    const customerRepository = AppDataSource.getRepository(Customer);
    const orderRepository = AppDataSource.getRepository(Order);
    const orderItemRepository = AppDataSource.getRepository(OrderItem);

    const customer1 = customerRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
    await customerRepository.save(customer1);

    const customer2 = customerRepository.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
    });
    await customerRepository.save(customer2);

    const order1 = orderRepository.create({
      purchaseDate: new Date(),
      country: 'USA',
      device: 'Mobile',
      customer: customer1,
    });
    await orderRepository.save(order1);

    const orderItem1 = orderItemRepository.create({
      EAN: '123456789',
      quantity: 2,
      price: 98,
      order: order1,
    });
    await orderItemRepository.save(orderItem1);
  })
  .catch((error) => console.log('Error: ' + error))
  .finally(() => AppDataSource.destroy());
