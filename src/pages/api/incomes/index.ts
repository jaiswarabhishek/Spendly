import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';
import { errorHandler } from '../../../utils/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM incomes ORDER BY date DESC');
      res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
      errorHandler(res, 500, 'Failed to fetch incomes');
    }
    }
    
  else if (req.method === 'POST') {
    const { title, amount, date, description } = req.body;

    if (!title || !amount || !date || !description) {
      return errorHandler(res, 400, 'Missing required fields');
    }

    try {
      const result = await query(
        'INSERT INTO incomes (title, amount, date, description) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, amount, date, description]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      errorHandler(res, 500, 'Failed to create income');
    }
  }

   else {
    errorHandler(res, 405, `Method ${req.method} Not Allowed`);
  }
}
