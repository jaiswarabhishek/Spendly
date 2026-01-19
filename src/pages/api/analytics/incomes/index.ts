import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/db';
import { errorHandler } from '../../../../utils/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return errorHandler(res, 400, 'Missing startDate or endDate');
  }

  try {
    const result = await query(
      'SELECT SUM(amount) AS total_income FROM incomes WHERE date BETWEEN $1 AND $2',
      [startDate, endDate]
    );
    res.status(200).json({ success: true, data: result.rows[0].total_income });
  } catch (error) {
    errorHandler(res, 500, 'Failed to calculate total income');
  }
}
