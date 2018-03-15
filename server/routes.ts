import { Request, Response } from 'express';

const index = (req: Request, res: Response) => {
  res.sendFile('./index.html');
};

export { index };
