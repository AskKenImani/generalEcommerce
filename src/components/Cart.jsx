import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { PaystackService } from '../services/paystackService';
import { useUserProfile } from '../hooks/useUserProfile';
import styles from './Cart.module.css';

const Cart = ({ onClose }) => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const { profile } = useUserProfile();

  const handleCheckout = () => {
    if (items.length === 0) return;

    setIsProcessing(true);

    const email = profile?.email || 'customer@example.com';
    const metadata = {
      cartItems: items.map(item => ({ name: item.name, quantity: item.quantity }))
    };

    PaystackService.initializePayment({
      email,
      amount: totalPrice,
      metadata,
      onSuccess: (transaction) => {
        try {
          clearCart();
          onClose();
          alert('Payment successful! Receipt is being downloaded.');
        } catch (err) {
          console.error('Error in onSuccess:', err);
        } finally {
          setIsProcessing(false);
        }
      },
      onCancel: () => {
        alert('Payment cancelled.');
        setIsProcessing(false);
      }
    });
  };

  return (
    <>
      <div className={styles.overlay}>
        <Card className={styles.modal}>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Shopping Cart</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className={styles.content}>
            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <ShoppingCart className={styles.emptyIcon} />
                <p className={styles.emptyText}>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className={styles.itemsList}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.itemImage}>
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className={styles.itemImg}
                          />
                        ) : (
                          <div className={styles.imagePlaceholder}>
                            <ShoppingCart className={styles.placeholderIcon} />
                          </div>
                        )}
                      </div>
                      <div className={styles.itemInfo}>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <p className={styles.itemPrice}>₦{item.price.toLocaleString()}</p>
                      </div>
                      <div className={styles.quantityControls}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className={styles.total}>
                  <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total:</span>
                    <span className={styles.totalAmount}>
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className={styles.actions}>
                    <Button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className={styles.checkoutBtn}
                    >
                      {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className={styles.clearBtn}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Cart;