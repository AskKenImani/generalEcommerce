import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PaystackService } from '../services/paystackService';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const processPayment = async (cartItems, customerInfo) => {
    setIsProcessing(true);
  
    try {
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
      const orderData = {
        items: cartItems,
        customerInfo,
        totalAmount,
        status: 'pending',
        createdAt: serverTimestamp(),
        userId: user?.uid || null
      };
  
      const orderRef = await addDoc(collection(db, 'orders'), orderData);
  
      // ✅ Wrap the payment in a Promise so we can wait for it
      const result = await new Promise((resolve, reject) => {
        PaystackService.initializePayment({
          email: customerInfo.email,
          amount: totalAmount,
          metadata: {
            orderId: orderRef.id,
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            items: cartItems.map(item => `${item.name} (${item.quantity})`).join(', ')
          },
          onSuccess: async (transaction) => {
            try {
              await updateDoc(doc(db, 'orders', orderRef.id), {
                status: 'paid',
                paymentReference: transaction.reference,
                paidAt: serverTimestamp()
              });
  
              console.log('Order completed successfully');
              resolve({ success: true, orderId: orderRef.id, reference: transaction.reference });
            } catch (err) {
              reject(err);
            }
          },
          onCancel: async () => {
            try {
              await updateDoc(doc(db, 'orders', orderRef.id), {
                status: 'cancelled',
                cancelledAt: serverTimestamp()
              });
  
              resolve({ success: false, orderId: orderRef.id });
            } catch (err) {
              reject(err);
            }
          }
        });
      });
  
      return result;
  
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    } finally {
      setIsProcessing(false); // ✅ Always reset the button state
    }
  };  

  return {
    processPayment,
    isProcessing
  };
};