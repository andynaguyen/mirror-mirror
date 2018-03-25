import { Request, Response } from 'express';
import { join } from 'path';

type RouteHandler = (req: Request, res: Response) => void;

/**
 * Return the 'index.html' file.
 */
const index = (staticPath: string): RouteHandler => (req, res) => {
  res.sendFile(join(staticPath, './index.html'));
};

export { index };
