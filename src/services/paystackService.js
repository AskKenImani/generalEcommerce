const PAYSTACK_PUBLIC_KEY = 'pk_test_1be7c3acc288ee8b9f77120f66d70c01e3d6d2e8';

export class PaystackService {
  static initializePayment({ email, amount, metadata, onSuccess, onCancel }) {
    if (!window.PaystackPop) {
      console.error("Paystack script not loaded");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100,
      currency: 'NGN',
      metadata,
      callback: (response) => {
        console.log('Payment response received:', response);

        const reference = response.reference;

        fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log('Verification result:', data);
            if (data.status && data.data.status === "success") {
              onSuccess(data.data); 
              PaystackService.printReceipt(data.data); 
            } else {
              console.error('Verification failed:', data);
              onCancel();
            }
          })
          .catch(err => {
            console.error('Verification error:', err);
            onCancel();
          });
      },
      onClose: () => {
        console.log('Payment cancelled');
        onCancel();
      }
    });

    handler.openIframe();
  }

  static printReceipt(transactionData) {
    const receiptWindow = window.open('', '', 'width=600,height=600');
    if (!receiptWindow) return;

    receiptWindow.document.write('<html><head><title>Receipt</title></head><body>');
    receiptWindow.document.write('<h1>Payment Receipt</h1>');
    receiptWindow.document.write(`<p><strong>Reference:</strong> ${transactionData.reference}</p>`);
    receiptWindow.document.write(`<p><strong>Amount:</strong> ₦${(transactionData.amount / 100).toLocaleString()}</p>`);
    receiptWindow.document.write(`<p><strong>Status:</strong> ${transactionData.status}</p>`);
    receiptWindow.document.write(`<p><strong>Paid At:</strong> ${transactionData.paid_at}</p>`);
    receiptWindow.document.write('</body></html>');
    receiptWindow.document.close();
    receiptWindow.print();
  }
}
