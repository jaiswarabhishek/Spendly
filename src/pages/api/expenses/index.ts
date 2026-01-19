import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';
import { errorHandler } from '../../../utils/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM expenses ORDER BY date DESC');
      res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
      errorHandler(res, 500, 'Failed to fetch expenses');
    }
  } 
  
  else if (req.method === 'POST') {
    console.log(req.body);
    const {title,amount, date, category, description} = req.body;
     
    if (!description || !amount || !date || !category || !title) {
      return errorHandler(res, 400, 'Missing required fields');
    }

    // amount is string, convert to number
    const amountNum = parseFloat(amount);

    try {
      const result = await query(`INSERT INTO expenses (title, amount, date, category, description) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *
        `,
        [title, amountNum, date, category, description]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } 
    catch (error) {
      errorHandler(res, 500, 'Failed to add expense');
    }
  } 
  
  else {
    errorHandler(res, 405, `Method ${req.method} Not Allowed`);
  }
}
