import { paymentSchema } from '../../src/schemas/paymentSchema';

describe('paymentSchema validation', () => {
  test('valid payload passes', async () => {
    const valid = {
      cardNumber: '4242424242424242',
      cardType: 'VISA',
      expiry: '12/99',
      cvc: '123',
      customer: {
        cedula: '12345678',
        name: 'John Doe',
        email: 'john@example.com',
        address: 'Street 1',
        city: 'City',
        phone: '3001234567',
      },
      productId: 'abcdefghijklmnopq',
      quantity: 1,
    };

    await expect(paymentSchema.validate(valid)).resolves.toBeDefined();
  });

  test('invalid cvc fails', async () => {
    const invalid = {
      ...{
        cardNumber: '4242424242424242',
        cardType: 'VISA',
        expiry: '12/99',
        cvc: '12',
        customer: {
          cedula: '12345678',
          name: 'John Doe',
          email: 'john@example.com',
          address: 'Street 1',
          city: 'City',
          phone: '3001234567',
        },
        productId: 'abcdefghijklmnopq',
        quantity: 1,
      }
    };

    await expect(paymentSchema.validate(invalid)).rejects.toThrow();
  });

  test('expired card fails', async () => {
    const expired = {
      cardNumber: '4242424242424242',
      cardType: 'VISA',
      expiry: '01/20',
      cvc: '123',
      customer: {
        cedula: '12345678',
        name: 'John Doe',
        email: 'john@example.com',
        address: 'Street 1',
        city: 'City',
        phone: '3001234567',
      },
      productId: 'abcdefghijklmnopq',
      quantity: 1,
    };

    await expect(paymentSchema.validate(expired)).rejects.toThrow();
  });
});
