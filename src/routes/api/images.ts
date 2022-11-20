import { Router, Request, Response } from 'express';
import { imageList, resizedImageList } from '../../utils/data';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const imageRouter = Router();

const output = path.resolve('./') + `/public/thumbnail/`;

imageRouter.get('/', async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    if (!name) {
      return res.status(404).send('must add Image name to URL ');
    }

    const width = Number(req.query.width);

    if (!width) {
      return res
        .status(404)
        .send('width is not found, you must add width to URL');
    }
    const height = Number(req.query.height);

    if (!height) {
      return res
        .status(404)
        .send('height is not found, you must add height to URL');
    }

    const imagePath = path.resolve('./') + `/public/images/${name}.jpg`;
    if (fs.existsSync(imagePath) === false) {
      return res.status(404).send('image is not found');
    }

    const image = imageList.includes(name);
    if (image === false) {
      return res.status(404).send('image is not found');
    }

    const resizedImageName = `${name}-${width}x${height}.jpg`;

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    const resizedImagePath = output + resizedImageName;

    if (resizedImageList.includes(resizedImageName)) {
      return res.status(200).sendFile(resizedImagePath);
    }

    await sharp(imagePath).resize(width, height).toFile(resizedImagePath);
    resizedImageList.push(resizedImageName);

    res.status(200).sendFile(resizedImagePath);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default imageRouter;
