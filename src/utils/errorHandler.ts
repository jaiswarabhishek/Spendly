import { NextApiResponse } from 'next';

export const errorHandler = (res: NextApiResponse, statusCode: number, message: string) => {
  res.status(statusCode).json({ success: false, error: message });
};
