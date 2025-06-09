import cors from 'cors';

export default async function handler(req, res) {

    await cors(req, res);

    const { reference } = req.query;
  
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }
  