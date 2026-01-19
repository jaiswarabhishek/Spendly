import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/db';
import { errorHandler } from '../../../../utils/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      const result = await query(`SELECT * FROM (
        SELECT 'expense' as type, expense_id as id, title, amount, date, category, description FROM expenses
        UNION
        SELECT 'income' as type, income_id as id, title, amount, date, 'Salary' as category, description FROM incomes
      ) AS transactions WHERE id=$1`,[id]);
      res.status(200).json({ success: true, data: result.rows });
      
    } catch (error) {
      errorHandler(res, 500, 'Failed to fetch expenses');
    }
  } 
  else {
    errorHandler(res, 405, `Method ${req.method} Not Allowed`);
  }
}
