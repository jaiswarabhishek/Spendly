import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';
import { errorHandler } from '../../../utils/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

if (req.method === 'GET') {
  const { page = 1, limit = 10 } = req.query;
  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

  try {
    const result = await query(
      `SELECT * FROM (
        SELECT 'expense' as type, expense_id as id, title, amount, date, category, description FROM expenses
        UNION
        SELECT 'income' as type, income_id as id, title, amount, date, 'Salary' as category, description FROM incomes
      ) AS transactions ORDER BY date DESC`,
    );
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    errorHandler(res, 500, 'Failed to fetch transactions');
  }
}


else if (req.method === 'POST'){
    console.log("this is the body",req.body)
     const { transactions } = req.body;
      
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return res.status(400).json({ message: 'Invalid request, transactions array required' });
  }

  // Separate expense and income transactions
  const expenseIds: number[] = [];
  const incomeIds: number[] = [];

  for (const transaction of transactions) {
    const { id, type } = transaction;

    if (!id || !type || (type !== 'expense' && type !== 'income')) {
      return res.status(400).json({ message: 'Invalid transaction data' });
    }

    if (type === 'expense') {
      expenseIds.push(id);
    } else if (type === 'income') {
      incomeIds.push(id);
    }
  }

  if (expenseIds.length === 0 && incomeIds.length === 0) {
    return res.status(400).json({ message: 'No valid transactions to delete' });
  }

  try {
    // Begin transaction
    await query('BEGIN');

    // Delete from expense table if there are expenseIds
    if (expenseIds.length > 0) {
      const expenseQuery = `DELETE FROM expenses WHERE expense_id = ANY($1::uuid[])`;
      await query(expenseQuery, [expenseIds]);
    }

    // Delete from income table if there are incomeIds
    if (incomeIds.length > 0) {
      const incomeQuery = `DELETE FROM incomes WHERE income_id = ANY($1::uuid[])`;
      await query(incomeQuery, [incomeIds]);
    }

    // Commit transaction
    await query('COMMIT');

    return res.status(200).json({ message: 'Transactions deleted successfully' });
  } catch (error) {
    console.log(error)
    // Rollback transaction in case of error
    await query('ROLLBACK');
    errorHandler(res,500,"Internal Server Error"); // Use your custom error handler
  }
}

}
