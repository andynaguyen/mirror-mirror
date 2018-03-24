import axios from 'axios';
import { Request, Response } from 'express';

type RouteHandler = (req: Request, res: Response) => void;

/**
 * Return the 'index.html' file.
 */
const index: RouteHandler = (req, res) => {
  res.sendFile('./index.html');
};

export { index };
