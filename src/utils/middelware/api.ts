import { RequestHandler } from 'express';
import { imageList } from '../data';

export const checkApi: RequestHandler = async (req, res, next) => {
  const name = req.query.name as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  if (!name) {
    return res.status(404).send('you must provide a name in URL');
  }
  if (!imageList.includes(name)) {
    return res.status(404).send('image is not found');
  }
  if (!width) {
    return res.status(404).send('you must provide a width in URL');
  }
  if (width <= 0) {
    return res.status(400).send('you must provide a width greater than 0');
  }

  if (!height) {
    return res.status(404).send('you must provide a height in URL');
  }
  if (height <= 0) {
    return res.status(400).send('you must provide a height greater than 0');
  }
  next();
};
