import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/db';
import { errorHandler } from '../../../../utils/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await query(
      `SELECT * FROM expenses WHERE date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '5 months'AND date < DATE_TRUNC('month', CURRENT_DATE) ORDER BY date DESC;`);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    errorHandler(res, 500, 'Failed to fetch expenses');
  }
}
