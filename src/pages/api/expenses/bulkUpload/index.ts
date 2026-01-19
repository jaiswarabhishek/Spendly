// pages/api/expenses.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/db'; // Your database query function
import { errorHandler } from '../../../../utils/errorHandler'; // Your error handler

interface ExpenseData {
  title: string;
  total_amount: number;
  date: string;
  category: string;
  description: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const expenses: ExpenseData[] = req.body;
  
    try {
      // Prepare the SQL insert statement
      const insertPromises = expenses.map(expense => {
        const sql = `
          INSERT INTO expenses (title, amount, date, category, description) 
          VALUES ($1, $2, $3, $4, $5)
        `;
        return query(sql, [expense.title, expense.total_amount, expense.date, expense.category, expense.description]);
      });

      // Execute all insert promises
      await Promise.all(insertPromises);

      return res.status(201).json({ message: 'Expenses saved successfully!' });

    } catch (error) {
      errorHandler(res, 400, 'Something went wrong...');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
