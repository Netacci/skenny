import { usePaystackPayment } from 'react-paystack';

const Checkout = () => {
  const config = {
    reference: new Date().getTime().toString(),
    email: 'user@example.com',
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_021f56e25ab998f6376e8095645c8cef44908ec2',
    currency: 'USD',
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

export default Checkout;
