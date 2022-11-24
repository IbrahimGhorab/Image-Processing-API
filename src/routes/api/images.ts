import { Router, Request, Response } from 'express';
import { resizedImageList } from '../../utils/data';
import { createResizedImage } from '../../utils/helperFunction';
import { checkApi } from '../../utils/middelware/api';

import path from 'path';
import fs from 'fs';

const imageRouter = Router();

const output: string = path.resolve('./') + `/public/thumbnail/`;

imageRouter.get(
  '/',
  checkApi,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.query.name as string;

      const width = Number(req.query.width);

      const height = Number(req.query.height);

      const imagePath: string =
        path.resolve('./') + `/public/images/${name}.jpg`;

      const resizedImageName = `${name}-${width}x${height}.jpg`;

      if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
      }

      const resizedImagePath: string = output + resizedImageName;

      if (resizedImageList.includes(resizedImageName)) {
        return res.status(200).sendFile(resizedImagePath);
      }

      await createResizedImage(imagePath, width, height, resizedImagePath);

      resizedImageList.push(resizedImageName);

      res.status(200).sendFile(resizedImagePath);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

export default imageRouter;
