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
        const reference = response.reference;
        fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            if (data.status && data.data.status === "success") {
              try {
                onSuccess(data.data);
                PaystackService.printReceipt(data.data);
              } catch (error) {
                console.error("Error handling success:", error);
              }
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
    const receiptWindow = window.open('', '', 'width=600,height=700');
    if (!receiptWindow) return;
  
    const logoUrl = 'public\favicon.png';
  
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .logo { max-width: 150px; margin-bottom: 20px; }
            .info { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <img src="${logoUrl}" class="logo" alt="Brand Logo" />
          <h1>Payment Receipt</h1>
          <div class="info"><strong>Reference:</strong> ${transactionData.reference}</div>
          <div class="info"><strong>Amount:</strong> ₦${(transactionData.amount / 100).toLocaleString()}</div>
          <div class="info"><strong>Status:</strong> ${transactionData.status}</div>
          <div class="info"><strong>Paid At:</strong> ${transactionData.paid_at}</div>
          <div class="info"><strong>Email:</strong> ${transactionData.customer?.email || 'N/A'}</div>
        </body>
      </html>
    `);
  
    receiptWindow.document.close();
    receiptWindow.print();
  }
  
}
